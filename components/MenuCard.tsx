import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { MenuItem } from "@/type";
import { appwriteConfig } from "@/lib/appwrite";

const MenuCard = ({ item: { image_url, name, price } }: { item: MenuItem }) => {
  // Check if image_url is already a full URL or an Appwrite file ID
  const imageUrl = image_url.startsWith("http") 
    ? image_url 
    : `${image_url}?project=${appwriteConfig.projectId}`;
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
