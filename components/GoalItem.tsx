import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GoalItemProps = {
  id: string;
  text: string;
  isCompleted: boolean;
  createdDate: string;
  completedDate?: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

const GoalItem = ({
  id,
  text,
  isCompleted,
  createdDate,
  completedDate,
  onComplete,
  onDelete,
}: GoalItemProps) => {
  return (
    <View style={styles.goalItem}>
      <View style={styles.goalItemContent}>
        <View style={styles.textContainer}>
          <Text style={styles.goalText}>{text}</Text>
          <Text style={styles.dateText}>
            Created: {new Date(createdDate).toLocaleDateString()}
          </Text>
          {completedDate && (
            <Text style={styles.dateText}>
              Completed: {new Date(completedDate).toLocaleDateString()}
            </Text>
          )}
        </View>
        {!isCompleted ? (
          <View style={styles.buttonArea}>
            <Pressable
              onPress={() => onComplete(id)}
              style={[styles.iconButton, styles.checkButton]}
            >
              <Text style={[styles.iconText, styles.checkText]}>✓</Text>
            </Pressable>
            <Pressable
              onPress={() => onDelete(id)}
              style={[styles.iconButton, styles.deleteButton]}
            >
              <Text style={[styles.iconText, styles.deleteText]}>✕</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.buttonArea}>
            <Pressable
              onPress={() => onDelete(id)}
              style={[styles.iconButton, styles.trashButton]}
            >
              <Text style={[styles.iconText, styles.deleteText]}>
                <Ionicons name="trash-outline" size={18} color="#555" />
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#fffef3",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 2,
    borderRadius: 6,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  goalItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  buttonArea: {
    flexDirection: "row",
    gap: "10",
  },
  iconButton: {
    width: 30,
    height: 30,
    borderWidth: 2,

    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  checkButton: { borderColor: "#2ecc71" },
  deleteButton: { borderColor: "#cc402e" },
  trashButton: { borderColor: "#555", borderStyle: "dotted" },

  iconText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkText: {
    color: "#2ecc71",
  },
  deleteText: {
    color: "#cc402e",
  },
});

export default GoalItem;
