import { objectWithStringifiedDates } from "../helper/stringifyDates";
import { prisma } from "../lib/prisma";

export const getProps = {
  getAllBrands: async () => {
    const brands = await prisma.brand.findMany();
    const brandsWithDates = brands.map((brand) => {
      return {
        ...brand,
        ...objectWithStringifiedDates(brand.createdAt, brand.updatedAt),
      };
    });

    return { props: { brands: brandsWithDates } };
  },
  getAllRubber: async () => {
    const rubbers = await prisma.rubber.findMany();
    const rubberWithDates = rubbers.map((rubber) => {
      return {
        ...rubber,
        ...objectWithStringifiedDates(rubber.createdAt, rubber.updatedAt),
      };
    });
    return { props: { rubbers: rubberWithDates } };
  },
  getAllShoes: async () => {
    const shoes = await prisma.shoes.findMany();
    const shoesWithDates = shoes.map((shoe) => {
      return {
        ...shoes,
        ...objectWithStringifiedDates(shoe.createdAt, shoe.updatedAt),
      };
    });
    return { props: { shoes: shoesWithDates } };
  },
  getAllData: async () => {
    const brands = await getProps.getAllBrands();
    const rubbers = await getProps.getAllRubber();
    const shoes = await getProps.getAllShoes();
    return {
      props: {
        brands: brands.props.brands,
        rubbers: rubbers.props.rubbers,
        shoes: shoes.props.shoes,
      },
    };
  },
};
