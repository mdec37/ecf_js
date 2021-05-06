//mon script pour allez chercher l'api
const API_URL = "https://musicbrainz.org/ws/2/";
function apiGetArtist(name,error) {
    console.log("coucou1");
    const request = new XMLHttpRequest();
    request.open("GET", API_URL + "artist/?query=" + encodeURIComponent(name), true);
    request.addEventListener("readystatechange", () => {
        console.log("coucou2");
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log("coucou3");
                const response = request.responseText;
                console.log("coucou4");
                console.log(response);
                artist-list.forEach(artist => {
                    addArtist(
                    );
                });
            } else {
                error(request);
                console.log("error");
            }
        }
    });
    request.send();
}


// le script pour mon evenement (sur mon submit) :
searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    console.log("test");
    console.log(artistName.value);
    apiGetArtist(artistName.value);
});


// mon script lié a mon dom (création des div, article, paragraphe) :
const artistZone = document.querySelector(".results_container");
const searchForm = document.querySelector("#search_artist_form");
const inputSearch = document.querySelector("#inputSearch");
const resultsZone = document.querySelector("#results_container");
const artistName = document.querySelector("#artist");
function addArtist(name){
    const artistContainer = document.createElement("article");
    artistContainer.className = "artistContainer";
    const artistName = document.createElement("p");
    artistName.className = "name";
    artistName.textContent = name;
    artistContainer.appendChild(artistName);
    resultsZone.appendChild(artistContainer);
};


// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>ECF JS</title>
// </head>
// <body>
//     <main>
//         <form class="bloc-container" id="search_artist_form">
//             <div class="form-group">
//                 <label for="artist">Nom de l'artiste</label>
//                 <input type="text" id="artist" />
//             </div>
//             <input id="inputSearch" type="submit" value="Rechercher" />
//         </form>
//         <div id="results_container">
            
//         </div>
//     </main>  
// </body>
// <script src="dom.js"></script>
// <script src="api.js"></script>
// <script src="main.js"></script>
// </html>