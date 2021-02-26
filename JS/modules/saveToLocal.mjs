export function saveToLocal() {

  let visited;

  //Om LS är fyllt, kopiera till tillfällig array. Om tomt, lägg till tom array.
  if (localStorage.getItem("visited") !== null) {
    visited = JSON.parse(localStorage.getItem("visited"));
  } else {
    visited = [];
  }

  // console.log(visited);
  
  //"Här har jag varit"-knapp
  let visitedBtn = document.getElementById("visitedBtn");
  visitedBtn.addEventListener("click", function () {
    addToLocal();
    // console.log("clicked");
    // console.log(visited);
  });

  //Fetchar städer-json
  function addToLocal() {
    fetch("JS/json/stad.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data[0]);
      saveCityId(data);
    });
  }

  //Matchar den aktuella stadens namn med rätt id i json-filen och lägger till den i den tillfälliga arrayen som pushas upp i LS
  //om den inte redan finns i LS!
  function saveCityId(cityList) {
    let displayedCity = document.getElementById("city").textContent.trim();

    for (let id in cityList) {
      if (cityList[id].stadname == displayedCity) {
        // console.log(cityList[id].id);
        let addVisited = {
          cityId: cityList[id].id,
        };
        if (visitedCheck(addVisited) == 1) {
          // console.log('Finns redan!');
          visitedBtn.innerHTML = "Redan vald!";
          visitedBtn.style.color = "red";
          break;
        } else {
          visited.push(addVisited);
          // console.log(visited);
          localStorage.setItem("visited", JSON.stringify(visited));
        }
      }
    }
  }

  //Kollar om staden redan är markerad som besökt. I så fall skickas felmeddelande.
  function visitedCheck (addVisited) {
    for (let city in visited) {
      if (visited[city].cityId === addVisited.cityId) {
        return 1;
      }
    } 
  }
}
