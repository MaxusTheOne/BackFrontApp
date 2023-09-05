"use strict";

import { getArtists } from "./rest";
window.addEventListener("load", initApp);

const globalArtists = [];

async function initApp() {
  console.log("frontend init");
  globalArtists = await getArtists();
  displayArtists();
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
    <h3>${artistObj.firstName} ${artistObj.lastName} </h3>
    <h3>${artistObj.age} år</h3>
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

// function sortByGenre()
