import React from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { NEWS_ITEM } from "../graphql/newsItem";

import { CommentType } from "./Comment";

export function ArticleView(id: string) {
  let { data, loading, error } = useQuery<NewsItem>(NEWS_ITEM, {
    variables: { id },
  });
  if (loading)
    return (
      <>
        <div>"Loading article..."</div>
      </>
    );
  if (error) return <>{error.message}</>;
  if (!data) {
    return <>Article data wasn't found</>;
  }

  return (
    <div className="article-wrapper">
      <div className="article">
        <img src={data.img} className="article__img" />
        <div className="article__title">{data.title}</div>
        <div className="article__content">{data.content}</div>
      </div>
      <div className="article-comments"></div>
    </div>
  );
}

interface QueryResult {
  data?: NewsItem;
  loading: string;
  error: ApolloError;
}

interface NewsItem {
  id: string;
  url: string;
  title: string;
  content: string;
  img: string;
  comments: CommentType[];
}
