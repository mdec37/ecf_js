/// URL API
const MUSICBRAINZ_API_URL = "https://musicbrainz.org/ws/2/";
const COVERARCHIVE_API_URL = "https://coverartarchive.org/";

/// FORMULAIRE
const BODY_CONTAINER = document.body;
const SEARCH_FORM = document.querySelector("#form");
const INPUT_VALUE = document.querySelector("#search");
const BUTTON_SUBMIT = document.querySelector("#buttonSubmit");
const SELECT_FORM = document.querySelector("#search-select");

/// ZONE DE REPONSE
const CONTAINER_RESPONSE = document.querySelector("#container-response");
const RESULT_SENTENCE = document.querySelector("#result-sentence");

/// TABLEAU POUR AFFICHER LES RESULTATS
const TABLE = document.createElement("table");
const THEAD = document.createElement("thead");
const TBODY = document.createElement("tbody");
const CONTAINER_BODY = document.querySelector("#tbody");

/// BOUTON POUR GERER L'OFFSET
const BTN_ARTIST = document.querySelector("#btnArtist");
const BTN_RECORD = document.querySelector("#btnRecord");
const BTN_RELEASE = document.querySelector("#btnRelease");
const BTN_ALL = document.querySelector("#btnAll");