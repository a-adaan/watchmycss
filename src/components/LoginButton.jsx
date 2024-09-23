import { Link, useNavigate } from "react-router-dom";
import { auth } from "../assets/firebase";

export default function LoginButton({ currentUser }) {
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      {currentUser ? (
        <>
          <Link
            to={`/${currentUser.nickName.replace(/\s+/g, "")}`}
            className="px-4 py-2 font-semibold rounded-xl bg-btn hover:bg-btnH flex-grow"
          >
            {currentUser.nickName}
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 font-semibold rounded-xl bg-btn hover:bg-btnH flex-grow"
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">
          <button className="px-4 py-2 font-semibold rounded-xl bg-btn hover:bg-btnH flex-grow">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
