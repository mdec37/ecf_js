const API_URL_RELEASE = "https://coverartarchive.org/";

function apiGetCover(idRelease) {
    const request = new XMLHttpRequest();
    // request.open("GET", API_URL + "artist?query=" + name + '&fmt=json', true);
    request.open("GET", API_URL_RELEASE + "release/" + encodeURIComponent(idRelease), true);
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
