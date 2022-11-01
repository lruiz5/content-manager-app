import Link from "next/link";
const ResourceList = ({ resources }) => {
  return (
    <section class="hero ">
      <div class="hero-body">
        <div class="container">
          <section class="section">
            <div class="columns is-multiline is-variable is-8">
              {resources.map((resource) => {
                return (
                  <div key={resource.id} class="column is-5 is-offset-1 ">
                    <div class="content is-medium">
                      <h2 class="subtitle is-5 has-text-grey">
                        {resource.createdAt}
                      </h2>
                      <h1 class="title has-text-black is-3">
                        {resource.title}
                      </h1>
                      <p class="has-text-dark">{resource.description}</p>
                      <Link href={`/resources/${resource.id}`}>
                        Learn More...
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ResourceList;
