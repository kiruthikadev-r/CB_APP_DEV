import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Linking, Alert, Dimensions } from "react-native";
import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import UserContext from "../../UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [showLoginProgressBar, setShowLoginProgressBar] = useState(false);
  // const [loggedInUserDetails, setLoggedInUserDetails] = useContext(UserContext);

  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    // const name = await AsyncStorage.getItem("user_name");
    // const userId = await AsyncStorage.getItem("user_id");
    // const email = await AsyncStorage.getItem("email");

    if (name && userId && email) {
      let apiData = { name, user_id: userId, email };
      internalLogin(apiData, undefined, false);
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     setShowLoginProgressBar(true);
  //     const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //     });
  //     let apiData = { name: userInfo.data.name, email: userInfo.data.email, domain: "collectorbabu" };
  //     internalLogin(apiData, userInfo, true);
  //   },
  //   onError: () => {
  //     setShowLoginProgressBar(false);
  //     Alert.alert("Login Failed", "Please try again.");
  //   },
  // });

  // const internalLogin = async (data, userInfo, setCookie = false) => {
  //   try {
  //     const response = await axios.post("https://collectorbabu.com/api/user/login_via_sso", data, {
  //       headers: {
  //         token: "87957bdf-8fb3-4afc-a5c7-4ad62f785a60",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setShowLoginProgressBar(false);

  //     if (setCookie) {
  //       setLoggedInUserDetails({
  //         ...userInfo.data,
  //         user_id: response.data.user_id,
  //         premium: response.data.premium,
  //         Subs_year: response.data.year,
  //       });

  //       await AsyncStorage.setItem("user_name", userInfo.data.name);
  //       await AsyncStorage.setItem("user_id", response.data.user_id);
  //       await AsyncStorage.setItem("email", userInfo.data.email);
  //     } else if (response.data.user_id === data.user_id) {
  //       const storedInfo = JSON.parse(await AsyncStorage.getItem("google_info"));
  //       setLoggedInUserDetails({
  //         ...storedInfo,
  //         user_id: data.user_id,
  //         premium: response.data.premium,
  //       });
  //     }
  //   } catch (error) {
  //     setShowLoginProgressBar(false);
  //     Alert.alert("Error", "Something went wrong. Please try again.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.left}>
        <Image
        style={styles.image}
        source={{ uri: 'https://collectorbabu.com/images/mainLogo.png' }}
      />
          <Text style={styles.tagline}>One Stop for Everything Civil Services</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.loginText}>Login with your Gmail account</Text>
          {showLoginProgressBar ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.googleButton} onPress={() => googleLogin()}>
              <Image source={{uri: "https://collectorbabu.com/static/media/google-logo-9808.0590aaf0fe36e23dcc8c.png"}} style={styles.googleLogo} />
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.termsText}>
            By logging in, you agree to our{" "}
            <Text style={styles.link} onPress={() => Linking.openURL("https://collectorbabu.com/terms-of-service")}>
              Terms
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={() => Linking.openURL("http://collectorbabu.com/privacy-policy")}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    width: "90%",
    height: "70%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  left: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  right: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ACE1AC",
    padding: 10,
  },
  image: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
  },
  tagline: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: "80%",
    justifyContent: "center",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  
});

export default Login;