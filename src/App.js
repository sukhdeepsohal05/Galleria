import React, { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar/Navbar";
import Pagination from "./components/Pagination/Pagination";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Topics from "./pages/Topics/Topics";
import stateContext from "./components/Helpers/stateContext";
import SelectedPhoto from "./pages/SelectedPhoto/SelectedPhoto";
import Attribution from "./components/Attribution/Attribution";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

export default function App() {
  const apiKey = process.env.REACT_APP_IMAGE_API;
  const [pageNum, setPageNum] = useState(1);
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isImageDownloaded, setIsImageDownloaded] = useState(false);
  const [downloadedImageData, setDownloadedImageData] = useState({});
  const [pagination, setPagination] = useState(true);

  const location = useLocation();
  const urlPath = location.pathname;

  const ctx = useContext(stateContext);

  const previousPageBtn = () => {
    setPageNum((prev) => {
      return prev - 1;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const nextPageBtn = () => {
    setPageNum((prev) => {
      return prev + 1;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (urlPath !== location.pathname) {
    setPageNum(1);
  }

  const cancelBtnHandler = () => {
    setIsImageDownloaded(false);
  };

  return (
    <stateContext.Provider value={{ pageNum: pageNum }}>
      <LoadingBar color="#f11946" progress={progress} />
      <Navbar setPageNum={setPageNum} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              apiKey={apiKey}
              pageNum={pageNum}
              setPageNum={setPageNum}
              setTotalPages={setTotalPages}
              setPagination={setPagination}
              setProgress={setProgress}
              setIsImageDownloaded={setIsImageDownloaded}
              setDownloadedImageData={setDownloadedImageData}
            />
          }
        />
        <Route
          exact
          path="/t/:topic"
          element={
            <Topics
              apiKey={apiKey}
              pageNum={pageNum}
              setPageNum={setPageNum}
              setTotalPages={setTotalPages}
              setPagination={setPagination}
              setProgress={setProgress}
              setIsImageDownloaded={setIsImageDownloaded}
              setDownloadedImageData={setDownloadedImageData}
            />
          }
        />
        <Route
          exact
          path="/s/:type/:search"
          element={
            <Search
              apiKey={apiKey}
              pageNum={pageNum}
              setProgress={setProgress}
              setTotalPages={setTotalPages}
              setPagination={setPagination}
              setIsImageDownloaded={setIsImageDownloaded}
              setDownloadedImageData={setDownloadedImageData}
            />
          }
        />
        {!ctx.isImageOpened && (
          <Route
            exact
            path="/photos/:photoId"
            element={
              <SelectedPhoto
                apiKey={apiKey}
                setProgress={setProgress}
                setPagination={setPagination}
                setIsImageDownloaded={setIsImageDownloaded}
                setDownloadedImageData={setDownloadedImageData}
              />
            }
          />
        )}
        <Route path="*" element={<ErrorPage setPagination={setPagination}/>} />
      </Routes>
      {pagination && (
        <Pagination
          previousPageBtn={previousPageBtn}
          nextPageBtn={nextPageBtn}
          pageNum={pageNum}
          totalPages={totalPages}
        />
      )}
      {isImageDownloaded && (
        <Attribution
          isImageDownloaded={isImageDownloaded}
          cancelBtnHandler={cancelBtnHandler}
          downloadedImageData={downloadedImageData}
        />
      )}
    </stateContext.Provider>
  );
}
