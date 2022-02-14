import { useSession } from "next-auth/react";
import { CustomTab, Layout, Seo, AddRubber, AddBrand } from "../components";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BrandList } from "../interface";
import { Get } from "../service/database";

type Props = {};

const Admin = (props: Props) => {
  const { data: session, status } = useSession();
  const [brandList, setBrandList] = useState<{ brands: BrandList[] }>({
    brands: [],
  });

  useEffect(() => {
    const fetchBrandsList = async () => {
      const list = await Get.Brands();
      if (list) {
        setBrandList(list);
      }
    };
    fetchBrandsList();
  }, []);

  if (session) {
    return (
      <>
        <Seo templateTitle="Admin Login page" />
        <Layout>
          <div className="container mx-auto w-fit">
            <Tab.Group>
              <Tab.List
                className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                id="tabs-tab"
                role="tablist"
              >
                <Tab>
                  {({ selected }) => (
                    <CustomTab selected={selected}>Add Brand</CustomTab>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <CustomTab selected={selected}>Add Rubber</CustomTab>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <CustomTab selected={selected}>Add Shoe</CustomTab>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <AddBrand brandList={brandList} setBrandList={setBrandList} />
                </Tab.Panel>
                <Tab.Panel>
                  <AddRubber />
                </Tab.Panel>
                <Tab.Panel>Add Shoe</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Seo templateTitle="Admin Login page" />
      <Layout>
        <div className="container h-screen flex items-center justify-center">
          <h1 className="text-6xl text-olive-50 text-center">
            Please sign in as admin to edit the database.
          </h1>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
