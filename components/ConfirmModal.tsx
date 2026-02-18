import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ visible, onConfirm, onCancel }: Props) => {
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
              <Text style={styles.titleText}>Clear all completed goals?</Text>
            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.button, styles.addBtn]}
              >
                <Text style={styles.addBtnText}>Clear</Text>
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

export default ConfirmModal;

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
    marginBottom: 18,
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
