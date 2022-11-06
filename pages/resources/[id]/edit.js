import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import axios from "axios";

const ResourceEdit = ({ resource }) => {
  const updateResource = (form) => {
    axios
      .patch("/api/resources", form)
      .then((_) => alert("Data Updated."))
      .catch((err) => alert(err?.response?.data));
  };
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              initialData={resource}
              onFormSubmit={updateResource}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.params;
  const dataRes = await fetch(`${process.env.HOST_URL}/api/resources/${id}`);
  const data = await dataRes.json();
  return {
    props: {
      resource: data,
    },
  };
}
export default ResourceEdit;
