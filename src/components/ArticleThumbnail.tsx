import React from "react";
import { Link } from "react-router-dom";
import "./scss/styles.scss";

export interface ArticleType {
  imgSrc: string;
  title: string;
  isMainArticle?: boolean;
  id: string;
}

export function ArticleThumbnail(props: ArticleType) {
  const urlRef = "news/" + props.id;
  return (
    <Link className="article-thumbnail" to={urlRef}>
      <img
        className="article-thumbnail__img"
        src={props.imgSrc}
        alt="article-img"
      />
      <div
        className={
          props.isMainArticle
            ? "article-thumbnail__title--main"
            : "article-thumbnail__title"
        }
      >
        {props.title}
      </div>
    </Link>
  );
}
