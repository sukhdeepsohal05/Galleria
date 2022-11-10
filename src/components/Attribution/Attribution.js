import React, { useState } from "react";
import "./attribution.css";

export default function Attribution(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const copyTextHandler = () => {
    navigator.clipboard.writeText(
      document.querySelector(".attribution-text small").textContent
    );
    const copiedTextSpan = document.createElement("span");
    const cardBody = document.querySelector(".attribution-wrapper .card-body");
    const cardBtnIcon = document.querySelector(
      ".attribution-wrapper .copy-btn i"
    );
    copiedTextSpan.classList.add("copiedTextSpan");
    copiedTextSpan.textContent = "Coppied!";

    cardBody.appendChild(copiedTextSpan);
    cardBtnIcon.classList.replace("bi-file-earmark-text", "bi-check");
    setTimeout(() => {
      cardBody.removeChild(copiedTextSpan);
      cardBtnIcon.classList.replace("bi-check", "bi-file-earmark-text");
    }, 2000);
  };

  window.addEventListener("resize", (e) => {
    setWindowWidth(e.target.innerWidth);
  });

  return (
    <div
      className={`attribution-wrapper ${props.isImageDownloaded}`}
      style={{ maxWidth: "540px" }}
    >
      <button className="cancel-btn" onClick={props.cancelBtnHandler}>
        <i className="bi bi-x"></i>
      </button>
      <div className="" style={{display: "flex", flexWrap: "nowrap" }}>
        {windowWidth > 500 && (
          <div className="downloaded-image-wrapper">
            <img
              src={props.downloadedImageData.downloadedImage}
              className="downloaded-image"
              alt=""
            />
          </div>
        )}
        <div className="card-body">
          <h3 className="card-title">Say thanks 🙌</h3>
          <p className="card-text">
            Give a shoutout to{" "}
            <a href={props.downloadedImageData.userProfileLink} target="_blank" rel="noreferrer">
              {props.downloadedImageData.userName}
            </a>{" "}
            on social or copy the text below to attribute.
          </p>
          <p className="card-text attribution-text">
            <small>
              Photo by{" "}
              <a href={props.downloadedImageData.userProfileLink} target="_blank" rel="noreferrer">
                {props.downloadedImageData.userName}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com" target="_blank" rel="noreferrer">
                Unsplash
              </a>
            </small>
            <button
              type="button"
              className="copy-btn"
              title="Copy to clipboard"
              onClick={copyTextHandler}
            >
              <i className="bi bi-file-earmark-text"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
