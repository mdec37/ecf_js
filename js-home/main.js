const selectForm = document.querySelector("#search-select");


searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    countResponse = 0;
    resultsZone.textContent = "";
    premiereFois = false;


    if (selectForm.value == "artiste") {
        apiGetArtist(artistName.value);
        
    } 
    else if (selectForm.value == "titre") {
        apiGetRecord(artistName.value);

        console.log("input sélectionné : titre");
    } 
    else if (selectForm.value == "album") {
        apiGetRelease(artistName.value);

        console.log("input sélectionné : album");
    } 
    else if (selectForm.value == "all") {

        
        console.log("input sélectionné : all");
    }
    
});