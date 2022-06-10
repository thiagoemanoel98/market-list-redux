import React, { useState, useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { FlatList } from "react-native";
import useMarketList from "../../hooks/useMarketList";

export const Main = () => {
  // Reducer

  const [product, setProduct] = useState("");
  const [state, addItem, checkItem, removeItem] = useMarketList();

  // </Reducer>

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar Produto"
          value={product}
          onChangeText={(text) => {
            setProduct(text);
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            addItem(product);
            setProduct("");
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={state}
          renderItem={({ item }) => (
            <View style={styles.itemsContainer}>
              <TouchableOpacity
                style={styles.itemCheckButton}
                onPress={() => {
                  checkItem(item.id);
                }}
              >
                <Text
                  style={[
                    styles.listItem,
                    item.check ? styles.listItemChecked : "",
                  ]}
                >
                  {item.title}
                </Text>

                <TouchableOpacity
                  style={styles.RemoveItem}
                  onPress={() => {
                    removeItem(item.id);
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Remover</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    width: "80%",
    fontSize: 30,
    color: "#000",
  },
  addButton: {
    width: "20%",
    marginLeft: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "blue",
    fontSize: 60,
  },
  itemsContainer: {
    flexDirection: "row",
  },
  listItem: {
    backgroundColor: "#c0c0c0",
    fontSize: 22,
    margin: 3,
    padding: 10,
  },
  listItemChecked: {
    textDecorationLine: "line-through",
  },
  RemoveItem: {
    alignItems: "center",
    alignContent: "center",
  },
  itemCheckButton: {
    flex: 1,
  },
});
