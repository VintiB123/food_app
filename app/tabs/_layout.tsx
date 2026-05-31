import { Redirect, Slot } from "expo-router";

const _Layout = () => {
  const isAuthenticated = true; // Replace with actual authentication logic
  if (isAuthenticated) return <Redirect href="/sign-in" />;

  return <Slot />;
};

export default _Layout;
