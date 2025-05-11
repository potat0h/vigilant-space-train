import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../firebase";

const GoogleSignIn = () => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return <GoogleButton onClick={handleSignIn} />;
};

export default GoogleSignIn;
