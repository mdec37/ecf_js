// RECUPERER LES INFOS DE L'ARTISTE EN FONCTION DE L'INPUT VALUE
function apiGetArtist(artist) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "artist/?query=" + encodeURIComponent(artist) + "&limit=25&offset=0&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.artists.map(artist => artistResult(artist, response));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}
        // -> Limite de l'offset à 25 pour ne pas avoir trop de résultats d'un coup

        

// RECUPERER LES TITRES DE L'ARTISTE EN FONCTION DE SON ID
function apiGetTitle(idArtist) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=arid:" + encodeURIComponent(idArtist) + "&limit=25&offset="+ countOffset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(idArtist => titleResult(idArtist, response));
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
    request.open("GET", COVERARCHIVE_API_URL + "release/" + encodeURIComponent(idRelease), true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.images.map(idRelease => coverResult(idRelease));
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



// RECUPERER LES INFOS DES RECORDS EN FONCTION DE L'INPUT VALUE
function apiGetRecord(result) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=" + encodeURIComponent(result) + "&limit=25&offset="+ countOffset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(result => apiResultRecording(result, response));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}



// RECUPERER LES INFOS DES RELEASES EN FONCTION DE L'INPUT VALUE
function apiGetRelease(result) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "release/?query=" + encodeURIComponent(result) + "&limit=25&offset="+ countOffset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.releases.map(result => apiResultRelease(result, response));
            } else {
                console.log("error");
            }
        }
    });
    request.send();
}