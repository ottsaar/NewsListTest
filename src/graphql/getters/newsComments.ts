import { gql } from "@apollo/client";

export const NEWS_COMMENTS = gql`
  query NewsComments($id: ID!) {
    newsItem(id: $id) {
      comments {
        id
        email
        content
        createdDate
      }
    }
  }
`;
