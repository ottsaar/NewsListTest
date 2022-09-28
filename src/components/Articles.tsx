import React from "react";

import { useQuery } from "@apollo/client";
import { NEWS_LIST } from "../graphql/getters/newsList";

import { ArticleThumbnail } from "./ArticleThumbnail";
import bikeDelivery from "../assets/svgs/bike-delivery.svg";
import "./scss/articles.scss";
import { MissingNewsComponent } from "../assets/MissingNewsComponent";
import { Link } from "react-router-dom";

export function Articles() {
  const { data, loading, error } = useQuery(NEWS_LIST);

  if (loading)
    return (
      <div className="articles-loading">
        <img className="articles-loading__img" src={bikeDelivery} />
        <div className="articles-loading__background">
          <div className="articles-loading__speed-lines" />
          <div className="articles-loading__speed-lines" />
          <div className="articles-loading__speed-lines" />
          <div className="articles-loading__ground" />
        </div>

        <div className="articles-loading__text">
          Getting you the freshest news from the web!
        </div>
      </div>
    );

  if (error || !data.newsList?.rows?.length)
    return (
      <div className="article-not-found">
        <MissingNewsComponent />
        <div className="article-not-found__text">
          There was an issue loading articles.
          <br /> Please try again later
        </div>
      </div>
    );

  const articles: ArticleRow[] = data.newsList.rows;
  return (
    <div className="articles">
      {articles.map((row) => {
        return (
          <ArticleThumbnail
            key={row.id}
            title={row.title}
            imgSrc={row.img}
            id={row.id}
          />
        );
      })}
    </div>
  );
}

interface ArticleRow {
  id: string;
  title: string;
  img: string;
}
