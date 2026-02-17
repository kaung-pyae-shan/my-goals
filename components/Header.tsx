import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
  onAboutPress: () => void;
};
const Header = ({ title, onAboutPress }: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={require("../assets/images/goal.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    <Pressable style={styles.aboutButton} onPress={onAboutPress}>
      <Text style={styles.aboutButtonText}>i</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
    padding: 16,
    backgroundColor: "#5e08cc",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  logo: {
    width: 36,
    height: 36,
  },
  aboutButton: {
    position: "absolute",
    marginTop: 24,
    right: 28,
    width: 28,
    height: 28,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  pressed: {
    opacity: 0.7,
  },
  aboutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Header;
