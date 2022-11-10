import React, { useContext } from "react";
import stateContext from "../Helpers/stateContext";
import "./pagination.css";

export default function Pagination(props) {
  const ctx = useContext(stateContext);
  return (
    <React.Fragment>
      <div className="pagination-wrapper">
        <div
          className={`page-item ${ctx.pageNum > 1 ? "" : "disabled"}`}
          role="button"
          onClick={props.previousPageBtn}
        >
            &#8592;
        </div>
        <span className="page-item active">{ctx.pageNum}</span>
        <div
          className={`page-item ${
            ctx.pageNum === props.totalPages ? "disabled" : ""
          }`}
          role="button"
          onClick={props.nextPageBtn}
        >&#8594;</div>
      </div>
    </React.Fragment>
  );
}
