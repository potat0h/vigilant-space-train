import {
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import "./SuccessList.css";

export default function SuccessList() {
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    const unsubCompletions = onSnapshot(
      collection(db, "success_list"),
      (snapshot) => {
        const completionsList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        setCompletions(completionsList);
      },
      (error) => {
        console.error("Firestore error:", error);
      }
    );

    return () => unsubCompletions();
  }, []);

  return (
    <IonContent>
      <div className="success_list center">
        <IonCard>
          <IonCardContent>
            <h2>Hall of Fame</h2>
            <IonList>
              {completions.map((completion) => (
                <IonItem key={completion.id}>
                  <IonLabel>
                    <h2>{completion.name}</h2>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
}
