import "./Home.css";
import { AppContext } from "../AppContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IonButton, IonInput } from "@ionic/react";
import { db } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const { username, count, setCount } = useContext(AppContext);
  const [name, setName] = useState("");
  const history = useHistory();
  const { t } = useTranslation();

  const addNameToFirestore = async () => {
    try {
      await addDoc(collection(db, "success_list"), {
        name: username,
      });
      console.log("Document written: ", username);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    console.log("Count changed:", count);
    localStorage.setItem("count", count);
    if (count === 10) {
      setCount(0);
      if (username && username !== "") {
        addNameToFirestore();
      }
      history.push("/success", {
        name: username || t("home.anonymous"),
        isNew: true,
      });
    }
  }, [count, history, name, setCount, t]);

  function up() {
    setCount((count) => count + 1);
  }

  function down() {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  }

  return (
    <div className="home center">
      <p>{count}</p>
      <div>
        <IonButton onClick={up}>{t("home.up")}</IonButton>
        <IonButton onClick={down}>{t("home.down")}</IonButton>
        {username ? <p>{username}</p> : <p>{t("please_login")}</p>}
      </div>
      

      
    </div>
  );
}
/* <IonInput
        fill="solid"
        labelPlacement="floating"
        label={t("home.typeName")}
        value={name}
        onIonChange={(e) => setName(e.detail.value)}
      /> */