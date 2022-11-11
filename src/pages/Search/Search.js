import React, { useEffect, useState } from "react";
import axios from "axios";
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
    props.setProgress(30);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${search}&client_id=${
          props.apiKey
        }&page=${pageNum}&per_page=30${
          orientation && `&orientation=${orientation}`
        }${color ? `&color=${color}` : ""}${
          order_by ? `&order_by=${order_by}` : ""
        }`
      );
      props.setProgress(50);
      setTotalImages(
        response.data.total >= 1000
          ? (response.data.total / 1000).toFixed(1) + "k"
          : response.data.total
      );
      props.setProgress(70);
      setTotalImagesPages(response.data.total_pages);
      setImages(response.data.results);
      props.setPagination(true);
      props.setProgress(100);
    } catch (error) {}
  };

  const updateSearchUsers = async (pageNum) => {
    props.setProgress(30);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/users?query=${search}&client_id=${props.apiKey}&page=${pageNum}&per_page=30`
      );
      props.setProgress(50);
      setTotalUsers(
        response.data.total >= 1000
          ? (!(response.data.total / 1000).toString().includes(".0")
              ? (response.data.total / 1000).toFixed(1)
              : response.data.total / 1000) + "k"
          : response.data.total
      );
      setTotalUserPages(response.data.total_pages);
      setUsers(response.data.results);
      props.setProgress(100);
    } catch (error) {}
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
            setPagination={props.setPagination}
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
