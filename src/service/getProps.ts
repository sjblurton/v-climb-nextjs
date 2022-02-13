import { prisma } from "../lib/prisma";

const shoeSelect = {
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
  description: true,
};

export const getProps = {
  getBrandNames: async () => {
    const brands = await prisma.brand.findMany({
      select: { id: true, name: true },
    });
    return brands;
  },
  getRubberNames: async () => {
    const rubber = await prisma.rubber.findMany({
      select: {
        id: true,
        name: true,
        stiffness: true,
        brandId: true,
        description: true,
      },
    });
    return rubber;
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
      select: {
        name: true,
        brandId: true,
        stiffness: true,
        description: true,
        image: true,
      },
    });
    return rubber;
  },
  getShoesCardData: async () => {
    const shoes = await prisma.shoes.findMany({
      select: shoeSelect,
    });
    return shoes;
  },
  getShoeBySlug: async (slugId: string) => {
    const shoe = await prisma.shoes.findUnique({
      where: { slug: slugId },
      select: shoeSelect,
    });
    return shoe;
  },
  getShoePaths: async () => {
    const slugs = await prisma.shoes.findMany({
      select: { slug: true },
    });
    const paths = slugs.map((slug) => {
      return { params: { slug: slug.slug } };
    });
    return paths;
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
  getSinglePageData: async (slug: string) => {
    const shoe = (await getProps.getShoeBySlug(slug)) || "no shoe found";

    const rubber =
      (shoe !== "no shoe found" &&
        (await getProps.getRubberById(shoe.rubberId))) ||
      "no rubber found";

    const shoeBrand =
      (shoe !== "no shoe found" &&
        (await getProps.getBrandById(shoe.brandId))) ||
      "no brand found";

    const rubberBrand =
      (rubber !== "no rubber found" &&
        (await getProps.getBrandById(rubber.brandId))) ||
      "no rubber brand found";

    return {
      shoe,
      rubber,
      shoeBrand,
      rubberBrand,
    };
  },
};
