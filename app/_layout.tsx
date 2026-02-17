import { GoalsProvider } from "@/contexts/GoalsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
   return (
      <GoalsProvider>
         <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
         </Stack>
      </GoalsProvider>
   );
}
