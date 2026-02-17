import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onAddGoal: (text: string) => void;
  onCancel: () => void;
};

const GoalInput = ({ visible, onAddGoal, onCancel }: Props) => {
  const [text, setText] = useState("");

  const onAddGoalHandler = () => {
    if (!text.trim()) return;
    onAddGoal(text);
    setText("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.titleContent}>
              <Image
                source={require("../assets/images/goal.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.titleText}>Set your New Goal</Text>
            </View>
            <TextInput
              placeholder="Enter your goal"
              style={styles.input}
              value={text}
              onChangeText={setText}
            />
            <View style={styles.buttonContent}>
              <TouchableOpacity
                onPress={onAddGoalHandler}
                style={[styles.button, styles.addBtn]}
              >
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCancel}
                style={[styles.button, styles.cancelBtn]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    width: "80%",
    height: 260,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#555555",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContent: {
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logo: {
    width: 36,
    height: 36,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555555",
    padding: 10,
    marginTop: 5,
    marginBottom: 22,
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    padding: 10,
    width: 80,
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#5e08cc",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "500",
  },
  cancelBtn: {
    backgroundColor: "#F2F2F7",
  },
});
