import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginForm() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          miWeb: {},
        });
      }

      alert(`Bienvenida ${user.displayName} 🌟`);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema con el login.");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Iniciar sesión con Google
    </button>
  );
}
