import { createContext, useContext, useState } from "react";

type Goal = {
   id: string;
   text: string;
   isCompleted: boolean;
};

type GoalsContextType = {
   goals: Goal[];
   addGoal: (text: string) => void;
   setCompletedGoal: (id: string) => void;
   deleteGoal: (id: string) => void;
};

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: React.ReactNode }) => {
   const [goals, setGoals] = useState<Goal[]>([]);

   const addGoal = (text: string) => {
      setGoals((prev) => [
         ...prev,
         { id: Date.now().toString(), text, isCompleted: false },
      ]);
   };

   const setCompletedGoal = (id: string) => {
      setGoals((prev) =>
         prev.map((goal) =>
            goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal,
         ),
      );
   };
   const deleteGoal = (id: string) => {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
   };

   return (
      <GoalsContext.Provider
         value={{ goals, addGoal, setCompletedGoal, deleteGoal }}
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
