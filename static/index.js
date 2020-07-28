"use strict"

// const API_ENDPOINT = "https://api.cheats.rs"; // Flaky AF, need to investigate.
const API_ENDPOINT = "https://m1zur8nbrg.execute-api.eu-north-1.amazonaws.com";
const SURVEY_KEY = "survey2020";


let codes_rust = document.querySelectorAll("code:not(.ignore-auto)");
let memory_bars = document.querySelectorAll("memory-row");
let subtitle_index = 0;

const subtiles = [
    "_NOW_HUMAN_",
    "_GITHASH_",
    "Same low price, 20% more content.",
    "Recommended by 9 out of 10 dentists.",
    "World's best cheat sheet according to its authors.",
    "This site was tested on animals and got 4.5 stars.",
    "Like Rust in a nutshell, for people with allergies.",
    "All the things you ever wanted to know. And more.",
    "Documentation of a Cargo cult.",
    "Will the last person to leave this site please switch on night mode?",
    "A collaboration between Zoo Berlin and Olympia Typewriters.",
];

// Labels for which we don't want feedback, mainly because the button placement
// would interfere with other buttons.
const feedback_blacklist = ["", "behind-the-scenes", "data-types", "numeric-types-ref", "textual-types-ref", "standard-library", "traits", "tooling", "coding-guides", "misc"];


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
        body.classList.add("day-mode");
        storage_set("night-mode", "day");
    } else {
        body.classList.add("night-mode");
        body.classList.remove("day-mode");
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

    storage_set(SURVEY_KEY, state);
}


// Called when the user clicks the subtitle (usually the date)
function toggle_subtitle(to_index) {
    let subtitle = document.getElementById("subtitle");

    if (!!to_index) {
        subtitle_index = to_index;
    } else {
        subtitle_index = (subtitle_index + 1) % subtiles.length;
    }

    subtitle.innerHTML = subtiles[subtitle_index];
}

/// Shows a random quote
function random_quote() {
    let SKIP = 2; // Skip first 2 entries
    let rand = Math.random();
    let index = SKIP + Math.floor((subtiles.length - SKIP) * rand);
    toggle_subtitle(index);
}


// Performs the raw XHR call.
function feedback_post(op, json, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", API_ENDPOINT + op, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(json));
    xhr.onerror = (e) => {
        callback && callback("error")
    }
    xhr.onload = (e) => {
        callback && callback()
    }
}

// Submits text the user has written into the feedback form.
function feedback_send_detailed(feedback_id) {
    let feedback_node = document.getElementById(feedback_id);
    let element_id = feedback_node.getAttribute("element-id");

    let textarea = feedback_node.querySelectorAll(`textarea`)[0];
    let text = textarea.value;

    feedback_post("/feedback/detail", { text: text, section: element_id }, (e) => {
        let result = feedback_node.querySelectorAll(`result`)[0]
        if (!e) {
            textarea.value = null;
            result.innerHTML = "Success";
            result.style.color = "green";
            result.style.left = "40px";
            result.style.opacity = "0.0";

            setTimeout(() => {
                result.innerHTML = "";
                result.style.color = "black";
                result.style.left = "0px";
                result.style.opacity = "1.0";
            }, 500)
        } else {
            result.innerHTML = "Failed";
            result.style.color = "red";
        }
    });
}

// Prepares all forms visual effects for giving feedback
function feedback_send_mood(mood, feedback_id) {
    let feedback_node = document.getElementById(feedback_id);
    let element_id = feedback_node.getAttribute("element-id");

    let animiation = feedback_node.querySelectorAll(`feedback-button.${mood} feedback-feedback`)[0];
    animiation.style.visibility = "inherit";
    animiation.style.top = "-3em";
    animiation.style.opacity = "0.0";

    feedback_post("/feedback/mood", { mood: mood, section: element_id });

    setTimeout(() => {
        animiation.style.visibility = "hidden";
        animiation.style.top = "-0.5em";
        animiation.style.opacity = "0.5";
    }, 300);
}

// Hide logic for feedback box needs various entities to call this.
function feedback_detail_visibility(feedback_id, visibility) {
    let feedback_node = document.getElementById(feedback_id);
    let form = feedback_node.querySelectorAll(`feedback-form`)[0];
    form.style.display = visibility;
}

// Handler to catch CTRL-ENTER
function feedback_quick_submit(feedback_id) {
    if (event.ctrlKey && event.keyCode == 13) {
        feedback_send_detailed(feedback_id);
    }
}

// Given a list of header tags, attach feedback buttons to that header.
function feedback_attach_buttons(list_of_header_tags) {
    for (var tagname of list_of_header_tags) {
        let elements = document.getElementsByTagName(tagname);

        for (var element of elements) {
            let element_id = element.id;
            let feedback_id = "feedback-" + element_id;
            let feedback = document.createElement("feedback");

            if (feedback_blacklist.includes(element_id)) continue;

            feedback.setAttribute("element-id", element_id);
            feedback.id = feedback_id;
            feedback.innerHTML = `
                <button-row>
                    <feedback-button class="good" onmouseover="feedback_detail_visibility('${feedback_id}', 'none')" onclick="javascript:feedback_send_mood('good', '${feedback_id}');"><feedback-feedback>💗</feedback-feedback><the-button>😊</the-button></feedback-button>
                    <feedback-button class="bad" onmouseover="feedback_detail_visibility('${feedback_id}', 'none')" onclick="javascript:feedback_send_mood('bad', '${feedback_id}');"><feedback-feedback>💩</feedback-feedback><the-button>👿</the-button></feedback-button>
                    <feedback-button onmouseover="feedback_detail_visibility('${feedback_id}', 'inherit')"><the-button>✏️</the-button></feedback-button>
                </button-row>
                <feedback-form>
                    <textarea maxlength="2048" onkeydown="javascript:feedback_quick_submit('${feedback_id}', e);" placeholder="Tell us more!"></textarea>
                    <hint>See <a href="/legal">privacy policy</a>; also <b>CTRL-ENTER</b> submits. </hint>
                    <controls>
                        <result></result>
                        <a href="javascript:feedback_send_detailed('${feedback_id}');">Submit</a>
                    </controls>
                </feedback-form>
            `;
            feedback.onmouseleave = () => {
                setTimeout(() => {
                    // Ok, problem is there are a few pixels where user's mouse will trigger
                    // "onmouseleave" but he actually only moved mouse to into detail box.
                    // The trick now is, we query for that ID with `:hover` state, if that
                    // element exists we know the user successfully hovered and don't do
                    // anything.
                    let is_still_hovered = document.querySelectorAll(`#${feedback_id}:hover`);
                    if (is_still_hovered.length > 0) return;

                    // Otherwise we hide the box.
                    feedback_detail_visibility(feedback_id, "none");
                }, 150);

            }

            element.appendChild(feedback);
        }
    }
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
    let survey = storage_get(SURVEY_KEY);

    // Don't attach feedback to h1, looks ugly and doesn't help.
    feedback_attach_buttons(["h1", "h2", "h3", "h4"]);

    if (Math.random() < 0.1) { random_quote(); }
    if (night_mode === "night") { toggle_night_mode(); }
    if (ligatures === "ligatures") { toggle_ligatures(); }

    // Make sure all "memory-bars" descriptions expand or collapse when clicked.
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