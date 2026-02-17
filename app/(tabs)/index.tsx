import AddGoalItem from "@/components/AddGoalItem";
import GoalItem from "@/components/GoalItem";
import Header from "@/components/Header";
import { useGoals } from "@/contexts/GoalsContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

const HomeScreen = () => {
   const router = useRouter();
   const { goals, addGoal, setCompletedGoal } = useGoals();
   const [modalVisible, setModalVisible] = useState(false);

   // filter incomplted goals
   const incompltedGoals = goals.filter((g) => !g.isCompleted);

   const openModelHandler = () => {
      setModalVisible(true);
   };
   const closeModalHandler = () => {
      setModalVisible(false);
   };

   const addGoalHandler = (goalText: string) => {
      addGoal(goalText);
      closeModalHandler();
   };

   return (
      <View style={styles.container}>
         <Header title="My Goals" onAboutPress={() => router.push("/about")} />
         <View style={styles.addGoalContent}>
            <Text style={styles.pageTitle}>Set Your Goals</Text>
            <TouchableOpacity onPress={() => openModelHandler()}>
               <Text style={styles.addGoalBtn}>+ Add Goal</Text>
            </TouchableOpacity>
         </View>
         <AddGoalItem
            visible={modalVisible}
            onCancel={closeModalHandler}
            onAddGoal={addGoalHandler}
         />
         <View style={styles.goalsContainer}>
            {incompltedGoals && (
               <FlatList
                  data={incompltedGoals}
                  renderItem={({ item }) => (
                     <GoalItem
                        id={item.id}
                        text={item.text}
                        isCompleted={item.isCompleted}
                        onComplete={setCompletedGoal}
                     />
                  )}
                  keyExtractor={(item) => item.id}
               />
            )}
         </View>
      </View>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   addGoalContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginVertical: 15,
      alignItems: "center",
   },
   pageTitle: {
      fontWeight: "bold",
      fontSize: 20,
   },
   addGoalBtn: {
      backgroundColor: "#5e08cc",
      color: "#fff",
      fontWeight: "500",
      padding: 10,
      borderRadius: 18,
   },
   goalsContainer: {
      paddingHorizontal: 16,
   },
});
