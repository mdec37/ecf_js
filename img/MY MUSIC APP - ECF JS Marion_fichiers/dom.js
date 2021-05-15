/// APPEL DE LA FUNCTION apiGetTitle A L'AIDE DE L'ID DE L'ARTITSTE QU'ON VIENT DE RECUPERER DANS L'INPUT
function artistResult(artist, response) {
    if (artist) {
        if (artist.score === 100 ) {
            console.log(artist);
            console.log(response);

            apiGetTitle(artist.id);
        }
    } else {
        CONTAINER_RESPONSE.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}



// INITIALISATION DES VARIABLES AVANT DE BOUCLER
let NB_RESULT_LINE = 0;
let FIRST_TIME = false;


/// AFFICHAGE DES RESULTATS / LISTE DES RESULTATS / MODALE
function titleResult(idArtist, response) {
    NB_RESULT_LINE += 1;

    console.log(idArtist, response);

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
        modalTitle.textContent = "Fenetre Modal";
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
            duree = "duréee : " + (millisToMinutesAndSeconds(idArtist.length)) + " minutes";

            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        // Vérifier qu'il y a un titre
        if(idArtist.title){
            titre = "title : " + idArtist.title;
        }

        // Vérifier qu'il y a un artiste
        if(idArtist["artist-credit"]){
            artiste =  " nom artiste : " + forArtistName() + " ";
                
            function forArtistName () {
                let artisteName = '';
                for (var i = 0; i < idArtist["artist-credit"].length; i++) {
                    artisteName += idArtist["artist-credit"][i].name + " + ";
                }
                return artisteName;
            }
        }

        // Vérifier qu'il y a des albums
        if(idArtist.releases){
            album = " nom album : " + forReleaseName() + " ";
                
            function forReleaseName () {
                let releaseName = '';
                for (var i = 0; i < idArtist.releases.length; i++) {
                    releaseName += idArtist.releases[i].title + " + ";
                }
                return releaseName;
            }
        }

        // Vérifier qu'il y a des genres
        if(idArtist.tags){
            tag = " genre : " + forTags() + " ";
                
            function forTags () {
                let tagsName = '';
                for (var i = 0; i < idArtist.tags.length; i++) {
                    tagsName += idArtist.tags[i].name + " + ";
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
        modalBtnClose.textContent = 'Close';
    modalFooter.appendChild(modalBtnClose);


    trBody.appendChild(tdButton);

    CONTAINER_BODY.appendChild(trBody);
}



function apiResultRecording(result, response) {
    if (result) {
        NB_RESULT_LINE += 1;
        
        console.log(result, response);

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
            modalTitle.textContent = "Fenetre Modal";
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
                duree = "duréee : " + (millisToMinutesAndSeconds(result.length)) + " minutes";

                function millisToMinutesAndSeconds(millis) {
                    let minutes = Math.floor(millis / 60000);
                    let seconds = ((millis % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }

            // Vérifier qu'il y a un titre
            if(result.title){
                titre = "title : " + result.title;
            }

            // Vérifier qu'il y a un artiste
            if(result["artist-credit"]){
                    artiste = " nom artiste : " + forArtistName() + " ";
                    
                function forArtistName () {
                    let artisteName = '';
                    for (var i = 0; i < result["artist-credit"].length; i++) {
                        artisteName += result["artist-credit"][i].name + " + ";
                    }
                    return artisteName;
                }
            }

            // Vérifier qu'il y a des albums
            if(result.releases){
                album = " nom album : " + forReleaseName() + " ";
                    
                function forReleaseName () {
                    let releaseName = '';
                    for (var i = 0; i < result.releases.length; i++) {
                        releaseName += result.releases[i].title + " + ";
                    }
                    return releaseName;
                }
            }

            // Vérifier qu'il y a des genres
            if(result.tags){
                tag = " genre : " + forTags() + " ";
                    
                function forTags () {
                    let tagsName = '';
                    for (var i = 0; i < result.tags.length; i++) {
                        tagsName += result.tags[i].name + " + ";
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
            modalBtnClose.textContent = 'Close';
        modalFooter.appendChild(modalBtnClose);


        trBody.appendChild(tdButton);

        CONTAINER_BODY.appendChild(trBody);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}



function apiResultRelease(result, response) {
    if (result) {
        NB_RESULT_LINE += 1;
        
        console.log(result, response);

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
        // if(result.title){
        if(result){
            let recordTitle = document.createElement("td");
                // recordTitle.textContent = result.title;
                recordTitle.textContent = " - ";
            trBody.appendChild(recordTitle);
        }


        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(result.title){
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = result.title;
            trBody.appendChild(releaseTitle);
        } else {
            let releaseTitle = document.createElement("td");
                releaseTitle.textContent = " - ";
            trBody.appendChild(releaseTitle);
        }


        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let tdButton = document.createElement("td");

        let btnInfo = document.createElement("button");
        if (result){
            btnInfo.className = "btn";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', result.id);
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
            modalTitle.textContent = "Fenetre Modal";
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
        if(result.length){
            duree = "duréee : " + (millisToMinutesAndSeconds(result.length)) + " minutes";

            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        }

        // Vérifier qu'il y a un titre
        if(result.title){
            titre = "title : " + result.title;
        }

        // Vérifier qu'il y a un artiste
        if(result["artist-credit"]){
            artiste =  " nom artiste : " + forArtistName() + " ";
                
            function forArtistName () {
                let artisteName = '';
                for (var i = 0; i < result["artist-credit"].length; i++) {
                    artisteName += result["artist-credit"][i].name + " + ";
                }
                return artisteName;
            }
        }

        // Vérifier qu'il y a des albums
        if(result){
            album = " nom album : " + result.title + " ";
            
        }

        // Vérifier qu'il y a des genres
        if(result.tags){
            tag = " genre : " + forTags() + " ";
                
            function forTags () {
                let tagsName = '';
                for (var i = 0; i < result.tags.length; i++) {
                    tagsName += result.tags[i].name + " + ";
                }
                return tagsName;
            }
        }

        // APPEL DE LA FONCTION MODALRESULT AVEC COMME PARAMETRES, CHAQUE ELEMENTS CREES
        modalResult(duree = "", titre = "", artiste, album, tag = "");


        // RECUPERER TOUS LES ID DES ALBUMS QU'ON PASSE EN PARAMETRE DE APIGETCOVER QUI APPELLE LES COVERS
        apiGetCover(result.id);
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
        modalBtnClose.textContent = 'Close';
    modalFooter.appendChild(modalBtnClose);
        
    
    trBody.appendChild(tdButton);

    CONTAINER_BODY.appendChild(trBody);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}




/// AFFICHAGE DES INFORMATIONS DANS LA MODAL
function modalResult(duree, titre, artiste, album, tag){
    const resultModal = document.querySelector("#resultModal");

    let myModal = document.createElement("p");
        myModal.textContent = duree + " + " + titre + " + " + artiste + " + " + album + " + " + tag;
        myModal.className = "myModal";

    resultModal.appendChild(myModal);
}




// AFFICHAGE DES COVERS DANS LA MODAL
function coverResult(idRelease){
    const resultModal = document.querySelector("#resultModal");

    let imgCover = document.createElement("img");
        imgCover.className = "imgCoverId";
        imgCover.setAttribute('src', idRelease.thumbnails.small);

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