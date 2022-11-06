import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import moment from "moment/moment";

const ActiveResource = () => {
  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    async function fetchResource() {
      const axiosRes = await axios.get("/api/activeresource");
      const resource = axiosRes.data;
      const timeToFinish = parseInt(resource.timeToFinish, 10);

      const elapsedTime = moment().diff(
        moment(resource.activationTime),
        "seconds"
      );
      const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;
      if (updatedTimeToFinish >= 0) {
        resource.timeToFinish = updatedTimeToFinish;
        setSeconds(updatedTimeToFinish);
      }
      setResource(resource);
    }

    fetchResource();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds < 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const completeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "complete" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot complete the resource."));
  };

  const hasResource = resource && resource.id;
  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? resource.title : "No Active Resource"}
      </h1>
      <div className="time-wrapper">
        {hasResource &&
          (seconds > 0 ? (
            <h2 className="elapsed-time">{seconds + "s"}</h2>
          ) : (
            <h2 className="elapsed-time">
              <button
                onClick={completeResource}
                className="button is-success mt-2"
              >
                Complete Resource
              </button>
            </h2>
          ))}
      </div>
      {hasResource ? (
        <Link href={`/resources/${resource.id}`} className="button">
          Go to Resource
        </Link>
      ) : (
        <Link href="/" className="button">
          Go to Resources
        </Link>
      )}
    </div>
  );
};

export default ActiveResource;
