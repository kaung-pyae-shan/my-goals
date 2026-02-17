import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            headerShown: false,
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Goals",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons size={size} name="home-outline" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="completed"
            options={{
               title: "Completed",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons
                     size={size}
                     name="list-circle-outline"
                     color={color}
                  />
               ),
            }}
         />
      </Tabs>
   );
}
