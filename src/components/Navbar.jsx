import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link className="home-link" to="/">
          Home
        </Link>
        {!user ? (
          <Link to="/login" className="login-link">
            Login
          </Link>
        ) : (
          <Link to="/saved-trips" className="savedtrips-link">
            Saved Schedules
          </Link>
        )}
      </div>
      {user && (
        <div className="user">
          <p> {auth.currentUser?.displayName}</p>
          <img src={auth.currentUser?.photoURL || ""} width="20" height="20" />
          <button className="logout-btn" onClick={signUserOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
