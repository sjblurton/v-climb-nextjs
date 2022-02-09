import { prisma } from "../lib/prisma";

export const getProps = {
  getBrandNames: async () => {
    const brands = await prisma.brand.findMany({
      select: { id: true, name: true },
    });
    return brands;
  },
  getRubberNames: async () => {
    const brands = await prisma.rubber.findMany({
      select: {
        id: true,
        name: true,
        stiffness: true,
        brandId: true,
        description: true,
      },
    });
    return brands;
  },
  getBrandById: async (id: string) => {
    const brand = await prisma.brand.findUnique({
      where: { id: id },
      select: { name: true },
    });
    return brand?.name || "";
  },
  getRubberById: async (id: string) => {
    const rubber = await prisma.rubber.findUnique({
      where: { id: id },
      select: { name: true, brandId: true, stiffness: true, description: true },
    });
    return rubber?.name || "";
  },
  getShoesCardData: async () => {
    const shoes = await prisma.shoes.findMany({
      select: {
        id: true,
        name: true,
        brandId: true,
        veganType: true,
        image: true,
        price: true,
        slug: true,
        closure: true,
        asymmetry: true,
        hooking: true,
        midsole: true,
        rubberId: true,
        profile: true,
        rubber_thickness: true,
        volume: true,
      },
    });
    return shoes;
  },
  getHomePageData: async () => {
    const brands = await getProps.getBrandNames();
    const shoes = await getProps.getShoesCardData();
    const rubbers = await getProps.getRubberNames();
    return {
      rubbers,
      brands,
      shoes,
    };
  },
};
