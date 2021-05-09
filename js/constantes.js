const MUSICBRAINZ_API_URL = "https://musicbrainz.org/ws/2/";
const COVERARCHIVE_API_URL = "https://coverartarchive.org/";

const BODY_CONTAINER = document.body;
const SEARCH_FORM = document.querySelector("#form");
const INPUT_VALUE = document.querySelector("#search");

const BUTTON_SUBMIT = document.querySelector("#buttonSubmit");
const SELECT_FORM = document.querySelector("#search-select");

const CONTAINER_RESPONSE = document.querySelector("#container-response");

const TABLE = document.createElement("table");
const TBODY = document.createElement("tbody");

const BTN_TEST = document.querySelector("#test");