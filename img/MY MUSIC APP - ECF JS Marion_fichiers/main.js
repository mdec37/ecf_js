SEARCH_FORM.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // REINITIALISATION DES VARIABLES AVANT DE BOUCLER
    NB_RESULT_LINE = 0;
    FIRST_TIME = false;
    RESULT_SENTENCE.textContent = null;
    CONTAINER_BODY.textContent = null;
    countOffset = 0;

    // SUPPRESSION DE TOUS LES BOUTONS
    FOOTER_BTN_ARTIST.style.display = "none";
    FOOTER_BTN_RECORD.style.display = "none";
    FOOTER_BTN_RELEASE.style.display = "none";

    // EFFACER LE HEADER TABLE
    TABLE_HEADER.style.display = "none";

    // AJOUTER UN LOADER
    let divSpinner = document.createElement("div");
        divSpinner.className = "d-flex justify-content-center";
    let spinner = document.createElement("div");
        spinner.className = "spinner-border";
        spinner.setAttribute("role", "status");
        spinner.style.display = "block";
    divSpinner.appendChild(spinner);
    CONTAINER_RESPONSE.appendChild(divSpinner);


    // APPELER DES FONCTIONS AVEC UN SETTIMEOUT POUR VOIR LE SPINNER
    setTimeout(function(){
        spinner.style.display = "none";
        TABLE_HEADER.style.display = "block";

        // APPEL DES FONCTIONS
        if (SELECT_FORM.value == "artiste") {
            
            apiGetArtist(INPUT_VALUE.value);

            FOOTER_BTN_ARTIST.style.display = "block";
        } 
        else if (SELECT_FORM.value == "titre") {
            apiGetRecord(INPUT_VALUE.value);

            FOOTER_BTN_RECORD.style.display = "block";
            console.log("input sélectionné : titre");
        } 
        else if (SELECT_FORM.value == "album") {
            apiGetRelease(INPUT_VALUE.value);

            FOOTER_BTN_RELEASE.style.display = "block";
            console.log("input sélectionné : album");
        } 
        else if (SELECT_FORM.value == "all") {
            FOOTER_BTN_ALL.style.display = "block";
            console.log("input sélectionné : all");
        }
    },1200);
});