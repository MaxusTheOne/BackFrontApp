import express, { json } from "express";
import cors from "cors";
import fs from "fs/promises";
import { log } from "console";

const app = express();
const path = "backend/data.json"
// using express and cors features
app.use(express.json());
app.use(cors());

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  const rawData = await fs.readFile(path);
  const artists = JSON.parse(rawData);
  console.log(artists);
  const isDupe = await checkDuplicate(newArtist, artists)
  if (!isDupe) {
    artists.push(newArtist)
    fs.writeFile("backend/data.json", JSON.stringify(artists));
  }
  else console.log(`${newArtist.name} is a dupe`);
  response.json(newArtist);
});
app.get("/artists", async (request, response) => {
  const data = await fs.readFile(path);
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
    // console.log(`checking ${artist.name} with ${artistObj.name}`);
    if (artist.name === artistObj.name) {
      console.log("Dupe");
      return true;}
  }
  return false;
}
