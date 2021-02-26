/*popMenu*/
import { saveToLocal } from "./saveToLocal.mjs";
import { exportCitiesPage } from "./cityPage.mjs";

export function popMenu() {
  let countryNavList = document.getElementById("country");
      document.getElementById("nav_bar").insertAdjacentHTML("beforeend", "<div id='dropDown' class='dropdown-content'></div>");
      document.getElementById("dropDown").insertAdjacentHTML("beforeend", "<ul id='ulCity'></ul>");
      let citiesNavList = document.getElementById("ulCity");

  countryNavList.addEventListener("click", function (evt) {
      let targetCountry = evt.target.id;
      //console.log(targetCountry);
      let drop = document.getElementById("dropDown");
      drop.classList.toggle("show");
        //console.log("hej");
      window.onclick = function(event) {
      if (!event.target.matches('.country')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

  citiesNavList.innerHTML = "";

    fetch("JS/json/stad.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let obj = 0; obj < data.length; obj++) {
          //console.log(data[obj].stadname);
          if (data[obj].countryid == targetCountry) {
            //console.log(data[obj].stadname);
            citiesNavList.insertAdjacentHTML("beforeend", `<li id = "${data[obj].id}" class = "dropbtn" >${data[obj].stadname}</li>`);
          }
        }
      });
    });
   //-------Eventlistener empties main content and runs exportcitiespage() and savetolocal()----//
  document.getElementById("ulCity").addEventListener("click", function (evt) {
    document.getElementById('content').innerHTML = '';
    exportCitiesPage();
    saveToLocal();
    let targetCity = evt.target.id;

    // ------- gets data from stad.json -------- //
    fetch("JS/json/stad.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        printCity(data);
      });

    // ------- Prints data from stad.json -------- //
    function printCity(cityList) {
      let displayCity = document.getElementById('city');
      let displayPop = document.getElementById('pop');

      for (let city in cityList) {
        if (cityList[city].id == targetCity) {
          //console.log(cityList[city].stadname);
          displayCity.innerHTML = cityList[city].stadname;
          displayPop.innerHTML = "Invånarantal: " + cityList[city].population;

          //console.log("test" + cityList[city].stadname);
          let cityVar = cityList[city].stadname; 
          let weather = document.getElementById("weather");
          let temp = document.getElementById("temp");
       
        //----fetch weather api and run function printweather----//
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+ cityVar + 
        "&appid=78c8442235c91bad66231106169b555a&units=imperial&lang=sv")
            .then (response => response.json())
            .then (data => {
                //console.log(data.weather.main);
                //console.log(data);
                
                printWeather(data);

            })

            function printWeather(list){
                let windVar = list.wind.speed;
                let calm = 1;
                let lightAir = 3;
                let lightBreeze = 7;
                let gentleBreeze = 12;
                let moderateBreeze = 18;
                let freshBreeze = 24;
                let strongBreeze = 31;
                let nearGale = 38;
                let gale = 46;
                let strongGale = 54;
                let wholeGale = 63;
                let stormForce = 75;
                if (windVar <= calm) {
                    weather.insertAdjacentHTML("beforeend", " lugn vind"); 
                } else if (windVar <= lightAir) {
                weather.insertAdjacentHTML("beforeend", " svag vind");
                } else if (windVar <= lightBreeze) {
                    weather.insertAdjacentHTML("beforeend", " svag vind");
                    } else if (windVar <= gentleBreeze) {
                        weather.insertAdjacentHTML("beforeend", " måttlig vind");
                        } else if (windVar <= moderateBreeze) {
                            weather.insertAdjacentHTML("beforeend", " måttlig vind");
                            } else if (windVar <= freshBreeze) {
                                weather.insertAdjacentHTML("beforeend", " frisk vind");
                                } else if (windVar <= strongBreeze) {
                                    weather.insertAdjacentHTML("beforeend", " frisk vind");
                                    } else if (windVar <= nearGale) {
                                        weather.insertAdjacentHTML("beforeend", " hård vind");
                                        } else if (windVar <= gale) {
                                            weather.insertAdjacentHTML("beforeend", " hård vind");
                                            } else if (windVar <= strongGale ) {
                                                weather.insertAdjacentHTML("beforeend", " mycket hård vind");
                                                } else if (windVar <= wholeGale ) {
                                                    weather.insertAdjacentHTML("beforeend", " storm");
                                                    }  else if (windVar <= stormForce ) {
                                                            weather.insertAdjacentHTML("beforeend", " svår storm");
                                                            } else {
                                                                weather.insertAdjacentHTML("beforeend", " orkan"); 
                                                            }
                weather.insertAdjacentHTML("afterbegin", "Idag är det " + list.weather[0].description + ", ");
                let ftemp = list.main.temp;
                let ctemp = (ftemp - 32) * 5 / 9;
                let ctempRounded = Math.round(ctemp * 10) /10;
                temp.insertAdjacentHTML("beforeend", ctempRounded +" " + "grader celcius och ");
                let iconPng = "http://openweathermap.org/img/w/" + list.weather[0].icon + ".png";
                icon.src = iconPng;
            }

            //-----fetch wiki api and print infornmation about the city---//
        fetch(`https://sv.wikipedia.org/api/rest_v1/page/summary/${cityList[city].stadname}`)
            .then(function(response){
            console.log(response);
            return (response.json());
            })
            .then(function(data){
              console.log(data);
              document.getElementById('cityInfo').insertAdjacentHTML("beforeend", data.extract_html);
              let cityPicture = document.createElement('img');
              cityPicture.src = data.originalimage.source;
              cityPicture.setAttribute("id", "cityPicture");
              document.getElementById('cityPictureWrp').appendChild(cityPicture);
            })
        }
        
      }
          
        }
      })  

    }


