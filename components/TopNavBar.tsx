import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router"; // Added useRouter
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext"; // Imported useAuth to access logout

const TopNavBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  const router = useRouter(); // Initialize router
  const { logout } = useAuth(); // Get logout from your context

  // Get the dynamic safe area limits of the device (notch, status bar, etc.)
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View
      // Apply the top inset plus a little extra breathing room
      style={{ paddingTop: insets.top + 16 }}
      className="flex-row items-center justify-between px-6 pb-4 bg-[#0A1C14] border-b border-[#C5A059]/20 shadow-md"
    >
      {/* Left Icon (Drawer Menu) */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className="p-1 -ml-1"
      >
        <Ionicons name="menu-outline" size={30} color="#C5A059" />
      </TouchableOpacity>

      {/* Center Title */}
      <Text
        style={{ fontFamily: "RoyalBold" }}
        className="text-white text-xl tracking-wide"
      >
        {title}
      </Text>

      {/* Right Icon (Logout Button) - Replaces the empty spacer */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-[#C5A059]/10 p-2 rounded-full border border-[#C5A059]/30"
      >
        <Ionicons name="log-out-outline" size={22} color="#C5A059" />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavBar;
