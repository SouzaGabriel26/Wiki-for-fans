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

  return Object.freeze({
    getAll,
    getByName,
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
