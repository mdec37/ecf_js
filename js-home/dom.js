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




function apiResultRecording(result, response) {
    if (result) {
        countResponse += 1;
        // var resultTitle = result.title;
        // if (resultTitle.includes(artistName.value) ) {
            console.log(result);
            console.log(response);

        //console.log(resultTitle.includes(artistName.value));
        // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
        if (!premiereFois){
            // Création de l'article (container)
            let myRecord = document.createElement("article");

            let recherche = document.createElement("span");
            recherche.textContent = "Résultat de la recherche pour : ";
            myRecord.appendChild(recherche);

            // Création du nom de l'artiste et attribution
            let newArtisteName = document.createElement("span");
            newArtisteName.textContent = " nom du titre : " + artistName.value + " - ";
            myRecord.appendChild(newArtisteName);

            // // Création du nombre de recherche
            let newArtisteNombre = document.createElement("span");
            newArtisteNombre.textContent = " nombre de résultat : " + response.count;
            myRecord.appendChild(newArtisteNombre);

            // Ici j'intègre l'article à l'espace principal
            resultsZone.appendChild(myRecord);

            premiereFois = true;
        // }
        }

        /// Création de l'article (container) pour chaque résultat
        let myRecording = document.createElement("article");



        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("span");
        nbLine.textContent =  " Ligne : " + countResponse + " - ";

        myRecording.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(result["artist-credit"]){
            let artisteName = document.createElement("span");        
            artisteName.textContent =  " ARTISTE : " + forRecordingName() + " ";
            myRecording.appendChild(artisteName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < result["artist-credit"].length; i++) {
                    recordingName += result["artist-credit"][i].name + " + ";
                }
                return recordingName;
            }
        }



        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        if(result.title){
            let recordName = document.createElement("span");
            recordName.textContent = " TITRE : " + result.title + " ";
            recordName.id = result.id;
            myRecording.appendChild(recordName);
        }



        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(result.releases){
            let releaseName = document.createElement("span");
            releaseName.textContent =  " ALBUM : " + forReleaseTitle() + " ";
            myRecording.appendChild(releaseName);
            
            // FONCTION BOUCLE D'AFFICHAGE DES ALBUMS
            function forReleaseTitle () {
                let releaseTitle = '';
                for (var i = 0; i < result.releases.length; i++) {
                    releaseTitle += result.releases[i].title + " + ";
                }
                return releaseTitle;
            }
        }


        /// 4- AFFICHER LE BOUTON DE LA MODAL
        let btnInfo = document.createElement("button");
        if (result.releases){
            btnInfo.textContent = "PLUS";
            btnInfo.className = "btn btn-primary";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', result.releases[0].id);
        } else {
            btnInfo.textContent = "X";
            btnInfo.className = "btn btn-primary";
            btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
        }
        



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
            
        });



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

            apiModal(duree, titre, artiste, album, tag = "");


            // Récupérer tous les id des albums qu'on passe en paramètres de APIGETCOVER qui appel les cover
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


    myRecording.appendChild(btnInfo);

    resultsZone.appendChild(myRecording);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}



function apiResultRelease(result, response) {
    if (result) {
        countResponse += 1;
            console.log(result);
            console.log(response);

        // RESULTAT DE LA RECHERCHE A AFFICHER QU'UNE SEULE FOIS
        if (!premiereFois){
            // Création de l'article (container)
            let myRecord = document.createElement("article");

            let recherche = document.createElement("span");
            recherche.textContent = "Résultat de la recherche pour : ";
            myRecord.appendChild(recherche);

            // Création du nom de l'artiste et attribution
            let newAlbumName = document.createElement("span");
            newAlbumName.textContent = " nom de l'album : " + artistName.value + " - ";
            myRecord.appendChild(newAlbumName);

            // // Création du nombre de recherche
            let newAlbumNombre = document.createElement("span");
            newAlbumNombre.textContent = " nombre de résultat : " + response.count;
            myRecord.appendChild(newAlbumNombre);

            // Ici j'intègre l'article à l'espace principal
            resultsZone.appendChild(myRecord);

            premiereFois = true;
        // }
        }

        /// Création de l'article (container) pour chaque résultat
        let myRecording = document.createElement("article");



        /// 0 - AFFICHER LE NUMERO DE LA LIGNE
        let nbLine = document.createElement("span");
        nbLine.textContent =  " Ligne : " + countResponse + " - ";

        myRecording.appendChild(nbLine);



        /// 1 - AFFICHER LES ARTISTES
        // Vérifier qu'il y a un ou des artistes
        if(result["artist-credit"]){
            let artisteName = document.createElement("span");        
            artisteName.textContent =  " ARTISTE : " + forRecordingName() + " ";
            myRecording.appendChild(artisteName);

            // FONCTION BOUCLE D'AFFICHAGE DES ARTISTES
            function forRecordingName () {
                let recordingName = '';
                for (var i = 0; i < result["artist-credit"].length; i++) {
                    recordingName += result["artist-credit"][i].name + " + ";
                }
                return recordingName;
            }
        }



        /// 2 - AFFICHER LE TITRE 
        // Vérifier qu'il y a un titre
        // if(result.title){
        //     let recordName = document.createElement("span");
        //     recordName.textContent = " TITRE : " + result.title + " ";
        //     recordName.id = result.id;
        //     myRecording.appendChild(recordName);
        // }



        /// 3- AFFICHER LES ALBUMS
        // Vérifier qu'il y a des albums
        if(result.title){
            let releaseName = document.createElement("span");
            releaseName.textContent =  " ALBUM : " + result.title + " ";
            myRecording.appendChild(releaseName);
            
        }


                /// 4- AFFICHER LE BOUTON DE LA MODAL
                let btnInfo = document.createElement("button");
                if (result){
                    btnInfo.textContent = "PLUS";
                    btnInfo.className = "btn btn-primary";
                    btnInfo.id = "btnPlus";
                    btnInfo.setAttribute('data-bs-toggle', 'modal');
                    btnInfo.setAttribute('data-bs-target', '#exampleModal');
                    btnInfo.setAttribute('dataId', result.id);
                } else {
                    btnInfo.textContent = "X";
                    btnInfo.className = "btn btn-primary";
                    btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
                }
                
        
        
        
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
                    
                });
        
        
        
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
        
                    apiModal(duree = "",titre = "", artiste, album, tag = "");
        
        
                    // Récupérer tous les id des albums qu'on passe en paramètres de APIGETCOVER qui appel les cover
                    
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
        
        
            myRecording.appendChild(btnInfo);
        
            resultsZone.appendChild(myRecording);

    } else {
        resultsZone.textContent = "Il faut saisir quelque chose";
        console.log("Error : 1 ");
    }
}









// INITIALISATION DES VARIABLES AVANT DE BOUCLER
let countResponse = 0;
let premiereFois = false;


// AFFICHAGE DES RESULTATS / LISTE DES RESULTATS / MODALE
function apiResultRecords(idArtist, response) {
    countResponse += 1;

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
        newArtisteName.textContent = " nom de l'artiste : " + artistName.value + " - ";
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
        nbLine.textContent =  " Ligne : " + countResponse + " - ";
        
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
            recordName.id = idArtist.id;
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
        if (idArtist.releases){
            btnInfo.textContent = "PLUS";
            btnInfo.className = "btn btn-primary";
            btnInfo.id = "btnPlus";
            btnInfo.setAttribute('data-bs-toggle', 'modal');
            btnInfo.setAttribute('data-bs-target', '#exampleModal');
            btnInfo.setAttribute('dataId', idArtist.releases[0].id);
        } else {
            btnInfo.textContent = "X";
            btnInfo.className = "btn btn-primary";
            btnInfo.setAttribute('title', 'Pas d\'informations supplémentaires');
        }
        



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
            
        });



        /// EVENEMENTS AU CLIC DU BOUTON : AFFICHAGE DES COVERS + AFFICHAGE DES MODALS
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

            apiModal(duree, titre, artiste, album, tag = "");


            // Récupérer tous les id des albums qu'on passe en paramètres de APIGETCOVER qui appel les cover
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


    myRecording.appendChild(btnInfo);

    resultsZone.appendChild(myRecording);
}




///£ AJOUT DES BOUTONS POUR LES AUTRES RESULTATS
let countOffset = 0;
let btnTestArtist = document.querySelector("#testArtist");
let btnTestRecord = document.querySelector("#testRecord");
let btnTestRelease = document.querySelector("#testReleases");
let btnTestAll = document.querySelector("#testAll");

btnTestArtist.addEventListener("click", () => {
    
    countOffset++;
    apiGetArtist(artistName.value);
});
btnTestRecord.addEventListener("click", () => {
    countOffset++;
    apiGetRecord(artistName.value);
});
btnTestRelease.addEventListener("click", () => {
    countOffset++;
    apiGetRelease(artistName.value);
});
// btnTestAll.addEventListener("click", () => {
//     apiGetArtist(artistName.value);
//     countOffset++;
// });

//Si le count est sup au nombre de résultat, arrêter l'affichage + bouton plus d'insponible
// limiter le offset / titre que l'on veut afficher



function apiModal(duree, titre, artiste, album, tag){
    const resultModal = document.querySelector("#resultModal");


    let myModal = document.createElement("p");
    //console.log(" + " + duree + " + " + titre + " + " + artiste + " + " + album + " + " + tag);

    myModal.textContent = duree + " + " + titre + " + " + artiste + " + " + album + " + " + tag;

    myModal.className = "myModal";

    resultModal.appendChild(myModal);

}




function apiCover(idRelease){
    // Constante pour recuperer le body de la modal
    const resultModal = document.querySelector("#resultModal");

    // Création de l'article (container)
    // let myRelease = document.createElement("article");
    //     myRelease.className = "myRelease";


    // Affichages image
    let newReleaseCover = document.createElement("img");
        newReleaseCover.className = "myRecordId";
        newReleaseCover.setAttribute('src', idRelease.thumbnails.small);
    // myRelease.appendChild(newReleaseCover);


    resultModal.appendChild(newReleaseCover);
}