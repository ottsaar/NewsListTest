import React from "react";
import { Article, ArticleType } from "./Article";
import { useQuery, gql } from "@apollo/client";
import { NEWS_LIST } from "../graphql/articles";

export function Articles() {
  const { data, loading, error } = useQuery(NEWS_LIST);
  if (loading)
    return (
      <>
        <p>"Loading..."</p>
      </>
    );
  if (error) return <>{error.message}</>;
  const articles: ArticleRow[] = data.newsList.rows;

  return (
    <div className="articles">
      {articles.map((row) => {
        return <Article title={row.title} imgSrc={row.img} />;
      })}
    </div>
  );
}

interface ArticleRow {
  id: string;
  url: string;
  title: string;
  content: string;
  img: string;
}
