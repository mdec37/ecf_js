/// APPEL DE LA FUNCTION apiGetArtistRecord A L'AIDE DE L'ID DE L'ARTITSTE QU'ON VIENT DE RECUPERER DANS L'INPUT
function artistResult(artist, response) {
    if (artist) {
        if (artist.score === 100 ) {
            apiGetArtistRecord(artist.id);
        }
}



// INITIALISATION DES VARIABLES AVANT DE BOUCLER
let NB_RESULT_LINE = 0;
let FIRST_TIME = false;


/// AFFICHAGE DES RESULTATS / LISTE DES RESULTATS / MODALE
function artistTitleResult(idArtist, response) {
    NB_RESULT_LINE += 1;

    // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
    if (!FIRST_TIME){
        let resultSentence = document.createElement("p");
            resultSentence.className = "result-sentence";
            resultSentence.textContent = response.count + " résultat(s) pour la recherche : " + INPUT_VALUE.value;
        
        RESULT_SENTENCE.appendChild(resultSentence);

        FIRST_TIME = true;
    }


    /// Création du tr du tableau pour chaque résultat
    let trBody = document.createElement("tr");


    /// 0 - AFFICHER LE NUMERO DE LA LIGNE
    let nbLine = document.createElement("td");
        nbLine.textContent = NB_RESULT_LINE;
    trBody.appendChild(nbLine);



    /// 1 - AFFICHER LES ARTISTES
    // Vérifier qu'il y a un ou des artistes
    if(idArtist["artist-credit"]){
        let artistName = document.createElement("td");        
            artistName.textContent = forRecordingName();
        trBody.appendChild(artistName);

        // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
        function forRecordingName () {
            let recordingName = '';
            for (var i = 0; i < idArtist["artist-credit"].length; i++) {
                if(idArtist["artist-credit"].length>1){
                    recordingName += idArtist["artist-credit"][i].name + " feat ";
                } else {
                    recordingName += idArtist["artist-credit"][i].name;
                }
            }
            // Ne pas afficher le dernier "feat" s'il y a plus de 2 artistes
            let lastCharacter = recordingName.slice(-5, -1);
            if(lastCharacter == "feat"){
                recordingName = recordingName.slice(0, -6);
            }
            return recordingName;
        }
    } else {
        let artistName = document.createElement("td");        
            artistName.textContent = " - ";
        trBody.appendChild(artistName);
    }



    /// 2 - AFFICHER LE TITRE 
    // Vérifier qu'il y a un titre
    if(idArtist.title){
        let recordTitle = document.createElement("td");
            recordTitle.textContent = idArtist.title;
        trBody.appendChild(recordTitle);
    } else {
        let recordTitle = document.createElement("td");
            recordTitle.textContent = " - ";
        trBody.appendChild(recordTitle);
    }



    /// 3- AFFICHER LES ALBUMS
    // Vérifier qu'il y a des albums
    if(idArtist.releases){
        let releaseTitle = document.createElement("td");
            releaseTitle.textContent = forReleaseTitle();
        trBody.appendChild(releaseTitle);
        
        // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
        function forReleaseTitle () {
            let releaseTitle = '';
            for (var i = 0; i < idArtist.releases.length; i++) {
                if(idArtist.releases.length>1){
                    releaseTitle += " " + idArtist.releases[i].title + " &";
                } else {
                    releaseTitle += idArtist.releases[i].title;
                }
            }
            // Ne pas afficher le dernier "&" s'il y a plus de 2 albums
            let lastCharacter = releaseTitle.slice(-1);
            if(lastCharacter == "&"){
                releaseTitle = releaseTitle.slice(0, -2);
            }
            return releaseTitle;
        }
    } else {
        let releaseTitle = document.createElement("td");
            releaseTitle.textContent = " - ";
        trBody.appendChild(releaseTitle);
    }



    /// 4- AFFICHER LE BOUTON DE LA MODAL
    let tdButton = document.createElement("td");

    let btnInfo = document.createElement("button");
    if(idArtist.releases){
        btnInfo.className = "btn";
        btnInfo.id = "btnPlus";
        btnInfo.setAttribute('data-bs-toggle', 'modal');
        btnInfo.setAttribute('data-bs-target', '#exampleModal');
        btnInfo.setAttribute('dataId', idArtist.releases[0].id);

        let btnImg = document.createElement("img");
            btnImg.src = "../img/plus.svg";
            btnImg.className = "icon-plus";
            btnImg.setAttribute('alt', 'Icone pour plus d\'informations');
        btnInfo.appendChild(btnImg);
    } else {
        btnInfo.className = "btn";
        btnInfo.id = "btnCross";
        let btnImg = document.createElement("img");
            btnImg.src = "../img/cross.svg";
            btnImg.className = "icon-cross";
            btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
        btnInfo.appendChild(btnImg);
    }

    tdButton.appendChild(btnInfo);



    /// 4A - FENETRE MODAL
    // MODAL HEADER
    let modalFade = document.createElement("div");
        modalFade.className = "modal fade";
        modalFade.id = "exampleModal";
        modalFade.setAttribute('tabindex', '-1');
        modalFade.setAttribute('aria-labelledby', 'exampleModalLabel');
        modalFade.setAttribute('aria-hidden', 'true');
    BODY_CONTAINER.appendChild(modalFade);

    let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-lg";
    modalFade.appendChild(modalDialog);

    let modalContent = document.createElement("div");
        modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h2");
        modalTitle.className = "modal-title";
        modalTitle.id = "exampleModalLabel";
        modalTitle.textContent = "INFORMATIONS";
    modalHeader.appendChild(modalTitle);

    let modalBtn = document.createElement("button");
        modalBtn.className = "btn-close";
        modalBtn.setAttribute('data-bs-dismiss', 'modal');
        modalBtn.setAttribute('aria-label', 'Close');
        modalBtn.setAttribute('type', 'button');
    modalHeader.appendChild(modalBtn);

    
    // MODAL BODY
    let modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.id = "resultModal";
    modalContent.appendChild(modalBody);


    /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES INFOS DE LA MODAL + AFFICHAGE DES COVERS
    btnInfo.addEventListener("click", () => {
        // Vérifier qu'il y a une durée
        if(idArtist.length){
            duree = (millisToMinutesAndSeconds(idArtist.length)) + " minutes";

            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        // Vérifier qu'il y a un titre
        if(idArtist.title){
            titre = idArtist.title;
        }

        // Vérifier qu'il y a un artiste
        if(idArtist["artist-credit"]){
            artiste = forArtistName();
                
            function forArtistName () {
                let artisteName = '';
                for (var i = 0; i < idArtist["artist-credit"].length; i++) {
                    artisteName += idArtist["artist-credit"][i].name + " feat ";
                }
                let lastCharacter = artisteName.slice(-5, -1);
                if(lastCharacter == "feat"){
                    artisteName = artisteName.slice(0, -6);
                }
                return artisteName;
            }
        }

        // Vérifier qu'il y a des albums
        if(idArtist.releases){
            album = forReleaseName();
                
            function forReleaseName () {
                let releaseName = '';
                for (var i = 0; i < idArtist.releases.length; i++) {
                    releaseName += idArtist.releases[i].title + " &";
                }
                let lastCharacter = releaseName.slice(-1);
                if(lastCharacter == "&"){
                    releaseName = releaseName.slice(0, -2);
                }
                return releaseName;
            }
        }

        // Vérifier qu'il y a des genres
        if(idArtist.tags){
            tag = forTags();
                
            function forTags () {
                let tagsName = '';
                for (var i = 0; i < idArtist.tags.length; i++) {
                    tagsName += idArtist.tags[i].name + " -";
                }
                let lastCharacter = tagsName.slice(-1);
                if(lastCharacter == "-"){
                    tagsName = tagsName.slice(0, -2);
                }
                return tagsName;
            }
        }


        // APPEL DE LA FONCTION MODALRESULT AVEC COMME PARAMETRES, CHAQUE ELEMENTS CREES
        modalResult(duree, titre, artiste, album, tag = "");


        // RECUPERER TOUS LES ID DES ALBUMS QU'ON PASSE EN PARAMETRE DE APIGETCOVER QUI APPELLE LES COVERS
        function idReleases () {
            let idReleases = '';
            for (var i = 0; i < idArtist.releases.length; i++) {
                idReleases = idArtist.releases[i].id;
            }
            return idReleases;
        }
        apiGetCover(idReleases());
    });



    /// EVENEMENTS A LA FERMTURE DE LA MODALE : SUPPRESSION
    modalFade.addEventListener('hidden.bs.modal', function () {
        modalBody.textContent = null;
    });


    
    // MODAL FOOTER
    let modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalBtnClose = document.createElement("button");
        modalBtnClose.className = "btn btn-secondary";
        modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
        modalBtnClose.setAttribute('type', 'button');
        modalBtnClose.textContent = 'CLOSE';
    modalFooter.appendChild(modalBtnClose);


    trBody.appendChild(tdButton);

    CONTAINER_BODY.appendChild(trBody);
}



function recordingResult(result, response) {
    if (result) {
        NB_RESULT_LINE += 1;
        
        // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
        if (!FIRST_TIME){
            let resultSentence = document.createElement("p");
                resultSentence.className = "result-sentence";
                resultSentence.textContent = response.count + " résultat(s) pour la recherche : " + INPUT_VALUE.value;
            
            RESULT_SENTENCE.appendChild(resultSentence);

            FIRST_TIME = true;
        }

        /// Création du tr du tableau pour chaque résultat
        let trBody = document.createElement("tr");


        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("td");
            nbLine.textContent = NB_RESULT_LINE;
        trBody.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(result["artist-credit"]){
            let artistName = document.createElement("td");        
                artistName.textContent = forRecordingName();
            trBody.appendChild(artistName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < result["artist-credit"].length; i++) {
                    if(result["artist-credit"].length>1){
                        recordingName += result["artist-credit"][i].name + " feat ";
                    } else {
                        recordingName += result["artist-credit"][i].name;
                    }
                }
                // Ne pas afficher le dernier "feat" s'il y a plus de 2 artistes
                let lastCharacter = recordingName.slice(-5, -1);
                if(lastCharacter == "feat"){
                    recordingName = recordingName.slice(0, -6);
                }
                return recordingName;
            }
        } else {
            let artistName = document.createElement("td");        
                artistName.textContent = " - ";
            trBody.appendChild(artistName);
        }


        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        if(result.title){
            let recordTitle = document.createElement("td");
                recordTitle.textContent = result.title;
            trBody.appendChild(recordTitle);
        } else {
            let recordTitle = document.createElement("td");
                recordTitle.textContent = " - ";
            trBody.appendChild(recordTitle);
        }


        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(result.releases){
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = forReleaseTitle();
            trBody.appendChild(releaseTitle);
            
            // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
            function forReleaseTitle () {
                let releaseTitle = '';
                for (var i = 0; i < result.releases.length; i++) {
                    if(result.releases.length>1){
                        releaseTitle += " " + result.releases[i].title + " &";
                    } else {
                        releaseTitle += result.releases[i].title;
                    }
                }
                // Ne pas afficher le dernier "&" s'il y a plus de 2 albums
                let lastCharacter = releaseTitle.slice(-1);
                if(lastCharacter == "&"){
                    releaseTitle = releaseTitle.slice(0, -2);
                }
                return releaseTitle;
            }
        } else {
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = " - ";
            trBody.appendChild(releaseTitle);
        }


        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let tdButton = document.createElement("td");

        let btnInfo = document.createElement("button");
        if(result.releases){
            btnInfo.className = "btn";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', result.releases[0].id);
            let btnImg = document.createElement("img");
                btnImg.src = "../img/plus.svg";
                btnImg.className = "icon-plus";
                btnImg.setAttribute('alt', 'Icone pour plus d\'informations');
            btnInfo.appendChild(btnImg);
        } else {
            btnInfo.className = "btn";
            btnInfo.id = "btnCross";
            let btnImg = document.createElement("img");
                btnImg.src = "../img/cross.svg";
                btnImg.className = "icon-cross";
                btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
            btnInfo.appendChild(btnImg);
        }
        tdButton.appendChild(btnInfo);
        

        /// 4A - FENETRE MODAL
        // MODAL HEADER
        let modalFade = document.createElement("div");
            modalFade.className = "modal fade";
            modalFade.id = "exampleModal";
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('aria-labelledby', 'exampleModalLabel');
            modalFade.setAttribute('aria-hidden', 'true');
        BODY_CONTAINER.appendChild(modalFade);

        let modalDialog = document.createElement("div");
            modalDialog.className = "modal-dialog modal-lg";
        modalFade.appendChild(modalDialog);

        let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
        modalContent.appendChild(modalHeader);

        let modalTitle = document.createElement("h2");
            modalTitle.className = "modal-title";
            modalTitle.id = "exampleModalLabel";
            modalTitle.textContent = "INFORMATIONS";
        modalHeader.appendChild(modalTitle);

        let modalBtn = document.createElement("button");
            modalBtn.className = "btn-close";
            modalBtn.setAttribute('data-bs-dismiss', 'modal');
            modalBtn.setAttribute('aria-label', 'Close');
            modalBtn.setAttribute('type', 'button');
        modalHeader.appendChild(modalBtn);


        // MODAL BODY
        let modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.id = "resultModal";
        modalContent.appendChild(modalBody);


        /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES INFOS DE LA MODAL + AFFICHAGE DES COVERS
        btnInfo.addEventListener("click", () => {
            // Vérifier qu'il y a une durée
            if(result.length){
                duree = (millisToMinutesAndSeconds(result.length)) + " minutes";

                function millisToMinutesAndSeconds(millis) {
                    let minutes = Math.floor(millis / 60000);
                    let seconds = ((millis % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }

            // Vérifier qu'il y a un titre
            if(result.title){
                titre = result.title;
            }

            // Vérifier qu'il y a un artiste
            if(result["artist-credit"]){
                    artiste = forArtistName();
                    
                function forArtistName () {
                    let artisteName = '';
                    for (var i = 0; i < result["artist-credit"].length; i++) {
                        artisteName += result["artist-credit"][i].name + " feat ";
                    }
                    let lastCharacter = artisteName.slice(-5, -1);
                    if(lastCharacter == "feat"){
                        artisteName = artisteName.slice(0, -6);
                    }
                    return artisteName;
                }
            }

            // Vérifier qu'il y a des albums
            if(result.releases){
                album = forReleaseName();
                    
                function forReleaseName () {
                    let releaseName = '';
                    for (var i = 0; i < result.releases.length; i++) {
                        releaseName += result.releases[i].title + " &";
                    }
                    let lastCharacter = releaseName.slice(-1);
                    if(lastCharacter == "&"){
                        releaseName = releaseName.slice(0, -2);
                    }
                    return releaseName;
                }
            }

            // Vérifier qu'il y a des genres
            if(result.tags){
                tag = forTags();
                    
                function forTags () {
                    let tagsName = '';
                    for (var i = 0; i < result.tags.length; i++) {
                        tagsName += result.tags[i].name + " -";
                    }
                    let lastCharacter = tagsName.slice(-1);
                    if(lastCharacter == "-"){
                        tagsName = tagsName.slice(0, -2);
                    }
                    return tagsName;
                }
            }


            // APPEL DE LA FONCTION MODALRESULT AVEC COMME PARAMETRES, CHAQUE ELEMENTS CREES
            modalResult(duree, titre, artiste, album, tag = "");


            // RECUPERER TOUS LES ID DES ALBUMS QU'ON PASSE EN PARAMETRE DE APIGETCOVER QUI APPELLE LES COVERS
            function idReleases () {
                let idReleases = '';
                for (var i = 0; i < result.releases.length; i++) {
                    idReleases = result.releases[i].id;
                }
                return idReleases;
            }
            apiGetCover(idReleases());
        });



        /// EVENEMENTS A LA FERMTURE DE LA MODALE : SUPPRESSION
        modalFade.addEventListener('hidden.bs.modal', function () {
            modalBody.textContent = null;
        });


        
        // MODAL FOOTER
        let modalFooter = document.createElement("div");
            modalFooter.className = "modal-footer";
        modalContent.appendChild(modalFooter);

        let modalBtnClose = document.createElement("button");
            modalBtnClose.className = "btn btn-secondary";
            modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
            modalBtnClose.setAttribute('type', 'button');
            modalBtnClose.textContent = 'CLOSE';
        modalFooter.appendChild(modalBtnClose);


        trBody.appendChild(tdButton);

        CONTAINER_BODY.appendChild(trBody);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
    }
}



function releaseResult(result, response) {
    let countResponse = response.count;
    apiGetReleaseRecord(result.id, countResponse);
}



// RESULTAT ALBUM 
function resultAlbumTitle(idRelease, response, countResponse){

    if (idRelease) {
        NB_RESULT_LINE += 1;

        // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
        if (!FIRST_TIME){
            let resultSentence = document.createElement("p");
                resultSentence.className = "result-sentence";
                resultSentence.textContent = countResponse + " résultat(s) pour la recherche : " + INPUT_VALUE.value;
            
            RESULT_SENTENCE.appendChild(resultSentence);

            FIRST_TIME = true;
        }

        /// Création du tr du tableau pour chaque résultat
        let trBody = document.createElement("tr");


        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("td");
            nbLine.textContent = NB_RESULT_LINE;
        trBody.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(idRelease["artist-credit"]){
            let artistName = document.createElement("td");        
                artistName.textContent = forRecordingName();
            trBody.appendChild(artistName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < idRelease["artist-credit"].length; i++) {
                    if(idRelease["artist-credit"].length>1){
                        recordingName += idRelease["artist-credit"][i].name + " feat ";
                    } else {
                        recordingName += idRelease["artist-credit"][i].name;
                    }
                }
                // Ne pas afficher le dernier "feat" s'il y a plus de 2 artistes
                let lastCharacter = recordingName.slice(-5, -1);
                if(lastCharacter == "feat"){
                    recordingName = recordingName.slice(0, -6);
                }
                return recordingName;
            }
        } else {
            let artistName = document.createElement("td");        
                artistName.textContent = " - ";
            trBody.appendChild(artistName);
        }


        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        // if(idRelease.title){
        if(idRelease){
            let recordTitle = document.createElement("td");
                recordTitle.textContent = idRelease.title;
            trBody.appendChild(recordTitle);
        }


        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(idRelease.title){
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = forReleaseTitle();
            trBody.appendChild(releaseTitle);

            // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
            function forReleaseTitle () {
                let releaseTitle = '';
                for (var i = 0; i < idRelease.releases.length; i++) {
                    if(idRelease.releases.length>1){
                        releaseTitle += " " + idRelease.releases[i].title + " &";
                    } else {
                        releaseTitle += idRelease.releases[i].title;
                    }
                }
                // Ne pas afficher le dernier "&" s'il y a plus de 2 albums
                let lastCharacter = releaseTitle.slice(-1);
                if(lastCharacter == "&"){
                    releaseTitle = releaseTitle.slice(0, -2);
                }
                return releaseTitle;
            }
        } else {
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = " - ";
            trBody.appendChild(releaseTitle);
        }


        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let tdButton = document.createElement("td");

        let btnInfo = document.createElement("button");
        if (idRelease){
            btnInfo.className = "btn";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', idRelease.id);
            let btnImg = document.createElement("img");
                btnImg.src = "../img/plus.svg";
                btnImg.className = "icon-plus";
                btnImg.setAttribute('alt', 'Icone pour plus d\'informations');
            btnInfo.appendChild(btnImg);
        } else {
            btnInfo.className = "btn";
            btnInfo.id = "btnCross";
            let btnImg = document.createElement("img");
                btnImg.src = "../img/cross.svg";
                btnImg.className = "icon-cross";
                btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
            btnInfo.appendChild(btnImg);
        }
        tdButton.appendChild(btnInfo);
                
        
        
        /// 4A - FENETRE MODAL
        // MODAL HEADER
        let modalFade = document.createElement("div");
            modalFade.className = "modal fade";
            modalFade.id = "exampleModal";
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('aria-labelledby', 'exampleModalLabel');
            modalFade.setAttribute('aria-hidden', 'true');
        BODY_CONTAINER.appendChild(modalFade);

        let modalDialog = document.createElement("div");
            modalDialog.className = "modal-dialog modal-lg";
        modalFade.appendChild(modalDialog);

        let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
        modalContent.appendChild(modalHeader);

        let modalTitle = document.createElement("h2");
            modalTitle.className = "modal-title";
            modalTitle.id = "exampleModalLabel";
            modalTitle.textContent = "INFORMATIONS";
        modalHeader.appendChild(modalTitle);

        let modalBtn = document.createElement("button");
            modalBtn.className = "btn-close";
            modalBtn.setAttribute('data-bs-dismiss', 'modal');
            modalBtn.setAttribute('aria-label', 'Close');
            modalBtn.setAttribute('type', 'button');
        modalHeader.appendChild(modalBtn);

        
        // MODAL BODY
        let modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.id = "resultModal";
        modalContent.appendChild(modalBody);

        
    /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES COVERS + AFFICHAGE DES MODALS
    btnInfo.addEventListener("click", () => {
        // Vérifier qu'il y a une durée
        if(idRelease.length){
            duree = (millisToMinutesAndSeconds(idRelease.length)) + " minutes";

            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        // Vérifier qu'il y a un titre
        if(idRelease.title){
            titre = idRelease.title;
        }

        // Vérifier qu'il y a un artiste
        if(idRelease["artist-credit"]){
            artiste = forArtistName();
                
            function forArtistName () {
                let artisteName = '';
                for (var i = 0; i < idRelease["artist-credit"].length; i++) {
                    artisteName += idRelease["artist-credit"][i].name + " feat ";
                }
                let lastCharacter = artisteName.slice(-5, -1);
                if(lastCharacter == "feat"){
                    artisteName = artisteName.slice(0, -6);
                }
                return artisteName;
            }
        }

        // Vérifier qu'il y a des albums
        if(idRelease){
                    // GERER QUAND IL Y A QU'UN SEUL ALBUM
            //album = forReleaseName();
            album = idRelease.releases[0].title;
                
            function forReleaseName () {
                let releaseName = '';
                for (var i = 0; i < idRelease.length; i++) {
                    releaseName += idRelease.releases[i].title + " &";
                }
                let lastCharacter = releaseName.slice(-1);
                if(lastCharacter == "&"){
                    releaseName = releaseName.slice(0, -2);
                }
                return releaseName;
            }
        }

        // Vérifier qu'il y a des genres
        if(idRelease.tags){
            tag = forTags();
                
            function forTags () {
                let tagsName = '';
                    for (var i = 0; i < idRelease.tags.length; i++) {
                        tagsName += idRelease.tags[i].name + " -";
                    }
                    let lastCharacter = tagsName.slice(-1);
                    if(lastCharacter == "-"){
                        tagsName = tagsName.slice(0, -2);
                    }
                    return tagsName;
            }
        }

        // APPEL DE LA FONCTION MODALRESULT AVEC COMME PARAMETRES, CHAQUE ELEMENTS CREES
        modalResult(duree, titre, artiste, album, tag = "");


        // RECUPERER TOUS LES ID DES ALBUMS QU'ON PASSE EN PARAMETRE DE APIGETCOVER QUI APPELLE LES COVERS
        function idReleases () {
            let idReleases = '';
            for (var i = 0; i < idRelease.releases.length; i++) {
                idReleases = idRelease.releases[i].id;
            }
            return idReleases;
        }
        apiGetCover(idReleases ());
    });



    /// EVENEMENTS A LA FERMTURE DE LA MODALE : SUPPRESSION
    modalFade.addEventListener('hidden.bs.modal', function () {
        modalBody.textContent = null;
    });


    
    // MODAL FOOTER
    let modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
    modalContent.appendChild(modalFooter);

    let modalBtnClose = document.createElement("button");
        modalBtnClose.className = "btn btn-secondary";
        modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
        modalBtnClose.setAttribute('type', 'button');
        modalBtnClose.textContent = 'CLOSE';
    modalFooter.appendChild(modalBtnClose);
        
    
    trBody.appendChild(tdButton);

    CONTAINER_BODY.appendChild(trBody);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
    }
}







// fonction affichage pour tous les resultats
function apiResultAll(result, response){
    if (result) {
        NB_RESULT_LINE += 1;
        
        // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
        if (!FIRST_TIME){
            let resultSentence = document.createElement("p");
                resultSentence.className = "result-sentence";
                resultSentence.textContent = response.count + " résultat(s) pour la recherche : " + INPUT_VALUE.value;
            
            RESULT_SENTENCE.appendChild(resultSentence);

            FIRST_TIME = true;
        }

        /// Création du tr du tableau pour chaque résultat
        let trBody = document.createElement("tr");


        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("td");
            nbLine.textContent = NB_RESULT_LINE;
        trBody.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(result["artist-credit"]){
            let artistName = document.createElement("td");        
                artistName.textContent = forRecordingName();
            trBody.appendChild(artistName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < result["artist-credit"].length; i++) {
                    if(result["artist-credit"].length>1){
                        recordingName += result["artist-credit"][i].name + " feat ";
                    } else {
                        recordingName += result["artist-credit"][i].name;
                    }
                }
                // Ne pas afficher le dernier "feat" s'il y a plus de 2 artistes
                let lastCharacter = recordingName.slice(-5, -1);
                if(lastCharacter == "feat"){
                    recordingName = recordingName.slice(0, -6);
                }
                return recordingName;
            }
        } else {
            let artistName = document.createElement("td");        
                artistName.textContent = " - ";
            trBody.appendChild(artistName);
        }


        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        if(result.title){
            let recordTitle = document.createElement("td");
                recordTitle.textContent = result.title;
            trBody.appendChild(recordTitle);
        } else {
            let recordTitle = document.createElement("td");
                recordTitle.textContent = " - ";
            trBody.appendChild(recordTitle);
        }


        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(result.releases){
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = forReleaseTitle();
            trBody.appendChild(releaseTitle);
            
            // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
            function forReleaseTitle () {
                let releaseTitle = '';
                for (var i = 0; i < result.releases.length; i++) {
                    if(result.releases.length>1){
                        releaseTitle += " " + result.releases[i].title + " &";
                    } else {
                        releaseTitle += result.releases[i].title;
                    }
                }
                // Ne pas afficher le dernier "&" s'il y a plus de 2 albums
                let lastCharacter = releaseTitle.slice(-1);
                if(lastCharacter == "&"){
                    releaseTitle = releaseTitle.slice(0, -2);
                }
                return releaseTitle;
            }
        } else {
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = " - ";
            trBody.appendChild(releaseTitle);
        }


        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let tdButton = document.createElement("td");

        let btnInfo = document.createElement("button");
        if(result.releases){
            btnInfo.className = "btn";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', result.releases[0].id);
            let btnImg = document.createElement("img");
                btnImg.src = "../img/plus.svg";
                btnImg.className = "icon-plus";
                btnImg.setAttribute('alt', 'Icone pour plus d\'informations');
            btnInfo.appendChild(btnImg);
        } else {
            btnInfo.className = "btn";
            btnInfo.id = "btnCross";
            let btnImg = document.createElement("img");
                btnImg.src = "../img/cross.svg";
                btnImg.className = "icon-cross";
                btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
            btnInfo.appendChild(btnImg);
        }
        tdButton.appendChild(btnInfo);
        

        /// 4A - FENETRE MODAL
        // MODAL HEADER
        let modalFade = document.createElement("div");
            modalFade.className = "modal fade";
            modalFade.id = "exampleModal";
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('aria-labelledby', 'exampleModalLabel');
            modalFade.setAttribute('aria-hidden', 'true');
        BODY_CONTAINER.appendChild(modalFade);

        let modalDialog = document.createElement("div");
            modalDialog.className = "modal-dialog modal-lg";
        modalFade.appendChild(modalDialog);

        let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
        modalContent.appendChild(modalHeader);

        let modalTitle = document.createElement("h2");
            modalTitle.className = "modal-title";
            modalTitle.id = "exampleModalLabel";
            modalTitle.textContent = "INFORMATIONS";
        modalHeader.appendChild(modalTitle);

        let modalBtn = document.createElement("button");
            modalBtn.className = "btn-close";
            modalBtn.setAttribute('data-bs-dismiss', 'modal');
            modalBtn.setAttribute('aria-label', 'Close');
            modalBtn.setAttribute('type', 'button');
        modalHeader.appendChild(modalBtn);


        // MODAL BODY
        let modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.id = "resultModal";
        modalContent.appendChild(modalBody);


        /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES INFOS DE LA MODAL + AFFICHAGE DES COVERS
        btnInfo.addEventListener("click", () => {
            // Vérifier qu'il y a une durée
            if(result.length){
                duree = (millisToMinutesAndSeconds(result.length)) + " minutes";

                function millisToMinutesAndSeconds(millis) {
                    let minutes = Math.floor(millis / 60000);
                    let seconds = ((millis % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }

            // Vérifier qu'il y a un titre
            if(result.title){
                titre = result.title;
            }

            // Vérifier qu'il y a un artiste
            if(result["artist-credit"]){
                    artiste = forArtistName();
                    
                function forArtistName () {
                    let artisteName = '';
                    for (var i = 0; i < result["artist-credit"].length; i++) {
                        artisteName += result["artist-credit"][i].name + " feat ";
                    }
                    let lastCharacter = artisteName.slice(-5, -1);
                    if(lastCharacter == "feat"){
                        artisteName = artisteName.slice(0, -6);
                    }
                    return artisteName;
                }
            }

            // Vérifier qu'il y a des albums
            if(result.releases){
                album = forReleaseName();
                    
                function forReleaseName () {
                    let releaseName = '';
                    for (var i = 0; i < result.releases.length; i++) {
                        releaseName += result.releases[i].title + " &";
                    }
                    let lastCharacter = releaseName.slice(-1);
                    if(lastCharacter == "&"){
                        releaseName = releaseName.slice(0, -2);
                    }
                    return releaseName;
                }
            }

            // Vérifier qu'il y a des genres
            if(result.tags){
                tag = forTags();
                    
                function forTags () {
                    let tagsName = '';
                    for (var i = 0; i < result.tags.length; i++) {
                        tagsName += result.tags[i].name + " -";
                    }
                    let lastCharacter = tagsName.slice(-1);
                    if(lastCharacter == "-"){
                        tagsName = tagsName.slice(0, -2);
                    }
                    return tagsName;
                }
            }


            // APPEL DE LA FONCTION MODALRESULT AVEC COMME PARAMETRES, CHAQUE ELEMENTS CREES
            modalResult(duree, titre, artiste, album, tag = "");


            // RECUPERER TOUS LES ID DES ALBUMS QU'ON PASSE EN PARAMETRE DE APIGETCOVER QUI APPELLE LES COVERS
            function idReleases () {
                let idReleases = '';
                for (var i = 0; i < result.releases.length; i++) {
                    idReleases = result.releases[i].id;
                }
                return idReleases;
            }
            apiGetCover(idReleases());
        });



        /// EVENEMENTS A LA FERMTURE DE LA MODALE : SUPPRESSION
        modalFade.addEventListener('hidden.bs.modal', function () {
            modalBody.textContent = null;
        });


        
        // MODAL FOOTER
        let modalFooter = document.createElement("div");
            modalFooter.className = "modal-footer";
        modalContent.appendChild(modalFooter);

        let modalBtnClose = document.createElement("button");
            modalBtnClose.className = "btn btn-secondary";
            modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
            modalBtnClose.setAttribute('type', 'button');
            modalBtnClose.textContent = 'CLOSE';
        modalFooter.appendChild(modalBtnClose);


        trBody.appendChild(tdButton);

        CONTAINER_BODY.appendChild(trBody);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
    }
}





/// AFFICHAGE DES INFORMATIONS DANS LA MODAL
function modalResult(duree, titre, artiste, album, tag){
    const resultModal = document.querySelector("#resultModal");

    let modalDuree = document.createElement("p");
    let spanDuree = document.createElement("span");
        spanDuree.textContent = "Durée : ";
        modalDuree.textContent = duree;
        modalDuree.className = "modal-duree";
    modalDuree.prepend(spanDuree);
    let modalTitre = document.createElement("p");
    let spanTitre = document.createElement("span");
        spanTitre.textContent = "Titre : ";
        modalTitre.textContent = titre;
        modalTitre.className = "modal-titre";
    modalTitre.prepend(spanTitre);
    let modalArtiste = document.createElement("p");
    let spanArtiste = document.createElement("span");
        spanArtiste.textContent = "Artiste : ";
        modalArtiste.textContent = artiste;
        modalArtiste.className = "modal-artiste";
    modalArtiste.prepend(spanArtiste);
    let modalAlbum = document.createElement("p");
    let spanAlbum = document.createElement("span");
        spanAlbum.textContent = "Album : ";
        modalAlbum.textContent = album;
        modalAlbum.className = "modal-album";
    modalAlbum.prepend(spanAlbum);
    let modalTag = document.createElement("p");
    let spanTag = document.createElement("span");
        spanTag.textContent = "Genre : ";
        modalTag.textContent = tag;
        modalTag.className = "modal-tag";
    modalTag.prepend(spanTag);

    resultModal.appendChild(modalArtiste);
    resultModal.appendChild(modalTitre);
    resultModal.appendChild(modalAlbum);
    resultModal.appendChild(modalDuree);
    //resultModal.appendChild(modalTag);
}




// AFFICHAGE DES COVERS DANS LA MODAL
function coverResult(idRelease){
    const resultModal = document.querySelector("#resultModal");

    let imgCover = document.createElement("img");
        imgCover.className = "imgCoverId";
        imgCover.setAttribute('src', idRelease.thumbnails.large);

    resultModal.appendChild(imgCover);
}




/// RAPPEL DE LA FONCTION AVEC UN OFFSET DIFFERENT
// AJOUT DES BOUTONS
let countOffset = 0;
BTN_ARTIST.addEventListener("click", () => {
    countOffset++;
    apiGetArtist(INPUT_VALUE.value);
});
BTN_RECORD.addEventListener("click", () => {
    countOffset++;
    apiGetRecord(INPUT_VALUE.value);
});
BTN_RELEASE.addEventListener("click", () => {
    countOffset++;
    apiGetRelease(INPUT_VALUE.value);
});
// BTN_ALL.addEventListener("click", () => {
//     (INPUT_VALUE.value);
//     countOffset++;
// });