import React, { useState } from "react";
import "./downloadBtn.css";

export default function DownloadBtn(props) {
  const [downloadMenu, setDownloadMenu] = useState(false);
  return (
    <div className="download-btn__wrapper">
      <a
        rel="nofollow"
        download
        className="download-btn"
        onClick={(e) => {
          e.stopPropagation();
          props.setIsImageDownloaded(true);
          props.setDownloadedImageData((prevData) => {
            return {
              ...prevData,
              downloadedImage: props.downloadedImage,
              userProfileLink: props.userProfileLink,
              userName: props.userName,
            };
          });
        }}
        href={props.downloadUrl + "&force=true"}
      >
        {window.innerWidth <= 670 || props.showMenu ? (
          "Download"
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            version="1.1"
            aria-hidden="false"
          >
            <desc lang="en">Arrow pointing down</desc>
            <path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path>
          </svg>
        )}
      </a>
      {window.innerWidth <= 670  || props.showMenu ? (
        <div className="popover-download-btn-wrapper">
          <button
            className="popover-download-btn"
            onClick={() => {
              downloadMenu ? setDownloadMenu(false) : setDownloadMenu(true);
            }}
          >
            <i className="bi bi-chevron-down"></i>
          </button>
          {downloadMenu && (
            <div className="download-menu">
              <div
                style={{
                  position: "absolute",
                  top: "-16px",
                  right: "10px",
                  border: "8px solid #0000",
                  borderBottomColor: "#111111",
                  pointerEvents: "none",
                }}
              ></div>
              <ul className="download-options">
                <li>
                  <a href={props.downloadUrl + "&force=true&w=640"}>Small</a>
                </li>
                <li>
                  <a href={props.downloadUrl + "&force=true&w=1920"}>Medium</a>
                </li>
                <li>
                  <a href={props.downloadUrl + "&force=true&w=2400"}>Large</a>
                </li>
                <hr />
                <li>
                  <a href={props.downloadUrl + "&force=true"}>Original Size</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ): null}
    </div>
  );
}
