import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Home.module.css";
import TopicsNav from "../Topics/Topics Nav/TopicsNav";
import Images from "../../components/UI/Images/Images";

export default function Home(props) {
  document.title = "Galleria React App";
  const [images, setImages] = useState([]);

  const updateImages = async (pageNum) => {
    try {
      props.setProgress(30);
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${props.apiKey}&page=${pageNum}&per_page=30`
      );
      props.setProgress(70);
      setImages(response.data);
      props.setTotalPages(300);
      props.setPagination(true);
      props.setProgress(100);
    } catch (error) {}
  };

  useEffect(() => {
    updateImages(props.pageNum);
    return () => {};
    // eslint-disable-next-line
  }, [props.pageNum]);

  return (
    <React.Fragment>
      <TopicsNav setPageNum={props.setPageNum} />
      <div className={classes["home-images__wrapper"]}>
        <Images
          images={images}
          apiKey={props.apiKey}
          setProgress={props.setProgress}
          setPagination={props.setPagination}
          setIsImageDownloaded={props.setIsImageDownloaded}
          setDownloadedImageData={props.setDownloadedImageData}
        />
      </div>
    </React.Fragment>
  );
}
