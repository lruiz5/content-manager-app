import Layout from "components/Layout";
import Link from "next/link";
import moment from "moment";
import axios from "axios";
import ResourceLabel from "components/ResourceLabel";

const ResourceDetail = ({ resource }) => {
  const activateResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot active the resource!"));
  };

  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {moment(resource.createdAt).format("LLLL")}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title">{resource.title}</h1>
                    <p>{resource.description}</p>
                    <p>Time to Finish: {resource.timeToFinish}</p>
                    {resource.status === "inactive" && (
                      <>
                        <Link
                          href={`/resources/${resource.id}/edit`}
                          className="button is-warning"
                        >
                          Update
                        </Link>
                        <button
                          onClick={activateResource}
                          className="button is-success ml-2"
                        >
                          Activate
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* ResourceDetail.getInitialProps = async ({ query }) => {
  const dataRes = await fetch(
    `${process.env.HOST_URL}/api/resources/${query.id}`
  );
  const data = await dataRes.json();
  return {
    resource: data,
  };
}; */

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
export default ResourceDetail;
