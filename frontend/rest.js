"use strict";

const endpoint = "http://localhost:3000";

async function getArtists() {
  const rawArtists = await fetch(`${endpoint}/artists`);
  const artists = await rawArtists.json();
  return artists;
}
async function createArtist(name, birthDate, activeSince, labels, website, image, shortDescription) {
  console.log(`create artist called with ${name}`);
  const artistObj = {
    name: name,
    birthDate: birthDate,
    activeSince: activeSince,
    labels: labels,
    website: website,
    image: image,
    shortDescription: shortDescription,
  };
  const artistJson = JSON.stringify(artistObj);
  try {
    const response = await fetch(`${endpoint}/artists`, {
      method: "POST",
      body: artistJson,
      headers: {
        "Content-Type": "application/json", // Make sure this header is set
      },
    });
    // console.log(await response.json());
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the response JSON if needed
    console.log(responseData);
    return responseData; // Return the response data or handle it as needed
  } catch (error) {
    console.log("Error creating artist:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export { getArtists, createArtist };
