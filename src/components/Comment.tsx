import React from "react";
import "./scss/styles.scss";
import moment from "moment";

export interface CommentType {
  id: string;
  email: string;
  content: string;
  createdDate: string;
}

export function ArticleThumbnail(props: CommentType) {
  function formatComment(date: string) {
    return moment(date).startOf("minute").fromNow();
  }

  return (
    <div className="comment">
      <div className="comment__info">
        <div className="comment__email">{props.email}</div>
        <div className="comment__createdAt">
          {formatComment(props.createdDate)}
        </div>
      </div>

      <div className="comnent__content">{props.content}</div>
    </div>
  );
}
