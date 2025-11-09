import { auth } from "../firebase/firebaseConfig";

export async function getAuthHeader() {
  const token = await auth.currentUser?.getIdToken();
  return { Authorization: `Bearer ${token}` };
}
