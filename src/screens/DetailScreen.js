import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailScreen = () => {
  const route = useRoute();

  useEffect(() => {
    console.log(route.params.profile.name);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.profile.picture }}
        style={styles.containImg}
      />
      <View style={styles.containTxt}>
        <Text>Nama : {route.params.profile.name}</Text>
        <Text>Jenis Kelamin : {route.params.profile.gender}</Text>
        <Text>Umur : {route.params.profile.age}</Text>
        <Text>Warna Mata : {route.params.profile.eyeColor}</Text>
        <Text>Email : {route.params.profile.email}</Text>
        <Text>Phone : {route.params.profile.phone}</Text>
        <Text>Alamat : {route.params.profile.address}</Text>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containImg: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginVertical: 20,
  },
  containTxt: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});
