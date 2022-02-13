import { useSession } from "next-auth/react";
import { Layout, Seo } from "../components";
import { AddBrand } from "../components/forms/addBrand";

type Props = {};

const Admin = (props: Props) => {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <>
        <Seo templateTitle="Admin Login page" />
        <Layout>
          <p>Signed in as {session?.user?.email}</p>
          <AddBrand />
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
