import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      username
      id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation editUser($input: editUserInput) {
    editUser(input: $input) {
      email
      name
      id
      username
    }
  }
`;

export const GET_USER = gql`
  query obtenerUsuario($username: String!) {
    obtenerUsuario(username: $username) {
      name
      description
      image
      presentation
      profession
      skills
    }
  }
`;

export const PROJECTS = gql`
  mutation addProject($input: ProjectInput) {
    addProject(input: $input) {
      description
      id
      image
      name
    }
  }
`;
