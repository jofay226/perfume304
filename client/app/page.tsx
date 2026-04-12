"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_BRANDS = gql`
  query GetBrands {
    getBrands {
      id
      name
    }
  }
`;

export default function Home() {
  const { data } = useQuery(GET_BRANDS);

  return (
    <main>
      <section>fsd</section>
      <section>fds</section>
    </main>
  );
}
