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
      returnedSerie: data.getSerieByName as SerieById,
      error,
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

  return Object.freeze({
    getAll,
    getByName,
    create,
  });
}

type SerieById = CreateSerieArgs & {
  characters: {
    id: string;
    name: string;
  }[];
};

export type Serie = {
  id: string;
  name: string;
};
