import React from "react";
import "./scss/articles.scss";

export interface ArticleType {
  imgSrc: string;
  title: string;
  isMainArticle?: boolean;
}
export function Article(props: ArticleType) {
  return (
    <div className="article">
      <img className="article-img" src={props.imgSrc} alt="article-img" />
      <div
        className={
          props.isMainArticle ? "article-title--main" : "article-title"
        }
      >
        {props.title}
      </div>
    </div>
  );
}
