import React from "react";
import "./scss/comment.scss";
import moment from "moment";

export interface CommentType {
  id: string;
  email: string;
  content: string;
  createdDate: string;
}

export function Comment(props: CommentType) {
  return (
    <div className="comment">
      <div className="comment__info">
        <div className="comment__email">{props.email}</div>
        <div className="comment__created-at">
          {formatComment(props.createdDate)}
        </div>
      </div>

      <div className="comment__content">{props.content}</div>
    </div>
  );
}

function formatComment(date: string) {
  return moment(date).startOf("minute").fromNow();
}
