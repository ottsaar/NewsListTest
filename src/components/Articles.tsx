import React from "react";
import { ArticleThumbnail } from "./ArticleThumbnail";
import { useQuery } from "@apollo/client";
import { NEWS_LIST } from "../graphql/getters/newsList";
import { Link } from "react-router-dom";

export function Articles() {
  const { data, loading, error } = useQuery(NEWS_LIST);
  if (loading)
    return (
      <>
        <div>"Loading..."</div>
      </>
    );
  if (error) return <>{error.message}</>;
  const articles: ArticleRow[] = data.newsList.rows;

  return (
    <div className="articles">
      {articles.map((row) => {
        const urlRef = "news/" + row.id;
        return (
          <Link key={row.id} to={urlRef}>
            <ArticleThumbnail title={row.title} imgSrc={row.img} id={row.id} />
          </Link>
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
