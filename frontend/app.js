"use strict";

import { getArtists, createArtist } from "./rest.js";
window.addEventListener("load", initApp);

let globalArtists = [];

async function initApp() {
  console.log("frontend init");
  // Get artist list
  const artistEx = await createArtist("John Heck", "1990-01-01", "2005-01-01", ["Label1", "Label2"], "https://example.com", "https://example.com/image.jpg", "Short description")
  console.log("Artist created:", artistEx);
  globalArtists = await getArtists();
  console.log(globalArtists);
  displayArtists(globalArtists);
  document.querySelector("#create-artist-btn").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
}

function displayArtists(artistLs) {
  for (const artist of artistLs) {
    displayArtist(artist);
  }
}
function displayArtist(artistObj) {
  //dom manipulation
  const html = /*html*/ `
  <article class="grid-item-user">
    <img src="${artistObj.image}">
    <h3>${artistObj.name}  </h3>
    <h3>${artistObj.birthdate} Birthdate</h3>
    <div class="btns">
    <button class="btn-update">Opdater</button>
    <button class="btn-delete">Slet</button>
    </div>
  </article>
  `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
  document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", () => deleteClicked(artistObj));
  document.querySelector("#artists article:last-child .btn-update").addEventListener("click", () => updateClicked(artistObj));
  document.querySelector("#artists article:last-child img").addEventListener("click", () => showArtistModal(artistObj));
}
function updateClicked(artistObj) {
  document.querySelector("#dialog-update-artist").showModal();
  console.log(artistObj);
  document.querySelector("#update-image").src = userObject.image;
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);  selectedArtist = artist;

  const form = document.querySelector("#form-edit-artist");

  form.name.value = artistObj.name;
  form.birthdate.value = artistObj.birthdate;
  form.activeSince.value = artistObj.activeSince;
  form.label.value = artistObj.label;
  form.website.value = artistObj.website;
  // form.genres.value = artistObj.genres;
  // document.querySelector("#genre-output-edit").textContent = artist.genres;
  form.description.value = artist.shortDescription;

}

function deleteClicked(userObject) {
  document.querySelector("#dialog-delete-artist").showModal();
}

function showArtistModal(user) {
  document.querySelector("#dialog-artist-info").showModal();
}

function updateArtistClicked() {

}

function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
}
async function createArtistClicked(event) {
  console.log(event);
  const form = event.target;
  const name = form.name.value;
  const birthDate = form.birthDate.value;
  const activeSince = form.activeSince.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const rawResponse = await createArtist(name, birthDate, activeSince, labels, website, image, shortDescription);
  // form.reset();
  console.log(rawResponse);
  const response = await rawResponse.json();
  console.log(response);
}
// function sortByGenre()
