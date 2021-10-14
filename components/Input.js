import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ value, onChangeValue }) => {
  return (
    <TextInput
      multiline
      numberOfLines={2}
      style={styles.input}
      placeholder="Enter Street Name, City and State (CA)"
      value={value}
      onChangeText={onChangeValue}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Input;
