import { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  deleteCompletedGoals,
  deleteGoalById,
  getAllGoals,
  Goal,
  initializeDatabase,
  insertGoal,
  updateGoalCompletion,
} from "./database";

type GoalsContextType = {
  goals: Goal[];
  addGoal: (text: string) => Promise<void>;
  setCompletedGoal: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  clearAllGoals: () => Promise<void>;
};

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database and load goals
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await initializeDatabase();
        const goals = await getAllGoals();
        setGoals(goals);
      } catch (error) {
        console.error("Failed to initialize database", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  const addGoal = async (text: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
      createdDate: new Date().toISOString(),
    };

    try {
      await insertGoal(newGoal);
      setGoals((prev) => [newGoal, ...prev]);
      Toast.show({ type: "success", text1: "Goal added" });
    } catch (error) {
      console.error("Failed to add goal", error);
      Toast.show({ type: "error", text1: "Failed to add goal" });
    }
  };

  const setCompletedGoal = async (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;

    const newIsCompleted = !goal.isCompleted;
    const completedDate = newIsCompleted ? new Date().toISOString() : null;

    try {
      await updateGoalCompletion(id, newIsCompleted, completedDate);
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id
            ? {
                ...g,
                isCompleted: newIsCompleted,
                completedDate: completedDate || undefined,
              }
            : g,
        ),
      );
      Toast.show({ type: "success", text1: "Goal is set 'completed'" });
    } catch (error) {
      console.error("Failed to update goal", error);
      Toast.show({ type: "error", text1: "Failed to update goal" });
    }
  };
  const deleteGoal = async (id: string) => {
    try {
      await deleteGoalById(id);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      Toast.show({ type: "success", text1: "Goal deleted" });
    } catch (error) {
      console.error("Failed to delete goal", error);
      Toast.show({ type: "error", text1: "Failed to delete goal" });
    }
  };

  const clearAllGoals = async () => {
    try {
      await deleteCompletedGoals();
      setGoals((prevGoals) => prevGoals.filter((goal) => !goal.isCompleted));
      Toast.show({
        type: "success",
        text1: "All completed goals cleared",
      });
    } catch (error) {
      console.error("Failed to clear goals", error);
      Toast.show({ type: "error", text1: "Failed to clear goals" });
    }
  };

  // loading
  if (isLoading) {
    return null;
  }

  return (
    <GoalsContext.Provider
      value={{ goals, addGoal, setCompletedGoal, deleteGoal, clearAllGoals }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) throw new Error("useGoals must be used inside GoalsProvider");
  return context;
};
