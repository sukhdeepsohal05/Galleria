import React, { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./searchNav.css";
import SearchNavData from "./SearchNavData.json";

export default function SearchNav(props) {
  const { search } = useParams();

  const [orientationMenu, setOrientationMenu] = useState();
  const [colorMenu, setColorMenu] = useState();
  const [sortMenu, setSortMenu] = useState();

  useEffect(() => {
    setColorMenu(false);
    setSortMenu(false);
    setOrientationMenu(false);
  }, [props.searchParams]);

  const orientationLink = (value) => {
    props.searchParams.delete("orientation");
    props.setSearchParams(
      `${
        props.searchParams.get("order_by")
          ? `&order_by=${props.searchParams.get("order_by")}&`
          : `?`
      }orientation=${value}${
        props.searchParams.get("color")
          ? `&color=${props.searchParams.get("color")}`
          : ""
      }`
    );
  };
  const colorLink = (value) => {
    props.searchParams.delete("color");
    props.setSearchParams(
      `${
        props.searchParams.toString() !== ""
          ? `?${props.searchParams.toString()}&color=${value}`
          : `color=${value}`
      }`
    );
  };

  return (
    <div className="search__nav">
      <ul className="search-nav__items">
        <li className="search-nav__item">
          <NavLink
            to={"/s/photos/" + search}
            onClick={() => {
              props.setTotalPages(props.totalImagesPages);
              window.scrollTo({ top: 0 });
            }}
          >
            <i className="bi bi-image-fill"></i>
            <span>Photos</span>
            <span>&nbsp;{props.totalImages}</span>
          </NavLink>
        </li>
        <li className="search-nav__item">
          <NavLink
            to={"/s/users/" + search}
            onClick={() => {
              props.setTotalPages(props.totalUsersPages);
              window.scrollTo({ top: 0 });
            }}
          >
            <i className="bi bi-people-fill"></i>
            <span>Users</span>
            <span>&nbsp;{props.totalUsers}</span>
          </NavLink>
        </li>
      </ul>
      {window.location.pathname.includes("/s/photos/") && (
        <ul className="search-options">
          <li className="search-option">
            <span
              onClick={() => {
                setColorMenu(false);
                setSortMenu(false);
                orientationMenu
                  ? setOrientationMenu(false)
                  : setOrientationMenu(true);
              }}
            >
              Any orientation
            </span>
            <div className="menu" key={"orientation"}>
              <ul
                className={`menu-items ${orientationMenu ? "show" : "hide"}`}
                style={{ right: "270px" }}
              >
                <li
                  className={`menu-item ${
                    props.searchParams.get("orientation") ? "" : "active"
                  }`}
                  onClick={() => {
                    props.searchParams.delete("orientation");
                    props.setSearchParams(props.searchParams);
                  }}
                >
                  <Link to={props.searchParams}>Any orientation</Link>
                </li>
                {SearchNavData[0].orientations.map((orientation) => {
                  return (
                    <li
                      key={orientation.name}
                      className={`menu-item ${
                        props.searchParams.get("orientation") ===
                        orientation.link_name
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        orientationLink(orientation.link_name);
                      }}
                    >
                      <Link
                        to={`${
                          props.searchParams.get("order_by")
                            ? `?order_by=${props.searchParams.get("order_by")}&`
                            : `?`
                        }orientation=${orientation.link_name}${
                          props.searchParams.get("color")
                            ? `&color=${props.searchParams.get("color")}`
                            : ""
                        }`}
                      >
                        {orientation.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
          <li className="search-option">
            <span
              onClick={() => {
                setSortMenu(false);
                setOrientationMenu(false);
                colorMenu ? setColorMenu(false) : setColorMenu(true);
              }}
            >
              Any color
            </span>
            <div className="menu" key={"color"}>
              <ul
                className={`menu-items ${colorMenu ? "show" : "hide"}`}
                style={{ minWidth: "168px", right: "170px" }}
              >
                <li
                  className={`menu-item ${
                    props.searchParams.get("color") ? "" : "active"
                  }`}
                  onClick={() => {
                    props.searchParams.delete("color");
                    props.setSearchParams(props.searchParams);
                  }}
                >
                  <Link to={props.searchParams}>Any color</Link>
                </li>
                <li
                  className={`menu-item ${
                    props.searchParams.get("color") === "black_and_white"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    colorLink(SearchNavData[1].colors[0].link_name);
                  }}
                >
                  <Link
                    to={`${
                      props.searchParams.toString() !== ""
                        ? `?${props.searchParams}`
                        : ""
                    }&color=${SearchNavData[1].colors[0].link_name}`}
                  >
                    {SearchNavData[1].colors[0].name}
                  </Link>
                </li>
                <li className="menu-item tones">
                  <div
                    style={{
                      marginBottom: "12px",
                      color: "#555",
                      cursor: "default",
                    }}
                  >
                    Tone
                  </div>
                  <div className="tones-wrapper">
                    {SearchNavData[1].colors[1].tones.map((tone) => {
                      return (
                        <div
                          className={`tone ${
                            props.searchParams.get("color") ===
                            tone.name.toLowerCase()
                              ? "active"
                              : ""
                          }`}
                          title={tone.name}
                          key={tone.name}
                          onClick={() => {
                            colorLink(tone.name.toLowerCase());
                          }}
                        >
                          <Link
                            to={`${
                              props.searchParams.toString() !== ""
                                ? `?${props.searchParams}`
                                : ""
                            }&color=${tone.name.toLowerCase()}`}
                            style={{ background: tone.name }}
                          ></Link>
                        </div>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li className="search-option">
            <span
              onClick={(e) => {
                setColorMenu(false);
                setOrientationMenu(false);
                sortMenu ? setSortMenu(false) : setSortMenu(true);
              }}
            >
              Sort by Relevance
            </span>
            <div className="menu" key={"order_by"}>
              <ul
                className={`menu-items ${sortMenu ? "show" : "hide"}`}
                style={{ minWidth: "135px", right: "10px" }}
              >
                <li
                  className={`menu-item ${
                    props.searchParams.get("order_by") ? "" : "active"
                  }`}
                  onClick={() => {
                    props.searchParams.delete("order_by");
                    props.setSearchParams(props.searchParams);
                  }}
                >
                  <Link to={props.searchParams}>Relevance</Link>
                </li>
                <li
                  className={`menu-item ${
                    props.searchParams.get("order_by") === "latest"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    props.searchParams.delete("order_by");
                    props.setSearchParams(
                      `${
                        props.searchParams.toString() !== ""
                          ? `?order_by=latest&${props.searchParams}&`
                          : `?order_by=latest`
                      }`
                    );
                  }}
                >
                  <Link
                    to={`?order_by=latest${
                      props.searchParams.toString() !== ""
                        ? `&${props.searchParams}`
                        : ""
                    }`}
                  >
                    Newest
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
