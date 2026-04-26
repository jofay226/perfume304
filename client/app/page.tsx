"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

const brands = ["All", "Dior", "Chanel", "Tom Ford", "Gucci"];

const perfumes = [
  {
    id: 1,
    name: "Sauvage",
    brand: "Dior",
    price: "$120",
    size: "100ml",
    concentration: "Eau de Parfum",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 2,
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: "$140",
    size: "50ml",
    concentration: "Parfum",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "Oud Wood",
    brand: "Tom Ford",
    price: "$200",
    size: "150ml",
    concentration: "Eau de Toilette",
    image: "https://via.placeholder.com/300x300",
  },
];

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    getAllBrands {
      id
      name
    }
  }
`;

export const GET_ALL_PERFUMES = gql`
  query GetPerfumes($input: PerfumeFilters) {
    getPerfumes(input: $input) {
      id
      name
      description
      brandId
      variant {
        size
        price
        concentration
      }
    }
  }
`;

export default function Home() {
  const [filters, setFilters] = useState({
    size: 50,
    concentration: null,
    brandId: null,
  });

  const { data: brandsData, loading: brandsLoading } = useQuery(GET_ALL_BRANDS);

  const { data: Perfumes, refetch } = useQuery(GET_ALL_PERFUMES, {
    variables: {
      input: filters,
    },
  });

  useEffect(() => {
    refetch();
  }, [filters.size, filters.concentration, filters.brandId, refetch]);

  const filterHandler = (e) => {
    const name = e.target.name;
    const value = +e.target.value;
    setFilters((prev) => ({ ...prev, [name]: value }));
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 text-black dark:text-white p-6 transition-colors">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTERS */}
        <div className="col-span-3 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Filters</h2>

          {/* Size */}
          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <select
              onChange={filterHandler}
              name="size"
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl p-2 text-sm"
            >
              <option value={50}>50ml</option>
              <option value={100}>100ml</option>
              <option value={150}>150ml</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <p className="text-sm font-medium mb-2">Brand</p>
            <select
              onClick={filterHandler}
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl p-2 text-sm"
            >
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Concentration */}
          <div>
            <p className="text-sm font-medium mb-2">Concentration</p>
            <select
              onClick={filterHandler}
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl p-2 text-sm"
            >
              <option value={"EDT"}>Eau de Toilette</option>
              <option value={"EDP"}>Eau de Parfum</option>
              <option value={"PERFUME"}>Parfum</option>
            </select>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-9 space-y-6">
          {/* BRAND CIRCLES */}
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm flex gap-4 overflow-x-auto">
            {brandsLoading ? (
              <div className="flex flex-col items-center cursor-pointer animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium">
                  coming...
                </div>
                <span className="text-xs mt-2">coming...</span>
              </div>
            ) : (
              brandsData?.getAllBrands.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium">
                    {b.name}
                  </div>
                  <span className="text-xs mt-2">{b.name}</span>
                </div>
              ))
            )}
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-6">
            {Perfumes?.getPerfumes.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {p.brandId}
                  </p>

                  <p className="text-xs text-gray-400">
                    {p.variant[0].size} ml • {p.variant[0].concentration}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold">{p.variant[0].price}$</span>
                    <button className="bg-black dark:bg-white dark:text-black text-white text-xs px-3 py-1 rounded-lg">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
