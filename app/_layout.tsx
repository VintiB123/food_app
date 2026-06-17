import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: "https://86c4256e53f23f16e42a8c6e4dffa7c2@o4511054123696128.ingest.us.sentry.io/4511473115791360",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  console.log("RootLayout render");
  const isLoading = useAuthStore((state) => state.isLoading);
  const fetchAuthenticatedUser = useAuthStore(
    (state) => state.fetchAuthenticatedUser,
  );
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  useEffect(() => {
    console.log("fetchAuthenticatedUser effect");
    fetchAuthenticatedUser();
  }, []);

  if (!fontsLoaded || isLoading) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
});
