import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="
        px-5 py-2 rounded-full
        bg-red-500 text-white font-medium
        shadow-md
        hover:bg-red-600
        active:bg-red-700
        focus:outline-none focus:ring-2 focus:ring-red-300
        transition-all duration-200 transform hover:scale-105
      "
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
