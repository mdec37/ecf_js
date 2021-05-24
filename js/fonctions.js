// RAJOUTER TOUTES LES FONCTIONS QUI SE REPETTENT ?


function FCT_First_Time (count){
    if (!FIRST_TIME){
        let resultSentence = document.createElement("p");
            resultSentence.className = "result-sentence";
            resultSentence.textContent = count + " résultat(s) pour la recherche : " + INPUT_VALUE.value;
        
        RESULT_SENTENCE.appendChild(resultSentence);

        FIRST_TIME = true;
    }
}
