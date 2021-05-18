// RECUPERER LES INFOS DE L'ARTISTE EN FONCTION DE L'INPUT VALUE
function apiGetArtist(artist) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "artist/?query=" + encodeURIComponent(artist) + "&limit=25&offset=0&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.artists.map(artist => artistResult(artist, response));
                if(response.count == 0 ){
                    RESULT_SENTENCE.textContent = "Il n'y a pas de résultat pour cette recherche. Veuillez réessayer.";
                }
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
            }
        }
    });
    request.send();
}

        

// RECUPERER LES TITRES DE L'ARTISTE EN FONCTION DE SON ID
function apiGetArtistRecord(idArtist) {          
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=arid:" + encodeURIComponent(idArtist) + "&limit=25&offset="+ countOffset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(idArtist => artistTitleResult(idArtist, response));
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
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
                response.recordings.map(result => recordingResult(result, response));
                if(response.count == 0 ){
                    RESULT_SENTENCE.textContent = "Il n'y a pas de résultat pour cette recherche. Veuillez réessayer.";
                }
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
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
                response.releases.map(result => releaseResult(result, response));
                if(response.count == 0 ){
                    RESULT_SENTENCE.textContent = "Il n'y a pas de résultat pour cette recherche. Veuillez réessayer.";
                }
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
            }
        }
    });
    request.send();
}


// RECUPERER LES RECORDS EN FONCTION DE L'ID DES RELEASES
function apiGetReleaseRecord(idRelease, countResponse) {           
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=reid:" + encodeURIComponent(idRelease) + "&limit=25&offset="+ countOffset + "&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(idRelease => resultAlbumTitle(idRelease, response, countResponse));
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
            }
        }
    });
    request.send();
}



// RECHERCHE DE TITRES SI LE RESULTAT EST SOIT UN RECORD, SOIT UN ARTIST, SOIT UNE RELEASE
function apiGetAll(result) {
    const request = new XMLHttpRequest();
    request.open("GET", MUSICBRAINZ_API_URL + "recording/?query=recording:"+ encodeURIComponent(result) + " OR artistname:" + encodeURIComponent(result) + " OR release:" + encodeURIComponent(result) + "&limit=25&offset=0&fmt=json", true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                response.recordings.map(result => apiResultAll(result, response));
                if(response.count == 0 ){
                    RESULT_SENTENCE.textContent = "Il n'y a pas de résultat pour cette recherche. Veuillez réessayer.";
                }
            } else {
                RESULT_SENTENCE.textContent = "Un problème est survenu. Veuillez réessayer plus tard.";
            }
        }
    });
    request.send();
}
