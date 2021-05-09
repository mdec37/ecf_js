/// APPEL DE LA FUNCTION APIGETARTISTETITRE A L'AIDE DE L'ID DE L'ARTITSTE QU'ON VIENT DE RECUPERER
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
            resultSentence.textContent = response.count + " résultat(s) pour la recherche : " + idArtist["artist-credit"][0].name;
        
        CONTAINER_RESPONSE.appendChild(resultSentence);


        /// Création du tableau
        let tr = document.createElement("tr");
        let thNumber = document.createElement("th");
            thNumber.className = "number";
            thNumber.textContent = "#";
        tr.appendChild(thNumber);
        let thArtist = document.createElement("th");
            thArtist.className = "artist";
            thArtist.textContent = "Artiste";
        tr.appendChild(thArtist);
        let thTitle = document.createElement("th");
            thTitle.className = "title";
            thTitle.textContent = "Titre";
        tr.appendChild(thTitle);
        let thAlbum = document.createElement("th");
            thAlbum.className = "album";
            thAlbum.textContent = "Album";
        tr.appendChild(thAlbum);
        let thActions = document.createElement("th");
            thActions.className = "actions";
            thActions.textContent = "Info";
        tr.appendChild(thActions);
        THEAD.appendChild(tr);
        TABLE.appendChild(THEAD);

        TABLE.appendChild(TBODY);
        CONTAINER_RESPONSE.appendChild(TABLE);


        FIRST_TIME = true;
    }



    /// Création du container pour chaque résultat
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
    }



    /// 2 - AFFICHER LE TITRE 
    // Vérifier qu'il y a un titre
    if(idArtist.title){
        let recordTitle = document.createElement("td");
            recordTitle.textContent = idArtist.title;
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
    } else {
        btnInfo.textContent = "X";
        btnInfo.className = "btn btn-primary";
        btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
    }

    let btnImg = document.createElement("img");
        btnImg.src = "../img/plus.svg";
        btnImg.className = "icon-plus";
        btnImg.setAttribute('alt', 'Icone pour plus d\'informations');
    btnInfo.appendChild(btnImg);
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

    TBODY.appendChild(trBody);
}



/// RAPPEL DE LA FONCTION AVEC UN OFFSET DIFFERENT
let countOffset = 0;
BTN_TEST.addEventListener("click", () => {
    apiGetArtist(INPUT_VALUE.value);
    countOffset++;
});



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