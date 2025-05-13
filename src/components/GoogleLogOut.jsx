import { signOut } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";
import { useTranslation } from "react-i18next";

const GoogleLogOut = () => {
  const { t } = useTranslation();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <GoogleButton
      type="light"
      label={t("google_log_out.logout")}
      onClick={handleLogOut}
    />
  );
};

export default GoogleLogOut;
