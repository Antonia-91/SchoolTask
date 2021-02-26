export function exportCitiesPage() {
  // ------- create elements -------- //
  let content = document.getElementById("content");

  let displayCity = document.createElement("h1");
  displayCity.setAttribute("id", "city");
  content.appendChild(displayCity);

  let displayPop = document.createElement("p");
  displayPop.setAttribute("id", "pop");
  content.appendChild(displayPop);

  let icon = document.createElement("img");
  content.appendChild(icon);
  icon.id = "icon";
  icon.src = "";

  let weather = document.createElement("div");
  weather.id = "weather";
  content.appendChild(weather);
  let temp = document.createElement("temp");
  temp.id = "temp";
  weather.appendChild(temp);
  
  let cityPictureWrp = document.createElement('div');
  cityPictureWrp.setAttribute("id", "cityPictureWrp");
  content.appendChild(cityPictureWrp);

  let cityInfo = document.createElement('div');
  cityInfo.setAttribute("id", "cityInfo");
  content.appendChild(cityInfo);

  let visitedBtn = document.createElement("button");
  visitedBtn.setAttribute("id", "visitedBtn");
  visitedBtn.setAttribute("class", "Btn");
  content.appendChild(visitedBtn);
  visitedBtn.innerHTML = "Här har jag varit!";
}
