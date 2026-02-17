import GoalItem from "@/components/GoalItem";
import Header from "@/components/Header";
import { useGoals } from "@/contexts/GoalsContext";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const CompletedScreen = () => {
   const { goals } = useGoals();
   const completedGoals = goals.filter((goal) => goal.isCompleted);

   const router = useRouter();
   return (
      <View style={styles.container}>
         <Header title="My Goals" onAboutPress={() => router.push("/about")} />
         <View style={styles.titleContent}>
            <Text style={styles.pageTitle}>Completed Goals</Text>
         </View>
         <View style={styles.goalsContainer}>
            <FlatList
               data={completedGoals}
               renderItem={({ item }) => (
                  <GoalItem
                     id={item.id}
                     text={item.text}
                     isCompleted={item.isCompleted}
                     onComplete={() => {}}
                  />
               )}
               keyExtractor={(item) => item.id}
               ListEmptyComponent={
                  <View style={styles.noCompletedGoals}>
                     <Text style={styles.infoText}>
                        No completed goals yet!
                     </Text>
                  </View>
               }
            />
         </View>
      </View>
   );
};

export default CompletedScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   goalsContainer: {
      paddingHorizontal: 16,
      height: "100%",
   },
   titleContent: {
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
   noCompletedGoals: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: "50%",
   },
   infoText: {
      color: "#444444",
      fontSize: 16,
      fontStyle: "italic",
   },
});
