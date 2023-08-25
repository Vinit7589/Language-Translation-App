const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const excahngeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("button")
const icons = document.querySelectorAll(".row i")
const email_id = 'vinitedu22@gmail.com'


selectTag.forEach((tag, id) => {
    for (const language_code in countries) {
        let selected
        if (id == 0 && language_code == "en-GB") {
            // selecting english by default as 'FROM' language and hindi as 'TO' language 
            selected = "selected"
        }
        else if (id == 1 && language_code == "hi-IN") {
            selected = "selected"
        }


        let option = `<option value="${language_code}" ${selected}>${countries[language_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

excahngeIcon.addEventListener("click", () => {
    //exchanging the text area and select tag values
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText
    selectTag[1].value = tempLang;
})


translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value, // getting fromSelect tag value
        translateTo = selectTag[1].value; // getting toSelect tag value

    if (!text) return;
    toText.setAttribute("placeholder", "Translating...")

    // API URL by Mymemory translated app (link - 'https://mymemory.translated.net/doc/spec.php')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=${email_id}`;

    // Fetching api response and returning it with parsing into js obj
    // and in another then method receiving the obj
    fetch(apiUrl).then(response => response.json()).then(data => {
        console.log(data)
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation")

    })
})

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {

            // If clicked icon has from id, copy thr fromTextArea value else copy the toText Area
            if (target.id === "from") {
                navigator.clipboard.writeText(fromText.value)
                translateBtn.innerText = "Text Copied"
                setTimeout(() => translateBtn.innerText = "Translate Text", 1600)
            } else {
                navigator.clipboard.writeText(toText.value)
                translateBtn.innerText = "Text Copied"
                setTimeout(() => translateBtn.innerText = "Translate Text", 1600)
            }
        } else {
            let utterance;
            // if clicked icon has 'FROM' id, speak the fromTextarea value else speak the toTextarea value
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value // setting utterance langauge to "fromSelect" tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value //setting utterance langauge to "toSelect" tag value
            }
            speechSynthesis.speak(utterance) // speaked the passed utterance

        }
    })
})
