import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TopNavBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  // Get the dynamic safe area limits of the device (notch, status bar, etc.)
  const insets = useSafeAreaInsets();

  return (
    <View
      // Apply the top inset plus a little extra breathing room
      style={{ paddingTop: insets.top + 16 }}
      className="flex-row items-center justify-between px-6 pb-4 bg-[#0A1C14] border-b border-[#C5A059]/20 shadow-md"
    >
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className="p-1 -ml-1" // Increases the touchable area making it easier to tap
      >
        <Ionicons name="menu-outline" size={30} color="#C5A059" />
      </TouchableOpacity>
      <Text
        style={{ fontFamily: "RoyalBold" }}
        className="text-white text-xl tracking-wide"
      >
        {title}
      </Text>
      <View className="w-8" /> {/* Spacer to center title perfectly */}
    </View>
  );
};

export default TopNavBar;
