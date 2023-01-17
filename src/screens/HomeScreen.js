import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import ListUsers from "../components/ListUsers";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ListUsers />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
});
