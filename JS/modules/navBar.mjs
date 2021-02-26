import { visitedCity } from "./visitedCity.mjs";
import { welcomePage } from "./welcomePage.mjs";
let navBar = document.getElementById("nav_bar");

export function navBarContents() {
  //Rubrik + knapp till main
  navBar.insertAdjacentHTML(
    "beforeend",
    `<button class="Btn" id = "mainBtn">Förstasidan</button><h3>Länder</h3>
    `
  );
  // skapar landets ul + dess attributer
  let countryNavList = document.createElement("ul");
  countryNavList.className = "dropbtn";
  countryNavList.id = "country";
  navBar.appendChild(countryNavList);

  // hämtar ländernas json-fil
  fetch("JS/json/land.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data.length);
      //Loopar igenom objekten och lägger dem som li i en ul. Alla li får ett unikt id.
      for (let obj = 0; obj < data.length; obj++) {
        // console.log(data[obj]);
        countryNavList.insertAdjacentHTML(
          "beforeend",
          `<li id = "${data[obj].id}" class="country Btn">${data[obj].countryname}</li>`
        );
      }
    });

  //eventListener till hem-knappen
  let mainBtn = document.getElementById("mainBtn");
  mainBtn.addEventListener("click", function () {
    //console.log("mainBtn clicked");
    welcomePage();
  });

  //knapp till besökt-sidan
  navBar.insertAdjacentHTML(
    "beforeend",
    `<button class="Btn" id = "visitedNavBtn">Besökta</button>`
  );
  // eventListener till besökta städer
  let visitedNavBtn = document.getElementById("visitedNavBtn");
  visitedNavBtn.addEventListener("click", function () {
    //console.log("visitedNavBtn clicked");
    document.getElementById("content").innerHTML = "";
    visitedCity();
  });
}
