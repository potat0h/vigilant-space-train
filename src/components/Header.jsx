import "./Header.css";
import { AppContext } from "../AppContext";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  menuOutline,
  refreshOutline,
  sunnyOutline,
  moonOutline,
} from "ionicons/icons";
import { IonHeader, IonIcon } from "@ionic/react";

export default function Header() {
  const { setCount, isDarkMode, setIsDarkMode } = useContext(AppContext);
  const dropdownMenuRef = useRef(null);
  const [isDropdownMenuOpen, setIsDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("isDarkMode", !isDarkMode);
  }

  function resetCounter() {
    setCount(0);
    setIsDropdownOpen(false);
  }

  function changeLanguage() {
    if (i18n.language === "hr") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("hr");
    }
    setIsDropdownOpen(false);
  }

  return (
    <IonHeader>
      <div className="header-title">Fit Runner</div>
      <div className="header-icons">
        <button className="icon-button" onClick={resetCounter}>
          <IonIcon icon={refreshOutline} />
        </button>
        {isDarkMode ? (
          <button className="icon-button" onClick={toggleDarkMode}>
            <IonIcon icon={moonOutline} />
          </button>
        ) : (
          <button className="icon-button" onClick={toggleDarkMode}>
            <IonIcon icon={sunnyOutline} />
          </button>
        )}
        <div className="header-menu" ref={dropdownMenuRef}>
          <button className="icon-button" onClick={toggleDropdown}>
            <IonIcon icon={menuOutline} />
          </button>
          {isDropdownMenuOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={resetCounter}>
                {t("header.resetCounter")}
              </div>
              <div className="dropdown-item" onClick={changeLanguage}>
                {t("header.changeLanguage")}
              </div>
            </div>
          )}
        </div>
      </div>
    </IonHeader>
  );
}

