import { signOut } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";

const GoogleLogOut = () => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return <GoogleButton type="light" label="Log out" onClick={handleLogOut} />;
};

export default GoogleLogOut;
