import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function OnbardingPage({ text, imageSource, title, subtitle }) {
  return (
    <View style={styles.container}>
      {/* Extra text above the image */}
      {text ? <Text style={styles.extraText}>{text}</Text> : null}

      {/* Image */}
      <Image source={imageSource} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  extraText: {
    fontSize: 18,
    color: "white", // change to black if background is light
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});