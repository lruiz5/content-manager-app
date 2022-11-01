import Layout from "components/Layout";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";

function Home(props) {
  const { resources } = props;

  return (
    <Layout>
      <ResourceHighlight resources={resources.slice(0, 1)} />
      <Newsletter />
      <ResourceList resources={resources.slice(1)} />
      <Footer />
    </Layout>
  );
}

//called every time the page is visited
//function is executed on the server
//data is always fresh
export async function getServerSideProps() {
  const resData = await fetch("http://localhost:3001/api/resources");

  const data = await resData.json();

  return {
    props: {
      resources: data,
    },
  };
}

//called at build time, called only once.
/* export async function getStaticProps() {
  const resData = await fetch("http://localhost:3000/api/resources");

  const data = await resData.json();

  return {
    props: {
      resources: data,
    },
  };
} */

export default Home;
