import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...userDoc.data(), userId: user.uid });
          setUserLogged(true);
        }
      } else {
        setCurrentUser(null);
        setUserLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    currentUser,
    userLogged,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
