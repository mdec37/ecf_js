SEARCH_FORM.addEventListener("submit", (ev) => {
    ev.preventDefault();
    CONTAINER_RESPONSE.textContent = "";

    if (SELECT_FORM.value == "artiste") {
        apiGetArtist(INPUT_VALUE.value);

        INPUT_VALUE.value = null;
    } 
    else if (SELECT_FORM.value == "titre") {
        console.log("input sélectionné : titre");
    } 
    else if (SELECT_FORM.value == "album") {
        console.log("input sélectionné : album");
    } 
    else if (SELECT_FORM.value == "all") {
        console.log("input sélectionné : all");
    }
    
});