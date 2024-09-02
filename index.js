const guildId = -1;

const apiUrl = `https://www.boardgamegeek.com/xmlapi2/guild?id=${guildId}&members=1&page=`;

async function getValues() {
    let names = "";
    let URL = apiUrl + document.querySelector("#pageNumber").textContent;

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();

        if (xmlText === "<?xml version=\"1.0\" encoding=\"utf-8\"?><error message='Not Found' />") {
            document.getElementById("namesList").value = "Invalid GuildID!";
            return;
        }

        names = xmlText;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    document.getElementById("namesList").value = names;
}

function toClipboard() {
    let txt = document.getElementById("namesList");

    txt.select();
    txt.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(txt.value);

    // alert("Text copied to clipboard");
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    let themeButton = document.querySelector("#themeButton");

    if(themeButton.textContent === "Dark Theme") {
        themeButton.textContent = "Light Theme";
    } else {
        themeButton.textContent = "Dark Theme";
    }
}