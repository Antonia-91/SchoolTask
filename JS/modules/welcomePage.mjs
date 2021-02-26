const welcome =
  "<h1>Välkommen till vår värld!</h1><img id='imgOfWorld' src='../../images/world-map.png' alt='Map of the world'>";

export function welcomePage() {
  document.getElementById("content").innerHTML = welcome;
}