import { useSession } from "next-auth/react";
import { CustomTab, Layout, Seo, AddRubber, AddBrand } from "../../components";
import { Tab } from "@headlessui/react";
import { AddShoe } from "../../components/forms/addShoe";

type Props = {};

const Admin = (props: Props) => {
  const { data: session, status } = useSession();

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
                  <AddBrand />
                </Tab.Panel>
                <Tab.Panel>
                  <AddRubber />
                </Tab.Panel>
                <Tab.Panel>
                  <AddShoe />
                </Tab.Panel>
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
