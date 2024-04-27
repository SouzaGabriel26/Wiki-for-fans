import { gql } from '@apollo/client';

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
    image: String
    imagePublicId: String
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
    getSerieById(id: ID!): Serie
    getCharacterById(id: ID!): Character
    getCharactersBySerieId(serieId: ID!): [Character]
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
      image: String
      imagePublicId: String
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
      image: String
      favoritePhrase: String
      isProtagonist: Boolean
      serieId: ID
    ): Character

    deleteSerieById(id: ID!): Serie

    deleteCharacterById(id: ID!): Character
  }
`;
