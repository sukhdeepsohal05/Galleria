import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./TopicsNav.css";
import TopicsNavData from "./TopicsNavData.json";

export default function TopicsNav(props) {
  const changeShade = (e) => {
    const scroller = e.target;
    if (scroller.scrollLeft === 0) {
      scroller.classList.remove("left");
    } else if (
      Math.floor(scroller.scrollLeft) >=
      scroller.scrollWidth - (scroller.offsetWidth + 2)
    ) {
      scroller.classList.remove("right");
    } else {
      scroller.classList.add("left");
      scroller.classList.add("right");
    }
  };

  return (
    <React.Fragment>
      <div className="nav-items__wrapper">
        <div
          className="nav-item"
          onClick={() => {
            props.setPageNum(1);
          }}
        >
          <Link
            to="/"
            className={window.location.pathname === "/" ? "active" : ""}
          >
            Editorial
          </Link>
        </div>
        <div className="line"></div>
        <div className="items-container right" onScroll={changeShade}>
          <ul className="nav-items">
            {TopicsNavData.map((TopicsNavItem) => {
              return (
                <li
                  key={TopicsNavItem.id}
                  className="nav-item"
                  onClick={() => {
                    props.setPageNum(1);
                  }}
                >
                  <NavLink to={`/t/${TopicsNavItem.targetName}`}>
                    {TopicsNavItem.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
