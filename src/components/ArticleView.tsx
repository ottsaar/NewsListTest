import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { ApolloError, useApolloClient, useQuery } from "@apollo/client";
import { NEWS_ITEM } from "../graphql/getters/newsItem";
import { CREATE_COMMENT } from "../graphql/setters/createComment";
import { NEWS_COMMENTS } from "../graphql/getters/newsComments";

import { CommentType, Comment } from "./Comment";
import placeholder from "../assets/svgs/placeholder-image.svg";
import noComments from "../assets/imgs/nocomments.png";
import { MissingNewsComponent } from "../assets/MissingNewsComponent";

import "./scss/article.scss";

export function ArticleView() {
  const params = useParams();
  const apolloClient = useApolloClient();
  const newsItemData = useQuery(NEWS_ITEM, {
    variables: { id: params.newsId },
  });
  const commentsData = useQuery(NEWS_COMMENTS, {
    variables: { id: params.newsId },
  });

  const [inputs, setInputs] = useState({
    email: "",
    content: "",
  });

  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function addComment(e: FormEvent, id: string) {
    e.preventDefault();

    if (inputs.email && inputs.content) {
      await apolloClient.mutate({
        mutation: CREATE_COMMENT,
        variables: { ...inputs, id },
      });
      setInputs((values) => ({ ...values, email: "", content: "" }));
      commentsData.refetch();
    }
  }

  if (newsItemData.loading)
    return (
      <motion.div
        className="article-view article-view--placeholder"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.25 }}
      >
        <div className="article__img-wrapper">
          <img
            className="article__img article__img--placeholder"
            src={placeholder}
          />
        </div>

        <div className="article-wrapper">
          <div className="article">
            <div className="article__date">
              <div className="article__placeholder article__placeholder--date" />
            </div>
            <div className="article__title">
              <div className="article__placeholder article__placeholder--title" />
            </div>
            <div className="article__content">
              <div className="article__placeholder" />
              <div className="article__placeholder" />
              <div className="article__placeholder" />
              <div className="article__placeholder" />
              <div className="article__placeholder" />
            </div>
            <a className="primary-btn article__article-btn" />
          </div>
          <div className="article-comments">
            <div className="article-comments__title">Comments</div>
            <div className="article-comments__comments" />
          </div>
        </div>
      </motion.div>
    );

  if (
    newsItemData.error ||
    !newsItemData.data ||
    !newsItemData.data?.newsItem
  ) {
    return (
      <div className="article-not-found">
        <MissingNewsComponent />
        <div className="article-not-found__text">Article wasn't found.</div>
        <Link className="primary-btn" to="/">
          RETURN TO MAIN MENU
        </Link>
      </div>
    );
  }

  const newsItem = newsItemData.data.newsItem as NewsItem;
  const newsComments = commentsData.data
    ? (commentsData.data?.newsItem as {
        comments: CommentType[];
      })
    : { comments: [] };
  return (
    <motion.div
      className="article-view"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.25 }}
    >
      <div className="article__img-wrapper">
        <div
          className="article__img"
          style={{ backgroundImage: `url(${newsItem.img})` }}
        />
      </div>

      <div className="article-wrapper">
        <div className="article">
          <div className="article__date" data-title="28.09.2022">
            12 hours ago
          </div>
          <div className="article__title">{newsItem.title}</div>
          <div className="article__content">{newsItem.content}</div>
          <a className="primary-btn  article__article-btn" href={newsItem.url}>
            READ FULL ARTICLE
          </a>
        </div>
        <div className="article-comments">
          <div className="article-comments__title">Comments</div>
          <div className="article-comments__comments">
            {commentsData.loading ? (
              <></>
            ) : !newsComments.comments.length ? (
              <div className="article-comments__empty-state">
                <img
                  className="article-comments__empty-state-img"
                  src={noComments}
                />
                <div className="article-comments__empty-state-text">
                  No comments were found. <br />
                  Be the first to comment!
                </div>
              </div>
            ) : (
              newsComments.comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    createdDate={comment.createdDate}
                    content={comment.content}
                    email={comment.email}
                  />
                );
              })
            )}
          </div>
          <form
            onSubmit={(e) => addComment(e, newsItem.id)}
            className="article-comments__add-comment-wrapper"
          >
            <div className="article-comments__title">Leave a comment</div>
            <div className="article-comments__sub-title">Email</div>
            <input
              type="email"
              className="article-comments__email-input"
              name="email"
              onChange={handleChange}
            />
            <div className="article-comments__sub-title">Comment</div>
            <textarea
              className="article-comments__comment-input"
              name="content"
              onChange={handleChange}
            ></textarea>
            <input
              type="submit"
              className="article-comments__add-btn"
              value="ADD COMMENT"
            />
          </form>
        </div>
      </div>
    </motion.div>
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
