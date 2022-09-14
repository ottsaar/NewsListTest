import React from "react";
import "./scss/styles.scss";

export interface ArticleType {
  imgSrc: string;
  title: string;
  isMainArticle?: boolean;
  id: string;
}

export function ArticleThumbnail(props: ArticleType) {
  return (
    <div className="article-thumbnail">
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
    </div>
  );
}
