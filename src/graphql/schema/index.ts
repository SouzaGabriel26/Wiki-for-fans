import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    nickName: String
    description: String
    age: Int
    personalities: [String]
    friends: [String]
    enemies: [String]
    createdAt: String
    favoritePhrase: String
    isProtagonist: Boolean
    serie: Serie
  }

  type Serie {
    id: ID!
    name: String!
    description: String
    episodes: Int
    platforms: [String]
    seasons: Int
    status: Status
    characters: [Character]
  }

  type Query {
    series: [Serie]!
    characters: [Character]!
    getSerieByName(name: String!): Serie
    getCharacterById(id: ID!): Character
  }

  enum Status {
    FINISHED
    CANCELED
    IN_PROGRESS
  }

  type Mutation {
    createSerie(
      name: String!
      description: String!
      episodes: Int!
      platforms: [String]!
      seasons: Int!
      status: Status!
    ): Serie

    createCharacter(
      name: String!
      nickName: String
      description: String!
      age: Int!
      personalities: [String]!
      friends: [String]!
      enemies: [String]!
      favoritePhrase: String
      isProtagonist: Boolean!
      serieId: ID!
    ): Character

    updateSerieById(
      id: ID!
      name: String
      description: String
      episodes: Int
      platforms: [String]
      seasons: Int
      status: Status
    ): Serie

    updateCharacterById(
      id: ID!
      name: String
      nickName: String
      description: String
      age: Int
      personalities: [String]
      friends: [String]
      enemies: [String]
      favoritePhrase: String
      isProtagonist: Boolean
      serieId: ID
    ): Character
  }
`;
