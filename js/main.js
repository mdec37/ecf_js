SEARCH_FORM.addEventListener("submit", (ev) => {
    ev.preventDefault();
    RESULT_SENTENCE.textContent = null;
    CONTAINER_BODY.textContent = null;


    if (SELECT_FORM.value == "artiste") {
        // REINITIALISATION DES VARIABLES AVANT DE BOUCLER
        NB_RESULT_LINE = 0;
        FIRST_TIME = false;
        
        apiGetArtist(INPUT_VALUE.value);
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