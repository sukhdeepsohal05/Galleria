import React from "react";

const stateContext = React.createContext({
  isImageOpened: false,
  pageNum: 1,
  isImageDownloaded: false,
  downloadedImageData: {
    downloadedImage: "",
    userProfileLink: "",
    userName: "",
  },
  cancelBtnHandler: ()=>{},
});

export default stateContext;
