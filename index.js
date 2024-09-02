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

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    
        const membersTag = xmlDoc.querySelector('members');

        if (membersTag) {
          const memberElements = membersTag.querySelectorAll('member');
    
          memberElements.forEach(member => {
            names += member.getAttribute("name") + ", ";
          });
        } else {
          console.log('No members tag found in the response.');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    names = names.slice(0, -2);

    document.getElementById("namesList").value = names;
}

function toClipboard() {
    let txt = document.getElementById("namesList");

    txt.select();
    txt.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(txt.value);
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