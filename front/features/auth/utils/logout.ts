import Cookies from "js-cookie";

export const logout = () => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("authToken");

    if (token) {
      Cookies.remove("authToken");
      console.log("Logged out successfully");
    } else {
      console.log("No token found");
    }
  }
};
