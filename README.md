# Wiki For Fans

### This project is a wiki designed for fans, providing a platform where users can explore and contribute information about various topics of interest

[see in production](https://wiki-for-fans.vercel.app/)

## 🚀 Technologies used:

| 🚀                | Technologies                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js**       | React framework that enables server-side rendering, static site generation, and other advanced features for building modern web applications.                           |
| **GraphQL**       | Query language for APIs that allows clients to request only the data they need, facilitating efficient and flexible communication between frontend and backend systems. |
| **Apollo Server** | GraphQL server implementation that helps build and integrate GraphQL APIs with backend systems, providing tools for data fetching, caching, and schema management.      |
| **Apollo Client** | State management library for JavaScript applications, providing an intuitive way to interact with GraphQL APIs on the client side, including caching and local state.   |
| **Typescript**    | Superset of JavaScript with static types for better development experience.                                                                                             |
| **Tailwind CSS**  | Utility-first CSS framework for building modern, responsive web interfaces with minimal custom CSS.                                                                     |
| **Cloudinary**    | Cloud-based media management platform offering solutions for uploading, storing, transforming, and delivering images and videos on the web.                             |
| **Prisma**        | ORM (Object-Relational Mapping) and database toolkit for Node.js and TypeScript applications, offering a type-safe and intuitive way to interact with databases.        |

## Getting Started

First, run the development server:

**You will need to have docker installed**

setup `environment variables` - cloudinary

```bash
# Install dependencies
yarn
```

```bash
# Run the `compose` file to create the container
npm run compose:up
```

```bash
# synchronize the Prisma schema with database
yarn prisma db push
```

```bash
# Populate the database
yarn prisma db seed
```

```bash
# Run the project
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📷 Images

- Home:
  ![home big screen](./public/assets/home-pc.png)
  ![home small screen](./public/assets/home-mobile.png)

- List visualization:
  ![list visualization](./public/assets/list-visualization.png)

- Forms:
  ![register serie](./public/assets/register-serie.png)
  ![register character](./public/assets/register-character.png)
