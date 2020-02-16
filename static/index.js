"use strict"

let codes = document.querySelectorAll("code");
let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform); // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios

const cross_compilation_suffix_prefix = "#cross-compilation-wizard";

/// Enables or disables the playground.
function show_playground(state) {
    let area_static = document.getElementById("hellostatic");
    let area_play = document.getElementById("helloplay");
    let area_ctrl = document.getElementById("helloctrl");

    if (state) {
        area_static.style.display = "none";
        area_play.innerHTML = "<iframe src='https://play.rust-lang.org/' style='width:100%; height:500px;'></iframe>";
        area_ctrl.innerHTML = "<a href='javascript:show_playground(false);'>⏹️ Stop Editor</a>";
    } else {
        area_static.style.display = "block";
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

    for (e of elements) {
        e.style.display = state;
    }

    !!localStorage && localStorage.setItem("survey2019", state);
}

// Called when a value was changed in the cross compilation dropdowns.
function cross_compile_dropdown(which) {
    let from_dropdown =  document.getElementById("cross-compile-dropdown-from");
    let to_dropdown =  document.getElementById("cross-compile-dropdown-to");

    let from = from_dropdown.options[from_dropdown.selectedIndex].value;
    let to = to_dropdown.options[to_dropdown.selectedIndex].value;

    history.replaceState({}, "", cross_compilation_suffix_prefix + "-" + from + "-to-" + to);


    // fetch("cross-compilation-wizard/xxx-to-yyy/index.html" /*, options */)
    //     .then((response) => response.text())
    //     .then((html) => {
    //         document.getElementById("ttt").innerHTML = html;
    //     })
    //     .catch((error) => {
    //         console.warn(error);
    //     });
}

// Does first time setup for cross compilation wizard.
function cross_compile_dropdown_setup() {
    let cross_froms = [];
    let cross_tos = [];

    let pretty_name = {};

    let dropdown_from = document.getElementById("cross-compile-dropdown-from")
    let dropdown_to = document.getElementById("cross-compile-dropdown-to")

    // Update key => pretty mapping.
    for (let item of document.getElementsByClassName("cross-compilation-pretty-name")) {
        let key = item.getAttribute("data-name");
        let value = item.innerText;

        pretty_name[key] = value;
    }

    // Get all possible from / to targets.
    for (let item of document.getElementsByClassName("cross-compilation-descriptor")) {
        let from = item.getAttribute("data-from");
        let to = item.getAttribute("data-to");

        cross_froms.push(from);
        cross_tos.push(to);
    }

    // Build from targets
    for (let item of cross_froms) {
        let element = document.createElement("option");
        element.setAttribute("value", item);
        element.innerText = pretty_name[item];
        dropdown_from.appendChild(element);
    }

    // Build to targets.
    for (let item of cross_tos) {
        let element = document.createElement("option");
        element.setAttribute("value", item);
        element.innerText = pretty_name[item];
        dropdown_to.appendChild(element);
    }
}

// Reads the `#` target of our URL and updates the drop downs accordingly
function cross_compilation_page_load_redirect() {
    let hash = window.location.hash;

    // Ignore all hashes not going to the wizard, or hashes linking to base target.
    if (!hash.startsWith(cross_compilation_suffix_prefix) || hash === cross_compilation_suffix_prefix) {
        return;
    }

    try {
        let middle = hash.indexOf("-to-");
        let from = hash.substr(cross_compilation_suffix_prefix.length + 1, middle - cross_compilation_suffix_prefix.length - 1);
        let to = hash.substr(middle + 4);

        // Sets option by value.
        document.querySelector("#cross-compile-dropdown-from option[value='" + from +"']").selected = true;
        document.querySelector("#cross-compile-dropdown-to option[value='" + to +"']").selected = true;

        // This down here is a hack. We first set our href to our actual scrolling target
        // so the browser scrolls; then we wait a bit and re-set the url to what it was before
        // (the encoded scheme) so the user still sees it / can copy it.
        let old_href = location.href;

        location.href = "#cross-compilation-wizard";

        setTimeout(() => {
           location.href = old_href;
        }, 100);
    } catch (e) {
        console.error("Error setting up Cross Compilation Wizard. This is a bug!");
        console.error(e);
    }
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
    let survey = !!localStorage && localStorage.getItem("survey2019");

    if (night_mode === "night") {
        toggle_night_mode();
    }

    if (ligatures === "ligatures") {
        toggle_ligatures();
    }

    if (!survey || survey === "" || survey === "block") {
        set_survey("block");
    }

    cross_compile_dropdown_setup();
    cross_compilation_page_load_redirect();

} catch (e) {
    console.log(e);
}