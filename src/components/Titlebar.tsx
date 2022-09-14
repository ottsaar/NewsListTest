import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import backArrow from "../assets/svgs/back-arrow.svg";
import "./scss/styles.scss";

export function Titlebar() {
  const location = useLocation();
  return (
    <>
      <div className="title-bar">
        {"/" != location.pathname ? (
          <Link to="/">
            <img className="title-bar__back-btn" src={backArrow} alt="" />
          </Link>
        ) : (
          <></>
        )}
        <div className="title-bar__header">World News</div>
      </div>

      <Outlet />
    </>
  );
}
