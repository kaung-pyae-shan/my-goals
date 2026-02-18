import * as SQLite from "expo-sqlite";

export type Goal = {
  id: string;
  text: string;
  isCompleted: boolean;
  createdDate: string;
  completedDate?: string;
};

export const db = SQLite.openDatabaseSync("goals.db");

// Initialize database table
export const initializeDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      isCompleted INTEGER DEFAULT 0,
      createdDate TEXT NOT NULL,
      completedDate TEXT
    );
  `);
};

// Database operations
export const getAllGoals = async (): Promise<Goal[]> => {
  return await db.getAllAsync<Goal>(
    "SELECT * FROM goals ORDER BY createdDate DESC",
  );
};

export const insertGoal = async (goal: Omit<Goal, "completedDate">) => {
  await db.runAsync(
    "INSERT INTO goals (id, text, isCompleted, createdDate) VALUES (?, ?, ?, ?)",
    [goal.id, goal.text, goal.isCompleted ? 1 : 0, goal.createdDate],
  );
};

export const updateGoalCompletion = async (
  id: string,
  isCompleted: boolean,
  completedDate: string | null,
) => {
  await db.runAsync(
    "UPDATE goals SET isCompleted = ?, completedDate = ? WHERE id = ?",
    [isCompleted ? 1 : 0, completedDate, id],
  );
};

export const deleteGoalById = async (id: string) => {
  await db.runAsync("DELETE FROM goals WHERE id = ?", [id]);
};

export const deleteCompletedGoals = async () => {
  await db.runAsync("DELETE FROM goals WHERE isCompleted = 1");
};
