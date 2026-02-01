import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logoutUser = async (navigate) => {
  try {
    await signOut(auth);

    // clear local storage
    localStorage.clear();

    // redirect to login
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
