import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../assets/firebase";
import SigninWithProvider from "../components/SinginWithProvider";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      );

      e.target.reset();
      console.log("login successfull");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto min-h-[85svh] p-5 flex justify-center items-center">
      <div className="min-w-full min-h-full p-5 border border-[#ccc] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 text-[#100f0f] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 text-[#100f0f] rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-btn text-white p-2 rounded hover:bg-btnH"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className=" hover:underline">
            Register here
          </Link>
        </p>
        <SigninWithProvider />
      </div>
    </div>
  );
}
