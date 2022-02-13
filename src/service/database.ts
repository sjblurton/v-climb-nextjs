import { Shoes } from "@prisma/client";
import { BrandInput, BrandList, RubberList } from "../interface";

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
    if (res.ok) return (await res.json()) as { brands: BrandList[] };
  },
  Rubbers: async () => {
    const res = await fetch("/api/v1/rubbers", {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    if (res.ok) return (await res.json()) as { rubbers: RubberList[] };
  },
};
