import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ListUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await fetch(
        "https://c50f007f-bad3-4e64-982d-fce35e877b09.mock.pstmn.io/users"
      );
      const json = await response.json();
      setData(json.data.users);
      setFilterData(json.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchFilterFucntion = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.profile.name
          ? item.profile.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(data);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containHeader}>
        <TextInput
          style={styles.inputSearch}
          value={search}
          placeholder="Searching...."
          placeholderTextColor={"#828282"}
          onChangeText={(text) => searchFilterFucntion(text)}
        />
        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="sort-amount-asc" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  const tempList = data.sort((a, b) =>
                    a.profile.name > b.profile.name ? 1 : -1
                  );
                  setData(tempList);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Sort By Name</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  const tempList = data.sort((a, b) =>
                    a.registered > b.registered ? 1 : -1
                  );
                  setData(tempList);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Sort By Registered</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  const tempList = data.filter(
                    (prop) => prop.profile.gender !== "male"
                  );
                  setData(tempList);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Sort By Gender</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filterData}
          s
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Detail", (item = { ...item }))
              }
            >
              <View style={styles.contain}>
                <Image
                  source={{ uri: item.profile.picture }}
                  style={styles.image}
                />
                <View style={styles.containTxt}>
                  <Text>{item.profile.name}</Text>
                  <Text>{item.profile.gender}</Text>
                  <Text>{item.profile.eyeColor}</Text>
                  <Text>{item.profile.email}</Text>
                  <Text>{item.profile.phone}</Text>
                  <Text numberOfLines={1}>
                    {item.profile.address.substring(0, 30)}...
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ListUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e5e5e5",
  },
  contain: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  containTxt: {
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignItems: "center",
  },
  inputSearch: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#191919",
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
  },
  containHeader: {
    flexDirection: "row",
  },
  btnFilter: {
    alignContent: "center",
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  textStyle: {
    color: "grey",
    fontWeight: "bold",
    margin: 5,
  },
});
