const API_URL = "https://musicbrainz.org/ws/2/";

function apiGetArtist(result) {
    const request = new XMLHttpRequest();
    // request.open("GET", API_URL + "artist?query=" + name + '&fmt=json', true);
    request.open("GET", API_URL + "artist/?query=" + encodeURIComponent(result) + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.artists.map(result => apiResult(result, response));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}


function apiGetArtistTitre(idArtist) {
    const request = new XMLHttpRequest();
    // request.open("GET", API_URL + "artist?query=" + name + '&fmt=json', true);
    request.open("GET", API_URL + "recording/?query=arid:" + encodeURIComponent(idArtist) + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(idArtist => apiResultRecords(idArtist));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}


// PENSER A EFFACER LA RECHERCHE APRES LAVOIR FAITE


// https://musicbrainz.org/ws/2/recording/?query=artist:%22Daft%20punk%22&limit=100&offset=0&fmt=json
// https://musicbrainz.org/ws/2/recording/?query=artist:%22Daft%20punk%22&limit=100&offset=0&fmt=json
// ${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}


// Il va falloir obtenir l'ensemble des résultats et pas que les 25 premiers par défaut / pour cela je vais devoir décaler mon offset de 25 a chaque requete.
// // Paging
// Browse requests are the only requests which support paging: any browse request supports an 'offset=' argument to get more results. Browse requests also support 'limit=': the default limit is 25, and you can increase that up to 100.
// ${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}
// return await fetch(`${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}&limit=100&offset=${offset}&fmt=json`)

// pour faire le rechargement
// Scrollspy ou avec un detecteur de viewport height
