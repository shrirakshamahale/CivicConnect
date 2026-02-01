import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      // Avoid redirect loop
      if (location.pathname !== "/" && location.pathname !== "/login") return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;

      const role = snap.data().role;

      navigate(role === "authority" ? "/authority" : "/dashboard");
    });

    return () => unsub();
  }, [navigate, location.pathname]);

  return null;
}

export default AuthRedirect;
