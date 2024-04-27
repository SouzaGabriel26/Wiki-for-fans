import { gql } from '@apollo/client';

import { CreateSerieArgs } from '@/app/api/configs/context/prismaMutations';
import { client } from '@/lib/clientApi';

export function createSerieDatasource() {
  async function getAll() {
    const GET_SERIES_QUERY = gql`
      query {
        series {
          id
          name
        }
      }
    `;

    const { data, error } = await client.query({
      query: GET_SERIES_QUERY,
      fetchPolicy: 'no-cache',
    });

    return {
      returnedSeries: data.series as Serie[],
      error,
    };
  }

  async function getByName(name: string) {
    const GET_SERIE_BY_NAME = gql`
      query ($name: String!) {
        getSerieByName(name: $name) {
          id
          name
          description
          episodes
          platforms
          seasons
          status
          characters {
            id
            name
          }
        }
      }
    `;

    const { data, error } = await client.query({
      query: GET_SERIE_BY_NAME,
      variables: { name },
    });

    return {
      returnedSerie: data.getSerieByName as SerieByName,
      error,
    };
  }

  async function getById(id: string) {
    const QUERY_TO_GET_BY_ID = gql`
      query ($getSerieByIdId: ID!) {
        getSerieById(id: $getSerieByIdId) {
          id
          name
          description
          episodes
          platforms
          seasons
          status
          characters {
            id
            name
          }
        }
      }
    `;

    const { data, errors } = await client.query({
      query: QUERY_TO_GET_BY_ID,
      variables: { getSerieByIdId: id },
    });

    return {
      returnedSerie: data.getSerieById as SerieByName,
      errors,
    };
  }

  async function create(serie: CreateSerieArgs) {
    const CREATE_SERIE_QUERY = gql`
      mutation (
        $name: String!
        $description: String!
        $episodes: Int!
        $platforms: [String]!
        $seasons: Int!
        $status: Status!
      ) {
        createSerie(
          name: $name
          description: $description
          episodes: $episodes
          platforms: $platforms
          seasons: $seasons
          status: $status
        ) {
          id
          name
        }
      }
    `;

    const { returnedSerie: serieAlreadyExists } = await getByName(serie.name);

    if (serieAlreadyExists) {
      return {
        createdSerie: null,
        errors: {
          message: 'Serie already exists',
        },
      };
    }

    const { data, errors } = await client.mutate({
      mutation: CREATE_SERIE_QUERY,
      variables: {
        name: serie.name,
        description: serie.description,
        episodes: serie.episodes,
        platforms: serie.platforms,
        seasons: serie.seasons,
        status: serie.status,
      },
    });

    return {
      createdSerie: data.createSerie as Serie,
      errors,
    };
  }

  async function deleteById(id: string) {
    const DELETE_SERIE_QUERY = gql`
      mutation ($deleteSerieById: ID!) {
        deleteSerieById(id: $deleteSerieById) {
          characters {
            image
            imagePublicId
          }
        }
      }
    `;

    const { data, errors } = await client.mutate({
      mutation: DELETE_SERIE_QUERY,
      variables: { deleteSerieById: id },
    });

    type CharacterImageRefs = {
      image: string;
      imagePublicId: string;
    };

    return {
      deletedSerie: data.deleteSerieById
        .characters as Array<CharacterImageRefs>,
      errors,
    };
  }

  return Object.freeze({
    getById,
    getAll,
    getByName,
    create,
    deleteById,
  });
}

type SerieByName = CreateSerieArgs & {
  characters: {
    id: string;
    name: string;
  }[];
};

export type Serie = {
  id: string;
  name: string;
};
