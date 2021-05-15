const selectForm = document.querySelector("#search-select");
const spinnerBorder = document.querySelector("#spinner-border");


searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // REINITIALISE TOUT
    countResponse = 0;
    resultsZone.textContent = "";
    premiereFois = false;
    countOffset = 0;

    // SUPPRESSION DE TOUS LES BOUTONS
    btnTestArtist.style.display = "none";
    btnTestRecord.style.display = "none";
    btnTestRelease.style.display = "none";


    if (selectForm.value == "artiste") {
        apiGetArtist(artistName.value);

        btnTestArtist.style.display = "block";
    } 
    else if (selectForm.value == "titre") {
        apiGetRecord(artistName.value);

        btnTestRecord.style.display = "block";
        
        console.log("input sélectionné : titre");
    } 
    else if (selectForm.value == "album") {
        apiGetRelease(artistName.value);

        btnTestRelease.style.display = "block";

        console.log("input sélectionné : album");
    } 
    else if (selectForm.value == "all") {

        
        console.log("input sélectionné : all");
    }
    
});