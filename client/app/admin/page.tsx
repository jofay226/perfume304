"use client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const createBrand = gql`
  mutation CreateBrand($newBrand: BrandInput) {
    createBrand(params: $newBrand) {
      id
      name
    }
  }
`;

function Page() {
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
    </main>
  );
}

export default Page;
