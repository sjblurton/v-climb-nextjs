import { Shoes } from "@prisma/client";
import { BrandInput, BrandList } from "../interface";

export const Post = {
  Shoe: async (data: Shoes) => {
    const res = await fetch("/api/v1/shoes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  },
  Brand: async (data: BrandInput) => {
    console.log(data);
    const res = await fetch("/api/v1/brands", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  },
};

export const Get = {
  Brands: async () => {
    const res = await fetch("/api/v1/brands", {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    return (await res.json()) as { brands: BrandList[] };
  },
};
