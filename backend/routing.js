import express, { json } from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();

// using express and cors features
app.use(express.json());
app.use(cors());

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  const rawData = await fs.readFile("data.json");
  const artists = JSON.parse(rawData);
  console.log(artists);
  // artists.push(newArtist);
  // fs.writeFile("data.json", JSON.stringify(artists));
  response.json(artists);
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

async function checkDuplicate(artistObj, dataFile) {
  
  console.log("checking for dupe");
  for (const artist of dataFile) {
    console.log(`checking ${artist}`);
    if (artist.name == artistObj.name) return false;
  }
  return true;
}
