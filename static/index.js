"use strict"

const survey_key = "survey2020";

let codes = document.querySelectorAll("code");
let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform); // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios

let subtitle_index = 0;

const subtiles = [
    "_NOW_HUMAN_",
    "_GITHASH_",
    "Same low price, 20% more content.",
    "Recommended by 9 out of 10 dentists.",
    "The #1 cheat sheet according to its authors.",
    "This site was neither tested on nor approved by animals.",
];

/// Enables or disables the playground.
function show_playground(state) {
    let area_static = document.getElementById("hellostatic");
    let area_play = document.getElementById("helloplay");
    let area_ctrl = document.getElementById("helloctrl");
    let area_info = document.getElementById("helloinfo");

    if (state) {
        area_static.style.display = "none";
        area_info.style.display = "block";
        area_play.innerHTML = "<iframe src='https://play.rust-lang.org/' style='width:100%; height:500px;'></iframe>";
        area_ctrl.innerHTML = "<a href='javascript:show_playground(false);'>⏹️ Stop Editor</a>";
    } else {
        area_static.style.display = "block";
        area_info.style.display = "none";
        area_play.innerHTML = "";
        area_ctrl.innerHTML = "<a href='javascript:show_playground(true);'>▶️ Edit & Run</a>";
    }
}

// Called by toggle button, enable or disable night mode and persist setting in localStorage.
function toggle_night_mode() {
    let body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("night-mode")) {
        body.classList.remove("night-mode");
        !!localStorage && localStorage.setItem("night-mode", "day");
    } else {
        body.classList.add("night-mode");
        !!localStorage && localStorage.setItem("night-mode", "night");
    }
}

// Called by toggle button, enable or disable ligatures persist setting in localStorage.
function toggle_ligatures() {
    let body = document.getElementsByTagName("body")[0];
    let set = undefined;

    if (codes[0].style.fontVariantLigatures === "common-ligatures") {
        set = "none";
        !!localStorage && localStorage.setItem("ligatures", "no-ligatures");
    } else {
        set = "common-ligatures";
        !!localStorage && localStorage.setItem("ligatures", "ligatures");
    }

    codes.forEach((code) => {
        code.style.fontVariantLigatures = set;
    });
}

// Sets the survey state
function set_survey(state) {
    let elements = document.getElementsByClassName("survey");

    for (var e of elements) {
        e.style.display = state;
    }

    !!localStorage && localStorage.setItem(survey_key, state);
}


// Called when the user clicks the subtitle (usually the date)
function toggle_subtitle() {
    let subtitle = document.getElementById("subtitle");

    subtitle_index = (subtitle_index + 1) % subtiles.length;
    subtitle.innerHTML = subtiles[subtitle_index];
}


// Use proper syntax since we don't want to write ````rust ...``` all the time.
codes.forEach(code => {
    code.className = "language-rust";
});


// Executed on page load, this runs all toggles the user might have clicked
// the last time based on localStorage.
try {
    // iOS does not honor the ligature settings and always renders the font without them.
    // Hide the button not to confuse users.
    if (iOS) {
        let button = document.getElementById("toggle_ligatures");
        button.style.visibility = "hidden";
    }

    let night_mode = !!localStorage && localStorage.getItem("night-mode");
    let ligatures = !!localStorage && localStorage.getItem("ligatures");
    let survey = !!localStorage && localStorage.getItem(survey_key);

    if (night_mode === "night") {
        toggle_night_mode();
    }

    if (ligatures === "ligatures") {
        toggle_ligatures();
    }

    if (!survey || survey === "" || survey === "block") {
        set_survey("block");
    }

} catch (e) {
    console.log(e);
}