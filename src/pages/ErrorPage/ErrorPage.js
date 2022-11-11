import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./errorPage.module.css";

export default function ErrorPage(props) {
  document.title = "Page not found | Galleria";

  useEffect(() => {
    props.setPagination(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes["main-container"]}>
      <div className={classes["dark-overlay"]}></div>
      <img
        src="https://source.unsplash.com/random/?night,dark,landscape"
        alt=""
        loading="lazy"
      />
      <div className={classes["content-wrapper"]}>
        <div className={classes["nav"]}>
          <Link to="/" className={classes["nav-logo"]}>
            Galleria.
          </Link>
        </div>
        <div className={classes["content"]}>
          <h1>PAGE NOT FOUND</h1>
          <p>
            Hmm, the page you were looking for doesn't seem to exist anymore.
          </p>
          <Link to="/" className={classes["back-to-btn"]}>
            Back To Galleria
          </Link>
        </div>
      </div>
    </div>
  );
}
