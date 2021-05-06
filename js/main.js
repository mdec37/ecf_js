const selectForm = document.querySelector("#search-select");
// const btnPlus = document.querySelector("#btnPlus");
//console.log(btnPlus);

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    resultsZone.textContent = " ";

    if (selectForm.value == "artiste") {
        apiGetArtist(artistName.value);

        apiResult(artistName.value);

        artistName.value = null;


    } else if (selectForm.value == "titre") {
        console.log("input sélectionné : titre");
    } else if (selectForm.value == "album") {
        console.log("input sélectionné : album");
    } else if (selectForm.value == "all") {
        console.log("input sélectionné : all");
    }
    
});

// btnPlus.addEventListener("click", (ev) => {
//     console.log("coucou");
//     apiGetCover(idRelease.releases[0].id);
// });

// AU CLIC APICOVER(IDRELEASE DE DATA ATTRIBUTES)



// const btnModal = document.querySelector("#search-select");

// searchForm.addEventListener("submit", (ev) => {
//     ev.preventDefault();

//     if (selectForm.value == "artiste") {
//         apiGetArtist(artistName.value);

//         apiResult(artistName.value);



//     } else if (selectForm.value == "titre") {
//         console.log("input sélectionné : titre");
//     } else if (selectForm.value == "album") {
//         console.log("input sélectionné : album");
//     } else if (selectForm.value == "all") {
//         console.log("input sélectionné : all");
//     }
    
// });



