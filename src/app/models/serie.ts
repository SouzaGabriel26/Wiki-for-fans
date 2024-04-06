import { CreateSerieArgs } from '@/graphql/context/prismaMutations';

const API_URL = 'http://localhost:3000/api/graphql';

export const serie = Object.freeze({
  getSeries,
  getSerieByName,
});

async function getSeries() {
  const query = `
    query {
      series {
        id
        name
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  return result.data.series as Serie[];
}

async function getSerieByName(name: string) {
  const query = `
    query($name: String!) {
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

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { name },
    }),
  });

  const result = await response.json();

  return result.data.getSerieByName as SerieById;
}

type SerieById = CreateSerieArgs & {
  characters: {
    id: string;
    name: string;
  }[];
};

type Serie = {
  id: string;
  name: string;
};
