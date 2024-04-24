import { gql } from '@apollo/client';

import { CreateCharacterArgs } from '@/app/api/configs/context/prismaMutations';
import { client } from '@/lib/clientApi';

export function createCharacterDatasource() {
  async function getAll() {
    const GET_CHARACTERS_QUERY = gql`
      query {
        characters {
          id
          name
          nickName
          image
          serie {
            name
          }
        }
      }
    `;

    const { data, error } = await client.query({
      query: GET_CHARACTERS_QUERY,
    });

    return {
      returnedCharacters: data.characters as Character[],
      error,
    };
  }

  async function getById(id: string) {
    const GET_CHARACTER_BY_ID = gql`
      query ($id: ID!) {
        getCharacterById(id: $id) {
          id
          name
          nickName
          description
          age
          personalities
          friends
          enemies
          image
          createdAt
          favoritePhrase
          isProtagonist
          serie {
            name
            platforms
            id
          }
        }
      }
    `;

    const { data, error } = await client.query({
      query: GET_CHARACTER_BY_ID,
      variables: { id },
    });

    return {
      returnedCharacter: data.getCharacterById as CharacterById,
      error,
    };
  }

  async function getAllBySerieId(serieId: string) {
    const GET_CHARACTERS_BY_SERIE_ID = gql`
      query ($serieId: ID!) {
        getCharactersBySerieId(serieId: $serieId) {
          id
          name
          nickName
          image
          serie {
            name
          }
        }
      }
    `;

    const { data, error } = await client.query({
      query: GET_CHARACTERS_BY_SERIE_ID,
      variables: { serieId },
    });

    return {
      returnedCharacters: data.getCharactersBySerieId as Character[],
      error,
    };
  }

  async function create(character: CreateCharacterArgs) {
    const CREATE_CHARACTER_QUERY = gql`
      mutation (
        $name: String!
        $nickName: String
        $description: String!
        $age: Int!
        $personalities: [String]!
        $friends: [String]!
        $enemies: [String]!
        $image: String
        $favoritePhrase: String
        $isProtagonist: Boolean!
        $serieId: ID!
      ) {
        createCharacter(
          name: $name
          nickName: $nickName
          description: $description
          age: $age
          personalities: $personalities
          friends: $friends
          enemies: $enemies
          image: $image
          favoritePhrase: $favoritePhrase
          isProtagonist: $isProtagonist
          serieId: $serieId
        ) {
          name
          serie {
            id
            name
          }
        }
      }
    `;

    const { data, errors } = await client.mutate({
      mutation: CREATE_CHARACTER_QUERY,
      variables: character,
    });

    type CreatedCharacter = {
      name: string;
      serie: {
        id: string;
        name: string;
      };
    };

    return {
      createdCharacter: data.createCharacter as CreatedCharacter,
      error: errors,
    };
  }

  return Object.freeze({
    create,
    getAll,
    getById,
    getAllBySerieId,
  });
}

export type Character = {
  id: string;
  name: string;
  nickName: string;
  image: string;
  serie: {
    name: string;
  };
};

type CharacterById = {
  id: string;
  name: string;
  nickName: string;
  description: string;
  age: number;
  personalities: string[];
  friends: string[];
  enemies: string[];
  image?: string;
  createdAt: string;
  favoritePhrase: string;
  isProtagonist: boolean;
  serie: {
    name: string;
    platforms: string[];
    id: string;
  };
};
