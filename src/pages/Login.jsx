import "./Login.css";
import { AppContext } from "../AppContext";
import { useContext } from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import GoogleLogOut from "../components/GoogleLogOut";

export default function Login() {
  const { username } = useContext(AppContext);

  return (
    <div className="login center">
      {username ? <GoogleLogOut /> : <GoogleSignIn />}
    </div>
  );

}
