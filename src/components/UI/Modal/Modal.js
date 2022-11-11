import React from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import "./modal.css";

export default function Modal(props) {
  const location = useLocation();
  const urlPath = location.pathname;

  window.addEventListener("popstate", () => {
    props.setIsImageOpened(false);
  });
  
  return ReactDOM.createPortal(
    <div
      className="overlay"
      onClick={() => {
        document.body.removeChild(
          document.querySelector(".selected-image__modal")
        );
        props.setIsImageOpened(false);
        window.history.pushState("", "", urlPath);
      }}
    >
      <div
        className="selected-image__wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>,
    document.querySelector(".selected-image__modal")
  );
}
