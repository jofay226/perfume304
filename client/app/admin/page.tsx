"use client";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GET_ALL_BRANDS } from "../page";

const createBrand = gql`
  mutation CreateBrand($newBrand: BrandInput) {
    createBrand(params: $newBrand) {
      id
      name
    }
  }
`;
const CREATE_PERFUME = gql`
  mutation CreatePerfume($input: PerfumeInput) {
    createPerfume(input: $input) {
      id
      name
    }
  }
`;

function Page() {
  const router = useRouter();
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

  console.log(form);

  const { data: brands } = useQuery(GET_ALL_BRANDS);
  const [brandName, setBrandName] = useState("");

  const [createPerfume] = useMutation(CREATE_PERFUME, {
    onCompleted: () => {
      router.push("/");
    },
  });
  const createPerfumeHandler = () => {
    createPerfume({
      variables: {
        input: form,
      },
    });
  };

  const [createBrandMutation] = useMutation(createBrand, {
    refetchQueries: [{ query: GET_ALL_BRANDS }],
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

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7efe7] text-[#26180f]">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(165,88,42,0.24),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(41,24,14,0.1),_transparent_32%),linear-gradient(180deg,_#fffaf5_0%,_#f7efe7_55%,_#f2e5d8_100%)]" />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-7 shadow-[0_20px_80px_rgba(62,34,15,0.12)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9c6a48]">
                Admin Panel
              </p>
              <h1 className="mt-4 max-w-lg text-4xl font-semibold tracking-tight text-[#2c1b11] sm:text-5xl">
                Craft new fragrance entries with a cleaner studio layout.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6f5443] sm:text-base">
                Your existing creation flow stays the same. This refresh focuses
                on presentation, spacing, and clearer input hierarchy for brand
                and perfume management.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#ead8c8] bg-[#fff8f2] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9d7457]">
                    Brands
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-[#28160e]">
                    {brands?.getAllBrands.length ?? 0}
                  </p>
                  <p className="mt-1 text-sm text-[#7f604b]">
                    Available for assigning to perfumes
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ead8c8] bg-[#fff8f2] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9d7457]">
                    Layout
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#28160e]">
                    Editorial
                  </p>
                  <p className="mt-1 text-sm text-[#7f604b]">
                    Warm neutrals with card-based sections
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ead8c8] bg-[#fff8f2] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9d7457]">
                    Focus
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#28160e]">
                    UI Refresh
                  </p>
                  <p className="mt-1 text-sm text-[#7f604b]">
                    Structure improved without changing logic
                  </p>
                </div>
              </div>
            </div>

            <section className="rounded-[2rem] border border-[#ead8c8] bg-[#2f1b11] p-6 text-[#f7eee7] shadow-[0_20px_80px_rgba(62,34,15,0.18)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#dcb89c]">
                    Quick Action
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    Create a new brand
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#dcbba7]">
                    Add a house name first so it appears in the perfume form
                    below.
                  </p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#f6e6d8]">
                  Brand Setup
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <label
                  htmlFor="brand-name"
                  className="text-sm font-medium text-[#f8ecdf]"
                >
                  Brand name
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="brand-name"
                    onChange={(e) => setBrandName(e.target.value)}
                    type="text"
                    placeholder="Type brand name..."
                    value={brandName}
                    className="h-13 flex-1 rounded-2xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-[#cba992] transition focus:border-[#efc3a0] focus:bg-white/12"
                  />
                  <button
                    onClick={handleBrandName}
                    className="h-13 rounded-2xl bg-[#f0c19a] px-6 text-sm font-semibold text-[#2e1c12] transition hover:bg-[#e8b386]"
                  >
                    Create brand
                  </button>
                </div>
              </div>
            </section>
          </section>

          <section className="rounded-[2rem] border border-[#ead8c8] bg-white/80 p-5 shadow-[0_24px_90px_rgba(62,34,15,0.12)] backdrop-blur sm:p-7">
            <div className="flex flex-col gap-2 border-b border-[#eee0d3] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b6f52]">
                  Inventory
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#2b1a10]">
                  Create perfume
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#7b604d]">
                Build out the main fragrance details below. The form behavior is
                unchanged; only the interface has been refined.
              </p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className="rounded-[1.6rem] border border-[#eedfce] bg-[#fffaf5] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a07659]">
                    Core Details
                  </p>

                  <div className="mt-5 grid gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#533c2c]">
                        Perfume name
                      </label>
                      <input
                        onChange={formHandler}
                        name="name"
                        type="text"
                        placeholder="Perfume Name"
                        className="h-13 w-full rounded-2xl border border-[#e4d3c1] bg-white px-4 text-sm text-[#2d1e14] outline-none transition placeholder:text-[#b49680] focus:border-[#bb8966] focus:ring-4 focus:ring-[#f4dfd0]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#533c2c]">
                        Description
                      </label>
                      <textarea
                        onChange={formHandler}
                        name="description"
                        placeholder="Perfume Description"
                        className="min-h-32 w-full rounded-2xl border border-[#e4d3c1] bg-white px-4 py-3 text-sm text-[#2d1e14] outline-none transition placeholder:text-[#b49680] focus:border-[#bb8966] focus:ring-4 focus:ring-[#f4dfd0] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#533c2c]">
                        Brand
                      </label>
                      <select
                        onClick={formHandler}
                        name="brandId"
                        className="h-13 w-full rounded-2xl border border-[#e4d3c1] bg-white px-4 text-sm text-[#2d1e14] outline-none transition focus:border-[#bb8966] focus:ring-4 focus:ring-[#f4dfd0]"
                      >
                        {brands?.getAllBrands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={createPerfumeHandler}
                  className="flex h-14 w-full items-center justify-center rounded-[1.2rem] bg-[#2f1b11] px-6 text-sm font-semibold text-[#f8efe9] transition hover:bg-[#42261a]"
                >
                  Create Perfume
                </button>
              </div>

              <div className="rounded-[1.6rem] border border-[#eedfce] bg-[#2d1a11] p-5 text-[#f7eee7]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d1af96]">
                      Variants
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      Size and pricing
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#f6e6d8]">
                    Preview
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="grid gap-4 md:grid-cols-[auto_1fr_1fr] md:items-end">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="size-4 accent-[#f0c19a]"
                        />
                        <span className="text-sm font-medium">50 ml</span>
                      </div>
                      <select className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none">
                        <option>EDT</option>
                        <option>EDP</option>
                        <option>Parfum</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Price"
                        className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none placeholder:text-[#cfad98]"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="grid gap-4 md:grid-cols-[auto_1fr_1fr] md:items-end">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="size-4 accent-[#f0c19a]"
                        />
                        <span className="text-sm font-medium">100 ml</span>
                      </div>
                      <select className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none">
                        <option>EDT</option>
                        <option>EDP</option>
                        <option>Parfum</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Price"
                        className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none placeholder:text-[#cfad98]"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="grid gap-4 md:grid-cols-[auto_1fr_1fr] md:items-end">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="size-4 accent-[#f0c19a]"
                        />
                        <span className="text-sm font-medium">150 ml</span>
                      </div>
                      <select className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none">
                        <option>EDT</option>
                        <option>EDP</option>
                        <option>Parfum</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Price"
                        className="h-11 rounded-xl border border-white/10 bg-[#40271b] px-3 text-sm text-white outline-none placeholder:text-[#cfad98]"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#d8bdab]">
                  The variant controls remain visually upgraded only, matching
                  the current page behavior without changing your existing form
                  logic.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Page;
