import express, { json } from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();

// using express and cors features
app.use(express.json());
app.use(cors());

app.post("/artists", async (request, response) => {
  try {
    console.log(`Received ${request.method} request at ${request.url}`);
    const artist = request.body;

    if (!checkDuplicate(artist)) {
      console.error("Data already included");
    } else fs.writeFile("backend/data.json", JSON.stringify(artist));
    response.json(artist);
  } catch (error) {
    console.error("Error handling POST request:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
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

async function checkDuplicate(artistObj) {
  const dataFile = await fs.readFile("backend/data.json");
  for (const artist of dataFile) {
    if (artist.name == artistObj.name) return false;
  }
  return true;
}
