import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import the custom hook from your context folder
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const MatrimonialLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Access auth state and methods from AuthProvider
  const { login, user, isLoading } = useAuth();

  // Persistence Logic: If a user session is found in history, redirect to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading]);

  const handleSignIn = async () => {
    // Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Strict Password: 8+ chars, 1 Upper, 1 Lower, 1 Number, 1 Special Char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // 1. Check for empty fields
    if (!email || !password) {
      Alert.alert("Required Fields", "Please fill in both Email and Password.");
      return;
    }

    // 2. Validate Email
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // 3. Validate Strict Password
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Security Requirement",
        "Password must be at least 8 characters and include:\n• One Uppercase letter\n• One Lowercase letter\n• One Number\n• One Special Character (@, $, !, %, *, ?, &)",
      );
      return;
    }

    // 4. Save Session and Redirect
    try {
      await login({ email }); // Saves session to AsyncStorage via context
      router.replace("/dashboard");
    } catch (error) {
      Alert.alert("Error", "Failed to save login session.");
    }
  };

  return (
    <View className="flex-1 bg-[#010302]">
      <LinearGradient colors={["#0A1C14", "#010302"]} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center items-center"
          >
            <View
              style={{ width: width * 0.88 }}
              className="p-8 bg-[#0B2B1F] rounded-[40px] border border-[#C5A059]/20 shadow-2xl"
            >
              {/* Header Icon */}
              <View className="w-20 h-20 rounded-full bg-[#C5A059]/10 self-center items-center justify-center border border-[#C5A059]/30 mb-6">
                <Text className="text-[#C5A059] text-3xl">💍</Text>
              </View>

              <View className="items-center mb-10">
                <Text
                  style={{ fontFamily: "RoyalBold" }}
                  className="text-[#C5A059] text-4xl tracking-tighter"
                >
                  Eternal Bonds
                </Text>
                <View className="w-16 h-[1px] bg-[#C5A059] my-4 opacity-50" />
                <Text
                  style={{ fontFamily: "RoyalMediumItalic" }}
                  className="text-white/60 text-sm italic"
                >
                  Welcome back to your journey
                </Text>
              </View>

              <View className="w-full">
                {/* Email Input */}
                <View>
                  <Text className="text-[#C5A059] text-[10px] uppercase tracking-[2px] mb-2 ml-1 font-bold">
                    Email Address
                  </Text>
                  <TextInput
                    className="w-full h-14 bg-black/40 rounded-2xl px-5 text-white border border-[#C5A059]/10"
                    placeholder="name@example.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.2)"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                {/* Password Input with Eye Icon Toggle */}
                <View className="mt-4">
                  <Text className="text-[#C5A059] text-[10px] uppercase tracking-[2px] mb-2 ml-1 font-bold">
                    Password
                  </Text>
                  <View className="flex-row items-center w-full h-14 bg-black/40 rounded-2xl px-5 border border-[#C5A059]/10">
                    <TextInput
                      className="flex-1 text-white"
                      placeholder="••••••••"
                      placeholderTextColor="rgba(255, 255, 255, 0.2)"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#C5A059"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSignIn}
                className="w-full bg-[#C5A059] h-16 rounded-2xl justify-center items-center mt-10 shadow-xl"
              >
                <Text className="text-[#0B2B1F] font-extrabold text-lg tracking-widest">
                  SIGN IN
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8">
                <Text className="text-white/50 text-sm">
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity>
                  <Text className="text-[#C5A059] text-sm font-bold border-b border-[#C5A059]">
                    Register Free
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default MatrimonialLogin;
