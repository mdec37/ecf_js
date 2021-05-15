SEARCH_FORM.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // REINITIALISATION DES VARIABLES AVANT DE BOUCLER
    NB_RESULT_LINE = 0;
    FIRST_TIME = false;
    RESULT_SENTENCE.textContent = null;
    CONTAINER_BODY.textContent = null;
    countOffset = 0;

    // SUPPRESSION DE TOUS LES BOUTONS
    BTN_ARTIST.style.display = "none";
    BTN_RECORD.style.display = "none";
    BTN_RELEASE.style.display = "none";


    if (SELECT_FORM.value == "artiste") {
        apiGetArtist(INPUT_VALUE.value);

        btnArtist.style.display = "block";
    } 
    else if (SELECT_FORM.value == "titre") {
        apiGetRecord(INPUT_VALUE.value);

        BTN_RECORD.style.display = "block";
        console.log("input sélectionné : titre");
    } 
    else if (SELECT_FORM.value == "album") {
        apiGetRelease(INPUT_VALUE.value);

        BTN_RELEASE.style.display = "block";
        console.log("input sélectionné : album");
    } 
    else if (SELECT_FORM.value == "all") {
        BTN_ALL.style.display = "block";
        console.log("input sélectionné : all");
    }
});