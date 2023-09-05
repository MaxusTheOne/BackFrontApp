"use strict";

const endpoint = "localhost/3000";

async function getArtists() {
  const now = Date.now();
  if (now - lastTime > 10000 || swimmers.length === 0) {
    await refetchUserData();
  }
  const after = Date.now();
  console.log("Time to fetch " + (after - now) + " milliseconds");
  return swimmers;
}
export { getArtists };
