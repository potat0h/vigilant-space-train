import "./App.css";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonContent,
} from "@ionic/react";
import { homeOutline, diamondOutline, logInOutline } from "ionicons/icons";

import Header from "./components/Header";
import Home from "./pages/Home";
import Success from "./pages/Success";
import SuccessList from "./pages/SuccessList";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const location = useLocation(); 
  const showTabs = ["/", "/success_list", "/login", "/success"].includes(
    location.pathname
  );
  console.log("showTabs", showTabs);

  return (
    <>
      {showTabs ? (
        <IonTabs>
          <Header />
          <IonRouterOutlet>
            <Route exact path="/" component={Home} />
            <Route exact path="/success_list" component={SuccessList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/success" component={Success} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="success_list" href="/success_list">
              <IonIcon icon={diamondOutline} />
              <IonLabel>Success List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={logInOutline} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      ) : (
        <IonPage>
          <Switch>
            <Redirect exact from="/" to="/" />
            <Route component={PageNotFound} />
          </Switch>
        </IonPage>
      )}
    </>
  );
}
