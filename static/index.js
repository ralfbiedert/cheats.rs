"use strict"

const survey_key = "survey2020";

let codes_rust = document.querySelectorAll("code:not(.ignore-auto)");
let memory_bars = document.querySelectorAll("memory-row");
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
        storage_set("night-mode", "day");
    } else {
        body.classList.add("night-mode");
        storage_set("night-mode", "night");
    }
}

// Called by toggle button, enable or disable ligatures persist setting in localStorage.
function toggle_ligatures() {
    let body = document.getElementsByTagName("body")[0];
    let set = undefined;

    if (codes_rust[0].style.fontVariantLigatures === "common-ligatures") {
        set = "none";
        storage_set("ligatures", "no-ligatures");
    } else {
        set = "common-ligatures";
        storage_set("ligatures", "ligatures");
    }

    codes_rust.forEach((code) => {
        code.style.fontVariantLigatures = set;
    });
}


// Sets something to local storage.
function storage_set(key, value) {
    !!localStorage && localStorage.setItem(key, value);
}

// Retrieves something from local storage.
function storage_get(key) {
    return !!localStorage && localStorage.getItem(key);
}


// Sets the survey state
function set_survey(state) {
    let elements = document.getElementsByClassName("survey");

    for (var e of elements) {
        e.style.display = state;
    }

    storage_set(survey_key, state);
}


// Called when the user clicks the subtitle (usually the date)
function toggle_subtitle() {
    let subtitle = document.getElementById("subtitle");

    subtitle_index = (subtitle_index + 1) % subtiles.length;
    subtitle.innerHTML = subtiles[subtitle_index];
}


// Use proper syntax since we don't want to write ````rust ...``` all the time.
codes_rust.forEach(code => {
    code.className = "language-rust";
});


// Executed on page load, this runs all toggles the user might have clicked
// the last time based on localStorage.
try {
    let night_mode = storage_get("night-mode");
    let ligatures = storage_get("ligatures");
    let survey = storage_get(survey_key);

    if (night_mode === "night") {
        toggle_night_mode();
    }

    if (ligatures === "ligatures") {
        toggle_ligatures();
    }

    // Disabled for now because not needed
    // if (!survey || survey === "" || survey === "block") {
    //     set_survey("block");
    // }


    // Make sure all descriptions expand or collapse when clicked.
    for (var e of memory_bars) {
        e.onclick = (e) => {
            let section = e.target.closest("lifetime-section");
            let description = section.getElementsByTagName("explanation")[0];

            // Some elements just don't have any
            if (!description) return;

            if (!description.style.display || description.style.display == "none") {
                description.style.display = "inherit";
            } else {
                description.style.display = "none";
            }
        }
    }

} catch (e) {
    console.log(e);
}