import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $email: String!, $content: String!) {
    createComment(input: { newsId: $id, email: $email, content: $content }) {
      id
      email
      content
      createdDate
    }
  }
`;
