const selectForm = document.querySelector("#search-select");


searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    resultsZone.textContent = "";

    if (selectForm.value == "artiste") {
        apiGetArtist(artistName.value);

        // REINITIALISATION DES VARIABLES AVANT DE BOUCLER
        nbLineResult = 0;
        premiereFois = false;
        artistName.value = null;
    } 
    else if (selectForm.value == "titre") {
        console.log("input sélectionné : titre");
    } 
    else if (selectForm.value == "album") {
        console.log("input sélectionné : album");
    } 
    else if (selectForm.value == "all") {
        console.log("input sélectionné : all");
    }
    
});