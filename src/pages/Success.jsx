import "./Success.css";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";

export default function Success() {
  const location = useLocation();
  const history = useHistory();
  const name = location.state?.name;
  const isNew = location.state?.isNew;
  const { t } = useTranslation();
  const hasAddedEntry = useRef(false);

  useEffect(() => {
    const addCompletion = async () => {
      const completionKey = `completion_${name}`;
      const wasAdded = localStorage.getItem(completionKey);

      if (!name || !isNew || wasAdded || hasAddedEntry.current) return;

      try {
        hasAddedEntry.current = true; // Set flag before adding
        localStorage.setItem(completionKey, "true");

        await addDoc(collection(db, "completions"), {
          name: name,
          completedAt: serverTimestamp(),
        });

        history.replace(location.pathname, {
          ...location.state,
          isNew: false,
        });
      } catch (err) {
        console.error("Error adding completion:", err);
        // Reset flags if error occurs
        hasAddedEntry.current = false;
        localStorage.removeItem(completionKey);
      }
    };

    addCompletion();
  }, [name, isNew, history, location]);

  return (
    <div className="success center">
      <p>
        {name}, {t("success.congratulations")}
      </p>
    </div>
  );
}
