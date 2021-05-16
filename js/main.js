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
    FOOTER_BTN_ALL.style.display = "none";

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

        if (SELECT_FORM.value == "filtre") {
            RESULT_SENTENCE.textContent = "Veuillez choisir un filtre pour faire votre recherche";
        } else if (INPUT_VALUE.value != "") {
            TABLE_HEADER.style.display = "block";
        } else if (INPUT_VALUE.value == "") {
            RESULT_SENTENCE.textContent = "Veuillez saisir quelque chose pour faire votre recherche";
        };
        
        // APPEL DES FONCTIONS
        if (SELECT_FORM.value == "artiste" & INPUT_VALUE.value != "") {
            apiGetArtist(INPUT_VALUE.value);

            setTimeout(function(){
                FOOTER_BTN_ARTIST.style.display = "block";
            }, 500);
        } 
        else if (SELECT_FORM.value == "titre" & INPUT_VALUE.value != "") {
            apiGetRecord(INPUT_VALUE.value);

            setTimeout(function(){
                FOOTER_BTN_RECORD.style.display = "block";
            }, 500);
        } 
        else if (SELECT_FORM.value == "album" & INPUT_VALUE.value != "") {
            apiGetRelease(INPUT_VALUE.value);

            setTimeout(function(){
                FOOTER_BTN_RELEASE.style.display = "block";
            }, 500);
        } 
        else if (SELECT_FORM.value == "all" & INPUT_VALUE.value != "") {
            setTimeout(function(){
                FOOTER_BTN_ALL.style.display = "block";
            }, 500);
        }
    },1200);
});