import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TopNavBar from "../components/TopNavBar";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  // Features adapted from the reference image
  const actionItems = [
    { label: "Edit Profile", icon: "person-outline" },
    { label: "Viewed Contacts", icon: "eye-outline" },
    { label: "Edit Photos", icon: "camera-outline" },
    { label: "Membership", icon: "card-outline" },
    { label: "Payments", icon: "receipt-outline" },
    { label: "Search Profiles", icon: "search-outline" },
  ];

  return (
    <View className="flex-1 bg-[#010302]">
      <TopNavBar title="Dashboard" />
      {/* Header with Logout */}
      <LinearGradient
        colors={["#0A1C14", "#010302"]}
        className="pt-12 pb-6 px-6"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              style={{ fontFamily: "RoyalMediumItalic" }}
              className="text-[#C5A059] text-sm"
            >
              Welcome back,
            </Text>
            <Text
              style={{ fontFamily: "RoyalBold" }}
              className="text-white text-2xl"
            >
              Eternal Partner
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-[#C5A059]/10 p-2 rounded-full border border-[#C5A059]/30"
          >
            <Ionicons name="log-out-outline" size={24} color="#C5A059" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1 px-6 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Search Cards adapted from UI */}
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity
            style={{ width: width * 0.42 }}
            className="bg-[#0B2B1F] p-5 rounded-3xl border border-[#C5A059]/20 items-center"
          >
            <Ionicons name="male-outline" size={32} color="#C5A059" />
            <Text
              style={{ fontFamily: "RoyalBold" }}
              className="text-white mt-2 text-lg"
            >
              Groom
            </Text>
            <Text className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mt-1">
              Profiles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: width * 0.42 }}
            className="bg-[#0B2B1F] p-5 rounded-3xl border border-[#C5A059]/20 items-center"
          >
            <Ionicons name="female-outline" size={32} color="#C5A059" />
            <Text
              style={{ fontFamily: "RoyalBold" }}
              className="text-white mt-2 text-lg"
            >
              Bride
            </Text>
            <Text className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mt-1">
              Profiles
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Status Section */}
        <View className="bg-[#0B2B1F]/40 p-6 rounded-[30px] border border-[#C5A059]/10 mb-8">
          <Text
            style={{ fontFamily: "RoyalBold" }}
            className="text-[#C5A059] text-center text-xl mb-4 uppercase tracking-tighter"
          >
            Profile Status
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">0</Text>
              <Text className="text-white/50 text-[10px] uppercase tracking-widest">
                Eligible
              </Text>
            </View>
            <View className="w-[1px] h-10 bg-[#C5A059]/20" />
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">0</Text>
              <Text className="text-white/50 text-[10px] uppercase tracking-widest">
                Viewed
              </Text>
            </View>
          </View>
        </View>

        {/* Feature Action Grid */}
        <View className="flex-row flex-wrap justify-between pb-10">
          {actionItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: width * 0.27 }}
              className="bg-[#0B2B1F] aspect-square rounded-2xl border border-[#C5A059]/10 items-center justify-center mb-4 shadow-sm"
            >
              <View className="bg-[#C5A059]/10 p-2 rounded-xl mb-2">
                <Ionicons name={item.icon as any} size={20} color="#C5A059" />
              </View>
              <Text className="text-white/80 text-[9px] text-center font-bold uppercase tracking-tighter px-1">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar adapted from UI */}
      <View className="flex-row bg-[#0B2B1F] border-t border-[#C5A059]/20 py-4 px-6 justify-between items-center">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#C5A059" />
          <Text className="text-[#C5A059] text-[10px] mt-1 font-bold">
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center opacity-50">
          <Ionicons name="search" size={24} color="#FFF" />
          <Text className="text-white text-[10px] mt-1 font-bold">Search</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center opacity-50">
          <Ionicons name="card" size={24} color="#FFF" />
          <Text className="text-white text-[10px] mt-1 font-bold">Plans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
