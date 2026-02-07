import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export async function getAuthHeader() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function logout() {
  return signOut(auth);
}
