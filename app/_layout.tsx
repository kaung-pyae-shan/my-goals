import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { GoalsProvider } from "../contexts/GoalsContext";

const RootLayout = () => {
  return (
    <>
      <GoalsProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="about" />
        </Stack>
      </GoalsProvider>
      <Toast position="bottom" bottomOffset={120} visibilityTime={1200} />
    </>
  );
};

export default RootLayout;
