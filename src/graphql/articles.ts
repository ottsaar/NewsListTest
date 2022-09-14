import { gql } from "@apollo/client";

export const NEWS_LIST = gql`
  query NewsList {
    newsList(skip: 0, limit: 100) {
      totalRows
      rows {
        id
        title
        content
        url
        img
      }
    }
  }
`;
