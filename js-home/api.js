const MUSICBRAINZ_API_URL = "https://musicbrainz.org/ws/2/";
const COVERARCHIVE_API_URL = "https://coverartarchive.org/";


// RECUPERER LES INFOS DE L'ARTISTE EN FONCTION DE SON NOM
function apiGetArtist(result) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "artist/?query=" + encodeURIComponent(result) + "&limit=100&offset=0&fmt=json", true);
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

// RECUPERER LES TITRES DE L'ARTISTE EN FONCTION DE SON ID
function apiGetArtistTitre(idArtist) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=arid:" + encodeURIComponent(idArtist) + "&limit=100&offset=0&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(idArtist => apiResultRecords(idArtist, response));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}



// RECUPERER LES COVERS EN FONCTION DE L'ID DE L'ALBUM
function apiGetCover(idRelease) {
    const request = new XMLHttpRequest();
    // request.open("GET", API_URL + "artist?query=" + name + '&fmt=json', true);
    request.open("GET", COVERARCHIVE_API_URL + "release/" + encodeURIComponent(idRelease), true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.images.map(idRelease => apiCover(idRelease));

                console.log(response);
            } if (request.status === 404) {
                console.log("Pas d'image pour cette release");
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}




// https://musicbrainz.org/ws/2/recording/?query=artist:%22Daft%20punk%22&limit=100&offset=0&fmt=json

// ${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}


// Il va falloir obtenir l'ensemble des résultats et pas que les 25 premiers par défaut / pour cela je vais devoir décaler mon offset de 100 a chaque requete.
// // Paging
// Browse requests are the only requests which support paging: any browse request supports an 'offset=' argument to get more results. Browse requests also support 'limit=': the default limit is 25, and you can increase that up to 100.
// ${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}
// return await fetch(`${MUSIC_BRAINZ_API}?query=recording:${searchTerm} OR artistname:${searchTerm} OR release:${searchTerm}&limit=100&offset=${offset}&fmt=json`)

// pour faire le rechargement
// Scrollspy ou avec un detecteur de viewport height