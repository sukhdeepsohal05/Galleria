import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicsNav from "../Topics/Topics Nav/TopicsNav";
import Images from "../../components/UI/Images/Images";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Topics(props) {
  const { topic } = useParams();

  const [images, setImages] = useState([]);
  const [isTopicFound, setIsTopicFound] = useState(true);

  const updateImages = async (pageNum) => {
    props.setProgress(10);
    const url = `https://api.unsplash.com/topics/${topic}/photos?client_id=${props.apiKey}&page=${pageNum}&per_page=30`;
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(100);
    props.setPagination(true);
    if (!parsedData.errors) {
      setImages(parsedData);
      props.setTotalPages(100);
    } else {
      setIsTopicFound(false);
    }
  };

  useEffect(() => {
    updateImages(props.pageNum);
    // eslint-disable-next-line
  }, [topic, props.pageNum]);

  return (
    <React.Fragment>
      {isTopicFound ? (
        <Fragment>
          <TopicsNav setPageNum={props.setPageNum} />
          <div className="topic-images__wrapper">
            <Images
              images={images}
              apiKey={props.apiKey}
              setProgress={props.setProgress}
              setIsImageDownloaded={props.setIsImageDownloaded}
              setDownloadedImageData={props.setDownloadedImageData}
            />
          </div>
        </Fragment>
      ) : (
        <ErrorPage setPagination={props.setPagination}/>
      )}
    </React.Fragment>
  );
}
