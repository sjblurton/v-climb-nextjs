import { Brand, Shoes } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const Post = {
  Shoe: async (data: Shoes) => {
    const res = await fetch("/api/v1/shoes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  },
  brand: async (data: Brand) => {
    const res = await fetch("/api/v1/brands", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  },
};
