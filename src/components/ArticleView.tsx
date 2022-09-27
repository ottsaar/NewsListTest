import React, { ChangeEventHandler, FormEvent, useState } from "react";
import {
  ApolloError,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { NEWS_ITEM } from "../graphql/getters/newsItem";
import { CREATE_COMMENT } from "../graphql/setters/createComment";
import { NEWS_COMMENTS } from "../graphql/getters/newsComments";
import "./scss/article.scss";
import { CommentType, Comment } from "./Comment";
import { useParams } from "react-router-dom";

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
      <>
        <div>"Loading article..."</div>
      </>
    );
  if (newsItemData.error) return <>{newsItemData.error.message}</>;
  if (!newsItemData.data) {
    return <>Article data wasn't found</>;
  }

  const newsItem = newsItemData.data.newsItem as NewsItem;
  const newsComments = commentsData.data
    ? (commentsData.data?.newsItem as {
        comments: CommentType[];
      })
    : { comments: [] };
  return (
    <>
      <div className="article__img-wrapper">
        <div
          className="article__img"
          style={{ backgroundImage: `url(${newsItem.img})` }}
        />
      </div>

      <div className="article-wrapper">
        <div className="article">
          <div className="article__date">12 hours ago</div>
          <div className="article__title">{newsItem.title}</div>
          <div className="article__content">{newsItem.content}</div>
          <a className="article__article-btn" href={newsItem.url}>
            READ FULL ARTICLE
          </a>
        </div>
        <div className="article-comments">
          <div className="article-comments__title">Comments</div>
          <div className="article-comments__comments">
            {commentsData.loading ? (
              <></>
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
