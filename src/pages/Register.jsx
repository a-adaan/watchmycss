import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../assets/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      );
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: formData.get("email"),
          nickName: formData.get("nickname"),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    e.target.reset();
  };
  return (
    <div className="max-w-md mx-auto min-h-[85svh] p-5 flex justify-center items-center">
      <div className="min-w-full min-h-full p-5 border border-[#ccc] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nickname</label>
            <input
              type="text"
              name="nickname"
              className="w-full p-2 text-[#100f0f] rounded"
              required
            />
          </div>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
