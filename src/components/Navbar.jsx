import { useContext } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  // console.log(import.meta.env.VITE_a);
  return (
    <div className="flex justify-between items-center">
      <div className=""><p>{user?.displayName}</p></div>
      <div className="nav space-x-5">
        <Link to="/">Home</Link>
        <Link to="/career">Career</Link>
        <Link to="/about">About</Link>
        <Link to="/dev">Dev Info</Link>
      </div>
      <div className="login flex gap-2 items-center">
        <div className=" ">
          {
            user && user?.email ? <div>
              <img className="w-14 h-14 object-fill rounded-full" src={user?.photoURL}></img>
            </div> : (<img className="rounded-full" src={userIcon} alt="" />)
          }

        </div>
        {
          user && user.email ? (<button className="btn btn-neutral" onClick={logOut}>LogOut</button>) : (<Link to="/auth/login" className="btn btn-neutral ">Login</Link>)
        }
      </div>
    </div>
  );
};

export default Navbar;
