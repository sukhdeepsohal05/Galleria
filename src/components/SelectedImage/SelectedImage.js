import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import RelatedImages from "../RelatedImages/RelatedImages";
import DownloadBtn from "../UI/DowloadBtn/DownloadBtn";
import "./SelectedImage.css";

export default function SelectedImage(props) {
  const [selectedImageData, setSelectedImageData] = useState({});

  const updateSelectedImageData = async (imageId) => {
    props.setProgress(10);
    const url = `https://api.unsplash.com/photos/${imageId}?client_id=${props.apiKey}`;
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setSelectedImageData({
      imageId: parsedData.id,
      imageThumbSrc: parsedData.urls.thumb,
      imageSmallSrc: parsedData.urls.small,
      imageRegularSrc: parsedData.urls.regular,
      imageFullSrc: parsedData.urls.full,
      downloadHref: parsedData.links.download,
      imageViews: parsedData.views.toLocaleString(),
      imageDownloads: parsedData.downloads.toLocaleString(),
      imageDescription: parsedData.description,
      imageLocation: parsedData.location.name,
      publishedDate: new Date(`${parsedData.created_at}`).toLocaleString(
        "EN-US",
        { month: "long", day: "numeric", year: "numeric" }
      ),
      cameraName: parsedData.exif.name,
      userImage: parsedData.user.profile_image.small,
      name: parsedData.user.name,
      userName: parsedData.user.username,
      userStatus: parsedData.user.for_hire,
      userProfileLink: parsedData.user.links.html,
    });
    document
      .querySelector(`.overlay`)
      .scrollTo({ top: "0", behavior: "smooth" });
    props.setProgress(100);
  };

  useEffect(() => {
    updateSelectedImageData(props.imageId);
    return () => {};
    // eslint-disable-next-line
  }, [props.imageId]);

  const location = useLocation();
  const urlPath = location.pathname;

  const text = `Thanks to ${selectedImageData.name} @${selectedImageData.userName} for making this photo available freely on Unsplash 🎁 `;
  const url = window.location.href;

  const shareBtnHandler = async () => {
    await navigator
      .share({
        text,
        url,
      })
      .then()
      .catch(console.error);
  };

  const zoomImageHandler = (e) => {
    const image = e.target;
    if (image.style.maxHeight === "initial") {
      image.style.maxHeight = "calc(100vh - 150px)";
      image.style.width = "auto";
      image.style.maxWidth = "70%";
      image.style.cursor = "zoom-in";
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      image.style.maxHeight = "initial";
      image.style.width = "100%";
      image.style.maxWidth = "100%";
      image.style.cursor = "zoom-out";
    }
  };

  window.addEventListener("popstate", () => {
    props.setIsImageOpened(false);
  });

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
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
            key={selectedImageData.imageId}
          >
            <div>
              <header>
                <a
                  href={selectedImageData.userProfileLink}
                  target="_blank"
                  rel="noreferrer"
                  className="image-user-detail__wrapper"
                >
                  <figure className="user-image">
                    <img src={selectedImageData.userImage} alt="" />
                  </figure>
                  <div className="image-description">
                    <span className="image-description__text">
                      <div className="user-name">{selectedImageData.name}</div>
                      {selectedImageData.userStatus ? (
                        <div className="user-status">
                          Available for hire{" "}
                          <i className="bi bi-check-circle-fill"></i>
                        </div>
                      ) : null}
                    </span>
                  </div>
                </a>
                <DownloadBtn
                  showMenu={true}
                  image={selectedImageData}
                  downloadedImage={selectedImageData.imageSmallSrc}
                  userProfileLink={selectedImageData.userProfileLink}
                  userName={selectedImageData.userName}
                  downloadUrl={selectedImageData.downloadHref}
                  setIsImageDownloaded={props.setIsImageDownloaded}
                  setDownloadedImageData={props.setDownloadedImageData}
                />
              </header>
              <div className="selected-image">
                <img
                  src={selectedImageData.imageRegularSrc}
                  alt=""
                  onClick={zoomImageHandler}
                />
              </div>
              <div className="selected-image__details">
                <div className="stats">
                  <div className="views">
                    <h3>Views</h3>
                    <span>{selectedImageData.imageViews}</span>
                  </div>
                  <div className="downloads">
                    <h3>Downloads</h3>
                    <span>{selectedImageData.imageDownloads}</span>
                  </div>
                </div>
                <div className="actions">
                  <div className="share-btn" onClick={shareBtnHandler}>
                    <i className="fa-solid fa-share"></i>
                    <span>Share</span>
                  </div>
                </div>
                <div className="details">
                  {selectedImageData.imageLocation && (
                    <div className="location">
                      <i className="bi bi-geo-alt-fill"></i>
                      <h3>{selectedImageData.imageLocation}</h3>
                    </div>
                  )}
                  <div className="published-date">
                    <i className="bi bi-calendar4"></i>
                    <h3>
                      Published on{" "}
                      <span>{selectedImageData.publishedDate}</span>
                    </h3>
                  </div>
                  {selectedImageData.cameraName && (
                    <div className="camera">
                      <i className="bi bi-camera-fill"></i>
                      <h3>{selectedImageData.cameraName}</h3>
                    </div>
                  )}
                  <div className="usage">
                    <i className="bi bi-shield-check"></i>
                    <h3>
                      Free to use under{" "}
                      <a
                        href="https://unsplash.com/license"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Unsplash License
                      </a>
                    </h3>
                  </div>
                </div>
                {selectedImageData.imageDescription && (
                  <div className="description">
                    <span>{selectedImageData.imageDescription}</span>
                  </div>
                )}
              </div>
            </div>
            <RelatedImages
              apiKey={props.apiKey}
              imageId={selectedImageData.imageId}
              openImageHandler={props.openImageHandler}
              updateSelectedImageData={updateSelectedImageData}
            />
          </div>
        </div>,
        document.querySelector(".selected-image__modal")
      )}
    </React.Fragment>
  );
}
