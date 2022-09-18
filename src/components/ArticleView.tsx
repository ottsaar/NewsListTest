import React from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { NEWS_ITEM } from "../graphql/newsItem";
import "./scss/article.scss";
import { CommentType, Comment } from "./Comment";
import { useParams } from "react-router-dom";

export function ArticleView() {
  const params = useParams();
  let { data, loading, error } = useQuery(NEWS_ITEM, {
    variables: { id: params.newsId },
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
  const newsItem = data.newsItem as NewsItem;
  return (
    <>
      <img src={newsItem.img} className="article__img" />
      <div className="article-wrapper">
        <div className="article">
          <div className="article__date">12 hours ago</div>
          <div className="article__title">{newsItem.title}</div>
          <div className="article__content">{newsItem.content}</div>
        </div>
        <div className="article-comments">
          <div className="article-comments__title">Comments</div>
          <div className="article-comments__comments">
            {newsItem.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  createdDate={comment.createdDate}
                  content={comment.content}
                  email={comment.email}
                />
              );
            })}
          </div>
          <div className="article-comments__title">Leave a comment</div>
          <div className="article-comments__sub-title">Email</div>
          <input type="email" className="article-comments__email-input" />
          <div className="article-comments__sub-title">Comment</div>
          <textarea className="article-comments__comment-input"></textarea>
          <button className="article-comments__add-btn">ADD COMMENT</button>
        </div>
      </div>
    </>
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
