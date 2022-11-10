import React from "react";
import classes from "./RelatedImage.module.css";

export default function RelatedImage(props) {
  return (
    <figure
      className={classes["image-container"]}
      key={props.imageData.id}
      onClick={() => {
        window.history.pushState("", "", "/photos/" + props.imageData.id);
        props.updateSelectedImageData(props.imageData.id);
        props.updateRelatedImages(props.imageData.id);
      }}
    >
      {window.innerWidth >= 670 && <div className={classes["image-overlay"]}></div>}
      <img src={props.imageData.imageSmallSrc} alt="" />
      {window.innerWidth >= 670 && (
        <>
          <a
            className={classes["image-description"]}
            href={props.imageData.userProfileLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <figure className={classes["user-image"]}>
              <img src={props.imageData.userImage} alt="" />
            </figure>
            <span className={classes["image-description__text"]}>
              <div className={classes["user-name"]}>{props.imageData.name}</div>
              {props.imageData.userStatus ? (
                <div className={classes["user-status"]}>
                  Available for hire{" "}
                  <i className={classes["bi bi-check-circle-fill"]}></i>
                </div>
              ) : null}
            </span>
          </a>
          <a
            rel="nofollow"
            download
            className={classes["download-btn"]}
            href={props.imageData.downloadHref + `?force=true`}
            onClick={(e) => {
              e.stopPropagation();
              props.setIsImageDownloaded(true);
              props.setDownloadedImageData((prevData) => {
                return {
                  ...prevData,
                  downloadedImage: props.imageData.imageSmallSrc,
                  userProfileLink: props.imageData.userProfileLink,
                  userName: props.imageData.name,
                };
              });
            }}
          >
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
          </a>
        </>
      )}
    </figure>
  );
}
