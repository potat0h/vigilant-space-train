import { signInWithPopup, signOut } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../firebase";
import { useTranslation } from "react-i18next";
import { useIonAlert } from "@ionic/react";

export default function GoogleSignIn() {
  const { t } = useTranslation();
  const [presentAlert] = useIonAlert();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userDomain = result.user.email.split("@")[1];
        if (userDomain != "gmail.com") {
          signOut(auth);
          presentAlert({
            header: t("alert"),
            message: t("google_sign_in.only_with_gmail"),
            buttons: [t("ok")],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <GoogleButton label={t("google_sign_in.login")} onClick={handleSignIn} />
  );
}
