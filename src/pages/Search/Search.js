import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Images from "../../components/UI/Images/Images";
import Users from "../../components/UI/Users/Users";
import "./Search.css";
import SearchNav from "./SearchNav/SearchNav";

export default function Search(props) {
  const { type, search } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const orientation = searchParams.get("orientation");
  const color = searchParams.get("color");
  const order_by = searchParams.get("order_by");

  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState("");
  const [totalImagesPages, setTotalImagesPages] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersPages, setTotalUserPages] = useState(0);

  const updateSearchPhotos = async (pageNum) => {
    props.setProgress(10);
    const url = `https://api.unsplash.com/search/photos?query=${search}&client_id=${
      props.apiKey
    }&page=${pageNum}&per_page=30${
      orientation && `&orientation=${orientation}`
    }${color ? `&color=${color}` : ""}${
      order_by ? `&order_by=${order_by}` : ""
    }`;
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setTotalImages(
      parsedData.total >= 1000
        ? (parsedData.total / 1000).toFixed(1) + "k"
        : parsedData.total
    );
    setTotalImagesPages(parsedData.total_pages);
    setImages(parsedData.results);
    props.setPagination(true);
    props.setProgress(100);
  };

  const updateSearchUsers = async (pageNum) => {
    props.setProgress(10);
    const url = `https://api.unsplash.com/search/users?query=${search}&client_id=${props.apiKey}&page=${pageNum}&per_page=30`;
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setTotalUsers(
      parsedData.total >= 1000
        ? (!(parsedData.total / 1000).toString().includes(".0")
            ? (parsedData.total / 1000).toFixed(1)
            : parsedData.total / 1000) + "k"
        : parsedData.total
    );
    setTotalUserPages(parsedData.total_pages);
    setUsers(parsedData.results);
    props.setProgress(100);
  };

  useEffect(() => {
    updateSearchPhotos(props.pageNum);
    updateSearchUsers(props.pageNum);
    return () => {};
    // eslint-disable-next-line
  }, [type, search, searchParams, props.pageNum]);

  return (
    <React.Fragment>
      <SearchNav
        setTotalPages={props.setTotalPages}
        totalImages={totalImages}
        totalImagesPages={totalImagesPages}
        totalUsers={totalUsers}
        totalUsersPages={totalUsersPages}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {type === "photos" ? (
        <div className="searched-images__wrapper">
          <Images
            images={images}
            apiKey={props.apiKey}
            setProgress={props.setProgress}
            setIsImageDownloaded={props.setIsImageDownloaded}
            setDownloadedImageData={props.setDownloadedImageData}
          />
        </div>
      ) : (
        <div className="searched-users__wrapper">
          <Users users={users} />
        </div>
      )}
    </React.Fragment>
  );
}
