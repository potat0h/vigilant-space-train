import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const PageNotFound = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Oops! The page you're looking for doesn't exist.</h2>
        <p>Please check the URL or navigate back to the home page.</p>
      </IonContent>
    </IonPage>
  );
};

export default PageNotFound;
