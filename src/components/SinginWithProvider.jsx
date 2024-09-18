import { IoLogoGoogle, IoLogoGithub } from "react-icons/io5";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../assets/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SigninWithProvider() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();

  const handleLogin = (provider) => {
    setIsSubmitting(true);

    signInWithPopup(
      auth,
      provider === "google" ? googleProvider : githubProvider
    )
      .then(async (result) => {
        const user = result.user;
        if (user) {
          console.log("Login successful");
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            nickName: user.displayName,
          });
        }
      })
      .catch((error) => {
        const email = error.customData.email;
        const credential =
          provider === "google"
            ? GoogleAuthProvider.credentialFromError(error)
            : GithubAuthProvider.credentialFromError(error);
        const err = { email, credential };
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the active provider after login attempt
        navigate("/");
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-3">
      <p className="mb-4 text-sm text-[#707070]">or login with</p>
      {/* Google Button */}
      <button
        onClick={() => handleLogin("google")}
        disabled={isSubmitting}
        className="w-full mb-2 flex items-center justify-center p-2 bg-btn rounded-lg hover:bg-btnH focus:outline-none"
      >
        <IoLogoGoogle size={24} />
        {isSubmitting ? "Signing in..." : "Sign in with Google"}
      </button>

      {/* GitHub Button */}
      <button
        onClick={() => handleLogin("github")}
        disabled={isSubmitting}
        className="w-full mb-2 flex items-center justify-center p-2 bg-btn rounded-lg hover:bg-btnH focus:outline-none"
      >
        <IoLogoGithub size={24} />
        {isSubmitting ? "Signing in..." : "Sign in with GitHub"}
      </button>
    </div>
  );
}
