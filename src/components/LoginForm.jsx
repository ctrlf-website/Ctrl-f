import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // 🔥 Obtener ID Token del usuario autenticado
      const idToken = await user.getIdToken();
      console.log("[FRONT] -> token obtenido:", idToken.slice(0, 20) + "...");

      // 🔁 Enviar token al backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("[FRONT] -> respuesta del backend:", data);

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
      navigate("/crear-web", { state: { miWeb: data } });
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
