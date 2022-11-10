import React, { useState } from "react";
import SelectedImage from "../../SelectedImage/SelectedImage";
import "./Images.css";
import stateContext from "../../Helpers/stateContext";
import DownloadBtn from "../DowloadBtn/DownloadBtn";

export default function Images(props) {
  const [isImageOpened, setIsImageOpened] = useState(false);
  const [imageId, setImageId] = useState();

  const openImageHandler = (imageId) => {
    setIsImageOpened(true);
    setImageId(imageId);
  };

  if (isImageOpened === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <stateContext.Provider
      value={{
        isImageOpened: isImageOpened,
      }}
    >
      {isImageOpened === true && (
        <SelectedImage
          setIsImageOpened={setIsImageOpened}
          openImageHandler={openImageHandler}
          imageId={imageId}
          apiKey={props.apiKey}
          setProgress={props.setProgress}
          setIsImageDownloaded={props.setIsImageDownloaded}
          setDownloadedImageData={props.setDownloadedImageData}
        />
      )}
      <div className="image-main__wrapper">
        {props.images.map((image) => {
          return (
            <figure className="image-container" key={image.id}>
              <div
                className="image-wrapper"
                onClick={() => {
                  window.history.pushState("", "", "/photos/" + image.id);
                  let modal = document.createElement("div");
                  modal.classList.add("selected-image__modal");
                  document.body.appendChild(modal);
                  openImageHandler(image.id);
                }}
              >
                <div className="image-overlay"></div>
                <img src={image.urls.small} alt="" loading="lazy" />
              </div>
              <div className="image-description__wrapper">
                <a
                  className="image-description"
                  href={image.user.links.html}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <figure className="user-image">
                    <img src={image.user.profile_image.small} alt="" />
                  </figure>
                  <span className="image-description__text">
                    <div className="user-name">{image.user.name}</div>
                    {image.user.for_hire ? (
                      <div className="user-status">
                        Available for hire{" "}
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                    ) : null}
                  </span>
                </a>
                <DownloadBtn
                  downloadedImage={image.urls.small}
                  userProfileLink={image.user.links.html}
                  userName={image.user.name}
                  downloadUrl={image.links.download}
                  setIsImageDownloaded={props.setIsImageDownloaded}
                  setDownloadedImageData={props.setDownloadedImageData}
                />
              </div>
            </figure>
          );
        })}
      </div>
    </stateContext.Provider>
  );
}
