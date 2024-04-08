import { gql } from '@apollo/client';

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

  return Object.freeze({
    getAll,
    getById,
  });
}

export type Character = {
  id: string;
  name: string;
  nickName: string;
  image: string;
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
