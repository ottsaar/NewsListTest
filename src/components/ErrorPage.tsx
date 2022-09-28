import React from "react";
import { Link } from "react-router-dom";
import { MissingPage } from "../assets/MissingPage";

export function ErrorPage() {
  return (
    <div className="error-page">
      <MissingPage />
      <div>It seems the page you are looking for is not here</div>

      <Link className="primary-btn" to="/">
        RETURN TO MAIN MENU
      </Link>
    </div>
  );
}
