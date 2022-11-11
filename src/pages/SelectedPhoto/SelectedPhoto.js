import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelatedImages from "../../components/RelatedImages/RelatedImages";
import DownloadBtn from "../../components/UI/DowloadBtn/DownloadBtn";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./selectedPhoto.css";

export default function SelectedPhoto(props) {
  const { photoId } = useParams();

  const [isImageFound, setIsImageFound] = useState(true);
  const [selectedPhotoData, setSelectedPhotoData] = useState([]);
  const [downloadMenu, setDownloadMenu] = useState(false);

  const updateSelectedPhoto = async (imageId) => {
    props.setProgress(30);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${imageId}?client_id=${props.apiKey}`
      );
      props.setProgress(50);
      setSelectedPhotoData({
        imageId: response.data.id,
        imageThumbSrc: response.data.urls.thumb,
        imageSmallSrc: response.data.urls.small,
        imageRegularSrc: response.data.urls.regular,
        imageFullSrc: response.data.urls.full,
        downloadHref: response.data.links.download,
        imageViews: response.data.views.toLocaleString(),
        imageDownloads: response.data.downloads.toLocaleString(),
        imageDescription: response.data.description,
        imageLocation: response.data.location.name,
        publishedDate: new Date(`${response.data.created_at}`).toLocaleString(
          "EN-US",
          { month: "long", day: "numeric", year: "numeric" }
        ),
        cameraName: response.data.exif.name,
        userImage: response.data.user.profile_image.small,
        name: response.data.user.name,
        userName: response.data.user.username,
        userStatus: response.data.user.for_hire,
        userProfileLink: response.data.user.links.html,
      });
      props.setProgress(70);
      props.setPagination(false);
      props.setProgress(100);
    } catch (error) {
      props.setProgress(100);
      setIsImageFound(false);
    }
  };

  useEffect(() => {
    updateSelectedPhoto(props.imageId ? props.imageId : photoId);
    return () => {};
    // eslint-disable-next-line
  }, [photoId, props.imageId]);

  const text = `Thanks to ${selectedPhotoData.name} @${selectedPhotoData.userName} for making this photo available freely on Unsplash 🎁 `;
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

  return (
    <React.Fragment>
      {isImageFound ? (
        <div
          className="selected-photo__wrapper"
          onClick={(e) => {
            e.stopPropagation();
            if (downloadMenu) {
              setDownloadMenu(false);
            }
          }}
        >
          <div>
            <header
              style={props.headerStyle ? props.headerStyle : { top: "48px" }}
            >
              <a
                href={selectedPhotoData.userProfileLink}
                target="_blank"
                rel="noreferrer"
                className="image-user-detail__wrapper"
              >
                <figure className="user-image">
                  <img src={selectedPhotoData.userImage} alt="" />
                </figure>
                <div className="image-description">
                  <span className="image-description__text">
                    <div className="user-name">{selectedPhotoData.name}</div>
                    {selectedPhotoData.userStatus ? (
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
                downloadedImage={selectedPhotoData.imageSmallSrc}
                userProfileLink={selectedPhotoData.userProfileLink}
                userName={selectedPhotoData.name}
                downloadUrl={selectedPhotoData.downloadHref}
                setIsImageDownloaded={props.setIsImageDownloaded}
                setDownloadedImageData={props.setDownloadedImageData}
              />
            </header>
            <div className="selected-image">
              <img
                src={selectedPhotoData.imageRegularSrc}
                alt=""
                onClick={zoomImageHandler}
              />
            </div>
            <div className="selected-image__details">
              <div className="stats">
                <div className="views">
                  <h3>Views</h3>
                  <span>{selectedPhotoData.imageViews}</span>
                </div>
                <div className="downloads">
                  <h3>Downloads</h3>
                  <span>{selectedPhotoData.imageDownloads}</span>
                </div>
              </div>
              <div className="actions">
                <div className="share-btn" onClick={shareBtnHandler}>
                  <i className="fa-solid fa-share"></i>
                  <span>Share</span>
                </div>
              </div>
              <div className="details">
                {selectedPhotoData.imageLocation && (
                  <div className="location">
                    <i className="bi bi-geo-alt-fill"></i>
                    <h3>{selectedPhotoData.imageLocation}</h3>
                  </div>
                )}
                <div className="published-date">
                  <i className="bi bi-calendar4"></i>
                  <h3>
                    Published on <span>{selectedPhotoData.publishedDate}</span>
                  </h3>
                </div>
                {selectedPhotoData.cameraName && (
                  <div className="camera">
                    <i className="bi bi-camera-fill"></i>
                    <h3>{selectedPhotoData.cameraName}</h3>
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
              {selectedPhotoData.imageDescription && (
                <div className="description">
                  <span>{selectedPhotoData.imageDescription}</span>
                </div>
              )}
            </div>
          </div>
          {selectedPhotoData.imageId !== undefined && (
            <RelatedImages
              imageId={selectedPhotoData.imageId}
              apiKey={props.apiKey}
              openImageHandler={props.openImageHandler}
              updateSelectedImageData={updateSelectedPhoto}
              setIsImageDownloaded={props.setIsImageDownloaded}
              setDownloadedImageData={props.setDownloadedImageData}
            />
          )}
        </div>
      ) : (
        <ErrorPage setPagination={props.setPagination} />
      )}
    </React.Fragment>
  );
}
