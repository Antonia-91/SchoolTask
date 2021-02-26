export function visitedCity() {
  //----------  Hämta  ----------//
  const main = document.querySelector("#main");
  const content = document.querySelector("#content");
  const saved_data = document.querySelector("#saved_data");
  const myLi = document.getElementById("myLi");
  const totalPop = document.querySelector("#totalPop");

  //----------  "visited" key till Ls. sätt till en variabel savedData   ----------//
  let savedData = JSON.parse(localStorage.getItem("visited"));
  //console.log(JSON.parse(localStorage.getItem("visited")));

  //---- tom array väntar på id:s ----- ///
  let templateObjects = [];

  //console.log(typeof savedData[0].population);

  //----------  skapa element  ----------//
  const visitedUl = document.createElement("ul");
  visitedUl.id = "myUl";
  content.innerHTML = "";
  content.appendChild(visitedUl); // append ul till content!

  //----------  skapa button som kan rensa LS  ----------//
  const clear = document.createElement("button");
  clear.id = "clearBtn";
  clear.setAttribute("class", "Btn");
  content.appendChild(clear);
  clear.innerHTML = "Rensa besökta städer";
  clear.addEventListener("click", function () {
    localStorage.clear(savedData);
    location.reload();
  });

  //----------- async gör att functionen väntar på ett svar...----------//
  //----------- functionen kör en fetch på stad.json filen ----------//
  async function fetchData() {
    // async
    return fetch("JS/json/stad.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
  }

  //---------- function print data ----------//
  // --------- await istället för .then.. om jag försöker köra en forEach utan att jag hunnit få svar från API så kommer det crasha, därför kan man köra async och await ---------//
  async function PrintList() {
    let dataCountries = await fetchData(); // sätt functionen som fetchar i en variabel
    //console.log("dataCountries", dataCountries);
    if (savedData !== null) {
      // jämför mitt LS med stad.json fil . Om dom innehåller id som är likadana. då kommer dom retuneras och sparas  i min Array "tamplateObject"
      dataCountries.forEach((country) => {
        savedData.forEach((data) => {
          if (data.cityId === country.id) {
            //console.log(country);
            // hämta min tomma array. pusha in varje "country" i dataContries OM gemensamt id == sant!
            templateObjects.push(country);
          }
        });
      });
    }
    // skapa en variabel "tamplate" som får innehålla allt det jag vill printa ut
    let tamplate = ""; // töm först
    visitedUl.innerHTML = ""; // töm först
    if (templateObjects !== null) {
      // om min templateObjects Array inte är tom. gör det här: för varje object i templateObjects:
      templateObjects.forEach(function (objects) {
        tamplate += `  <li class="myLi" id="${objects.stadname}"> <strong>Stad: </strong>${objects.stadname}  |    <strong>Invånarantal: </strong>${objects.population} | <i id="${objects.id}" class="fas fa-trash-alt"></i> </li> <br> `;
      });
      visitedUl.innerHTML = tamplate;
      printPopulation();
      //console.log(tamplate);
    }
  }
  PrintList();

  //---------- function Print total population ----------//
  function printPopulation() {
    //console.log("templateObjects", templateObjects);
    //// create array of populations ////
    if (templateObjects !== null) {
      const popArray = templateObjects.map(function (populations) {
        return parseInt(populations.population);
      });
      //console.log("poparray", popArray);

      //----------  räkna ut totalen av population-array ---------- //
      let popSum = popArray.reduce(function (total, pop) {
        return total + pop;
      }, 0);
      //console.log("popsum", popSum);
      // popSum = totalen

      let popSumTamplate = `  <h2 id="totalPop">Totalt invånarantal: ${popSum} </h2>  `;
      visitedUl.insertAdjacentHTML("beforeend", popSumTamplate);
    }
  }
  printPopulation();

  //---------- function remove from list ---------- //
  function remove(e) {
    templateObjects.length = 0; // resettar min array, eftersom vi uppdatetar DOM, så resettar vi templateObjects så den inte dupliceras..
    const clicked = e.target.id;
    //console.log("e", e);
    // console.log("savedData", savedData);

    savedData = savedData.filter((item) => item.cityId != clicked); // ger oss en ny array som filtrerar och behåller dom id:s som inte blivit klickade.

    localStorage.setItem("visited", JSON.stringify(savedData));
    PrintList();
    printPopulation();
  }
  visitedUl.addEventListener("click", remove);
}
