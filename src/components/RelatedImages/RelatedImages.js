import React, { useState, useEffect} from "react";
import classes from './relatedImages.module.css'
import RelatedImage from "./RelatedImage";
import { useParams } from "react-router-dom";

export default function RelatedImages(props) {
  const [relatedImages, setRelatedImages] = useState([]);
  const { photoId } = useParams();

  const updateRelatedImages = async (imageId) => {
    const url = `https://api.unsplash.com/photos/${imageId}/related?client_id=${props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setRelatedImages(parsedData);
  };

  useEffect(() => {
    updateRelatedImages(photoId ? photoId : props.imageId ? props.imageId : 'ERdTJQTtsbE');
    // eslint-disable-next-line
  }, [photoId]);

  return (
    <>
      {relatedImages.total > 0 && (
        <div className={classes["related-images__main-wrapper"]}>
          <h3>Related Photos</h3>
          <div className={classes["related-images__wrapper"]}>
            {relatedImages.results.map((element, index) => {
              const imageData = {
                id: element.id,
                name: element.user.name,
                imageSmallSrc: element.urls.small,
                imageRegularSrc: element.urls.regular,
                imageFullSrc: element.urls.full,
                userImage: element.user.profile_image.small,
                userProfileLink: element.user.links.html,
                userStatus: element.user.for_hire,
                downloadHref: element.links.download
              };

              return (
                <RelatedImage
                  key={index}
                  imageData={imageData}
                  updateRelatedImages={updateRelatedImages}
                  updateSelectedImageData={props.updateSelectedImageData}
                  setIsImageDownloaded={props.setIsImageDownloaded}
                  setDownloadedImageData={props.setDownloadedImageData}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
