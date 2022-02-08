import { objectWithStringifiedDates } from "../helper/stringifyDates";
import { prisma } from "../lib/prisma";

export const getProps = {
  getAllBrands: async () => {
    const brands = await prisma.brand.findMany({
      select: { id: true, name: true },
    });
    return brands;
  },
  getAllRubber: async () => {
    const rubbers = await prisma.rubber.findMany({
      select: { id: true, name: true },
    });
    return rubbers;
  },
  getAllShoes: async () => {
    const shoes = await prisma.shoes.findMany({
      select: {
        id: true,
        name: true,
        brandId: true,
        veganType: true,
        image: true,
        price: true,
        slug: true,
      },
    });
    return shoes;
  },
  getAllData: async () => {
    const brands = await getProps.getAllBrands();
    const rubbers = await getProps.getAllRubber();
    const shoes = await getProps.getAllShoes();
    return {
      brands,
      rubbers,
      shoes,
    };
  },
};
