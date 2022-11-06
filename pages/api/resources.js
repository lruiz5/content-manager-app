import axios from "axios";

export default async function (req, res) {
  if (req.method === "GET") {
    const dataRes = await fetch(`${process.env.HOST_URL}/api/resources`);
    const data = await dataRes.json();
    return res.send(data);
  } else if (req.method === "POST" || req.method === "PATCH") {
    const { id, title, description, link, timeToFinish, priority } = req.body;
    if (!title || !description || !link || !timeToFinish || !priority) {
      return res.status(422).send("Data is missing!");
    }

    const url =
      req.method === "POST"
        ? `${process.env.HOST_URL}/api/resources`
        : `${process.env.HOST_URL}/api/resources/${id}`;

    try {
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes.data);
    } catch (error) {
      return res.status(422).send("Data cannot be stored!");
    }
  }
}
