const artistZone = document.querySelector("#results_container");
const searchForm = document.querySelector("#search_artist_form");
const inputSearch = document.querySelector("#inputSearch");
const resultsZone = document.querySelector("#results_container");
const artistName = document.querySelector("#artist");
const bodyContainer = document.body;


// APPEL DE LA FUNCTION APIGETARTISTETITRE A L'AIDE DE L'ID DE L'ARTITSTE QU'ON VIENT DE RECUPERER
function apiResult(result, response) {
    if (result) {
        if (result.score === 100 ) {
            console.log(result);
            console.log(response);

            // ATTENTION GERER LES ERREURS DE NOMS (FAUTES D'ORTHOGRAPHE) 
            // VOIR SI BONNE PRATIQUE DE RECUP L'ID ET LE NOM DE L'ARTISTE SI MAL ECRIS
            // VOIR RECHERCHE QUAND NOM COMPOSE (AVEC ESPACE) CE QUI EST RECHERCHE VRAIMENT

            apiGetArtistTitre(result.id);
    }
    
    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}



// INITIALISATION DES VARIABLES AVANT DE BOUCLER
let nbLineResult = 0;
let premiereFois = false;

// AFFICHAGE DES RESULTATS / LISTE DES RESULTATS / MODALE
function apiResultRecords(idArtist, response) {
    nbLineResult += 1;

    console.log(idArtist, response);

    
    // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
    if (!premiereFois){
            // Création de l'article (container)
            let myArtist = document.createElement("article");

            let recherche = document.createElement("span");
            recherche.textContent = "Résultat de la recherche pour : ";
            myArtist.appendChild(recherche);

            // Création du nom de l'artiste et attribution
            let newArtisteName = document.createElement("span");
            newArtisteName.textContent = " nom de l'artiste : " + idArtist["artist-credit"][0].name + " - ";
            myArtist.appendChild(newArtisteName);

            // // Création du nombre de recherche
            let newArtisteNombre = document.createElement("span");
            newArtisteNombre.textContent = " nombre de résultat : " + response.count;
            myArtist.appendChild(newArtisteNombre);

            // Ici j'intègre l'article à l'espace principal
            resultsZone.appendChild(myArtist);

        premiereFois = true;
    }




    /// Création de l'article (container) pour chaque résultat
        let myRecording = document.createElement("article");



        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("span");
        nbLine.textContent =  " Ligne : " + nbLineResult + " - ";
        
        myRecording.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(idArtist["artist-credit"]){
            let artisteName = document.createElement("span");        
            artisteName.textContent =  " ARTISTE : " + forRecordingName() + " ";
            myRecording.appendChild(artisteName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < idArtist["artist-credit"].length; i++) {
                    recordingName += idArtist["artist-credit"][i].name + " + ";
                }
                return recordingName;
            }
        }



        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        if(idArtist.title){
            let recordName = document.createElement("span");
            recordName.textContent = " TITRE : " + idArtist.title + " ";
            myRecording.appendChild(recordName);
        }
    


        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(idArtist.releases){
            let releaseName = document.createElement("span");
            releaseName.textContent =  " ALBUM : " + forReleaseTitle() + " ";
            myRecording.appendChild(releaseName);
            
            // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
            function forReleaseTitle () {
                let releaseTitle = '';
                for (var i = 0; i < idArtist.releases.length; i++) {
                    releaseTitle += idArtist.releases[i].title + " + ";
                }
                return releaseTitle;
            }
        }



        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let btnInfo = document.createElement("button");
        btnInfo.textContent = "PLUS";
        btnInfo.className = "btn btn-primary";
        btnInfo.id = "btnPlus";
        btnInfo.setAttribute('data-bs-toggle', 'modal');
        btnInfo.setAttribute('data-bs-target', '#exampleModal');
        btnInfo.setAttribute('dataId', idArtist.releases[0].id);



        /// 4A - FENETRE MODAL
        // MODAL HEADER
        let modalFade = document.createElement("div");
            modalFade.className = "modal fade";
            modalFade.id = "exampleModal";
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('aria-labelledby', 'exampleModalLabel');
            modalFade.setAttribute('aria-hidden', 'true');
        bodyContainer.appendChild(modalFade);

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



        /// EVENEMENTS A L'OUVERTURE DE LA MODAL : AFFICHAGE
        modalFade.addEventListener('shown.bs.modal', function () {
            modalBody.textContent = null;

            // Vérifier qu'il y a une durée
            if(idArtist.length){
                let lengthRecord = document.createElement("p");
                    lengthRecord.textContent = "duréee : " + (idArtist.length * 0.001 / 60) + ' minutes';
                modalBody.appendChild(lengthRecord);
            }

            // Vérifier qu'il y a un titre
            if(idArtist.title){
                let nameRecord = document.createElement("p");
                    nameRecord.textContent = "title : " + idArtist.title;
                modalBody.appendChild(nameRecord);
            }

            // Vérifier qu'il y a un artiste
            if(idArtist["artist-credit"]){
                let nameArtist = document.createElement("p");
                    // nameArtist.textContent = "nom artiste : " + idArtist["artist-credit"][0].name;
                    nameArtist.textContent =  " nom artiste : " + forArtistName() + " ";
                modalBody.appendChild(nameArtist);
                    
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
                let nameReleases = document.createElement("p");
                    //nameReleases.textContent = "nom album: " + idArtist.releases[0].title;
                    nameReleases.textContent =  " nom album : " + forReleaseName() + " ";
                modalBody.appendChild(nameReleases);
                    
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
                let tags = document.createElement("p");
                    //tags.textContent = "genre : " + idArtist.tags[0].name;
                    tags.textContent =  " genre : " + forTags() + " ";
                modalBody.appendChild(tags);
                    
                function forTags () {
                    let tagsName = '';
                    for (var i = 0; i < idArtist.tags.length; i++) {
                        tagsName += idArtist.tags[i].name + " + ";
                    }
                    return tagsName;
                }
            }
        });



        /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES COVERS
        btnInfo.addEventListener("click", () => {
            // Récupérer tous les id des albums qu'on passe en paramètres de APIGETCOVER qui appel les cover
            function idReleases () {
                let idReleases = '';
                for (var i = 0; i < idArtist.releases.length; i++) {
                    idReleases = idArtist.releases[i].id;
                }
                return idReleases;
            }
            //apiGetCover(idArtist.releases[0].id);
            apiGetCover(idReleases());
            

            // idTitre = dataId.target.attributes[4].nodeValue;
            // duree = idArtist.length;
            // METTRE TOUS LES ELEMENTS DANS LES PARAMETRES
            // apiModal(idArtist);
        });



        /// EVENEMENTS A LA FERMTURE DE LA MODALE : SUPPRESSION
        // modalFade.addEventListener('hidden.bs.modal', function () {
        //     modalBody.textContent = null;
        // });


        
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


    myRecording.appendChild(btnInfo);

    resultsZone.appendChild(myRecording);
}





// function apiModal(idArtist){
//     const resultModal = document.querySelector("#resultModal");


//     Création de l'article (container)
//     let myModal = document.createElement("article");
//     myModal.textContent = "id titre : " + idTitre + " + durée : " + duree + " mms + ";
//     myModal.className = "myModal";


// }




function apiCover(idRelease){
    // Constante pour recuperer le body de la modal
    const resultModal = document.querySelector("#resultModal");

    // Création de l'article (container)
    let myRelease = document.createElement("article");
        myRelease.className = "myRelease";


    // Affichages image
    let newReleaseCover = document.createElement("img");
        newReleaseCover.className = "myRecordId";
        newReleaseCover.setAttribute('src', idRelease.thumbnails.small);
    myRelease.appendChild(newReleaseCover);


    resultModal.appendChild(myRelease);
}