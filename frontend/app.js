"use strict";

import { getArtists } from "./rest.js";
window.addEventListener("load", initApp);

let globalArtists = [];

async function initApp() {
  console.log("frontend init");
  globalArtists = await getArtists();
  console.log(globalArtists);
  displayArtists(globalArtists);
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
  document.querySelector("#artists article:last-child img").addEventListener("click", () => showUserModal(artistObj));
}
function updateClicked(userObject) {
  document.querySelector("#dialog-update-artist").showModal();
  document.querySelector("#update-image").src = userObject.image;
  document.querySelector("#form-update-artist").addEventListener("submit", updateUserClicked);
}

function deleteClicked(userObject) {
  document.querySelector("#dialog-delete-artist").showModal();
}

function showUserModal(user) {
  document.querySelector("#dialog-artist-info").showModal();
}

function updateUserClicked() {}
// function sortByGenre()
