import express, { json } from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
// using express and cors features
app.use(express.json());
app.use(cors());

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("backend/data.json");
  const parsedData = await JSON.parse(data);
  response.json(parsedData);
});

//empty default responses
app.get("/", async (request, response) => {
  response.send("empty get request");
});
app.post("/", (request, response) => {
  response.send("empty post request");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveren kører på: http://localhost:${port}`);
});
