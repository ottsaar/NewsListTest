import { gql } from "@apollo/client";

export const NEWS_ITEM = gql`
  query NewsItem($id: String) {
    newsItem(id: $id) {
      id
      title
      content
      url
      img
      comments {
        id
        email
        content
        createdDate
      }
    }
  }
`;
