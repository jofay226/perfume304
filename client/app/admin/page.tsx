"use client";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { GET_ALL_BRANDS } from "../page";

const createBrand = gql`
  mutation CreateBrand($newBrand: BrandInput) {
    createBrand(params: $newBrand) {
      id
      name
    }
  }
`;

function Page() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brandId: "",
    variants: [
      { size: 50, price: 55, concentration: "EDT" },
      { size: 100, price: 105, concentration: "EDP" },
      { size: 150, price: 155, concentration: "PERFUME" },
    ],
  });

  const { data: brands } = useQuery(GET_ALL_BRANDS);
  const [] = useMutation();

  const router = useRouter();
  const [brandName, setBrandName] = useState("");

  const [createBrandMutation] = useMutation(createBrand, {
    onCompleted: () => {
      router.push("/");
    },
  });

  const handleBrandName = () => {
    if (!brandName) {
      alert("you need to fill brand name");
      return;
    }
    createBrandMutation({
      variables: {
        newBrand: {
          name: brandName,
        },
      },
    });
    setBrandName("");
  };

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      variants: [...prev.variants],
    }));
  };
  console.log(form);

  return (
    <main>
      <h1>ADMIN PANEL</h1>
      <div>
        <label htmlFor="">CREATE BRAND</label>
        <input
          onChange={(e) => setBrandName(e.target.value)}
          type="text"
          placeholder="type brand name..."
          value={brandName}
        />
        <button
          onClick={handleBrandName}
          className="border-2 border-amber-200 p-3"
        >
          Create brand
        </button>
      </div>
      <hr />
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-6 text-gray-200">
        <section className="w-full max-w-xl bg-[#151922] p-6 rounded-2xl border border-[#262b36] shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Create Perfume</h2>

          <div className="space-y-4">
            {/* NAME */}

            <input
              onChange={formHandler}
              name="name"
              type="text"
              placeholder="Perfume Name"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36] focus:outline-none"
            />

            {/* DESCRIPTION */}

            <textarea
              onChange={formHandler}
              name="description"
              placeholder="Perfume Description"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36] h-24 resize-none"
            />

            {/* BRAND */}

            <select
              onChange={formHandler}
              name="brandId"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36]"
            >
              {brands?.getAllBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* VARIANTS */}

            <div className="border border-[#262b36] rounded-xl p-4">
              <h3 className="text-sm text-gray-400 mb-3">Variants</h3>

              <div className="space-y-4">
                {/* 50 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">50 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>

                {/* 100 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">100 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>

                {/* 150 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">150 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-medium">
              Create Perfume
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
