import { Pressable, StyleSheet, Text, View } from "react-native";

type GoalItemProps = {
   id: string;
   text: string;
   isCompleted: boolean;
   onComplete: (id: string) => void;
};

const GoalItem = ({ id, text, isCompleted, onComplete }: GoalItemProps) => {
   return (
      <View style={styles.goalItem}>
         <View style={styles.goalItemContent}>
            <Text style={styles.goalText}>{text}</Text>
            {!isCompleted ? (
               <Pressable
                  onPress={() => onComplete(id)}
                  style={styles.checkButton}
               >
                  <Text style={styles.checkText}>✓</Text>
               </Pressable>
            ) : (
               <></>
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
   },
   goalText: {
      fontSize: 16,
      color: "#333",
      paddingVertical: 4,
   },
   checkButton: {
      width: 30,
      height: 30,
      borderWidth: 2,
      borderColor: "#2ecc71",
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
   },

   checkText: {
      color: "#2ecc71",
      fontSize: 16,
      fontWeight: "bold",
   },
});

export default GoalItem;
