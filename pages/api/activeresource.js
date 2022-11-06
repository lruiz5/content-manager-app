import axios from "axios";

export default async function activeResource(req, res) {
  const axiosRes = await axios.get(
    `${process.env.HOST_URL}/api/activeresource`
  );
  const resource = axiosRes.data;

  return res.send(resource);
}
