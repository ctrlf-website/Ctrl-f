import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useUserStore } from "../store/userStore";

export function useAuthListener() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);
}
