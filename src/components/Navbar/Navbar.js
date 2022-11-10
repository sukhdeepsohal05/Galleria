import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <Link
          to="/"
          className={classes.logo}
          onClick={() => {
            props.setPageNum(1);
          }}
        >
          Galleria.
        </Link>
        <form
          className={classes["search-container"]}
          onSubmit={(e) => {
            e.preventDefault();
            const link = document.querySelector('.submit');
            link.click();
          }}
        >
          <input
            type="text"
            name="Search"
            className={classes["search-input"]}
            placeholder="Search Photos"
            required
            autoComplete="off"
            onChange={(e) => {
              setSearchQuery(() => {
                const splitImageName = e.target.value.trim().split(" ");
                const joinedImageName = splitImageName.join("-");

                return joinedImageName;
              });
            }}
          />
          <button
            type="submit"
            className={classes["submit-btn"]}
          >
            <Link
              to={searchQuery.trim().length !== 0 && "/s/photos/" + searchQuery.trim()}
              onClick={() => {
                props.setPageNum(1);
              }}
              className="submit"
            >
              <i className="bi bi-search"></i>
            </Link>
          </button>
        </form>
      </nav>
    </React.Fragment>
  );
}
