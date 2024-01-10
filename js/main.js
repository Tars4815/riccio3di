//Defining a start exploring action to hide welcome panel
function hideWelcomePanel() {
    var welcomePanel = document.getElementById('container');
    welcomePanel.style.visibility = "hidden";
    console.log("Hiddening welcomePanel");
}

//Fly to a specific oriented image
function flyToImage(image, chunk) {
    Potree.debug.moveToImage(viewer.scene.orientedImages.find(element => element.name == chunk).images.find(element => element.id == image));
}

//Defining a searchInArray function that links oriented image id string with the file name of it in a given array
function searchInArray(array, searchString) {
    const lowerCaseSearchString = searchString.toLowerCase();

    return array.filter(obj => {
        if (obj.title && typeof obj.title === 'string') {
            return obj.title.toLowerCase() === lowerCaseSearchString;
        }
        return false;
    }).map(obj => {
        return {
            title: obj.title,
            artist: obj.artist,
            file: obj.file,
            link: obj.link,
        };
    });
}

//Flying to suggested artwork
/*function flyToSuggestion(array, searchString) {
    var searchResult = searchInArray(array, searchString);
    flyToImage(searchResult[0].file,"artworks");
}*/

//Testing updated version of flyToSuggestion
function flyToSuggestion(array, searchString) {
    var searchResult = searchInArray(array, searchString);
    if (searchResult.length > 0) {
        updateInfoPanel(searchResult[0]);
        flyToImage(searchResult[0].file, "artworks");
    } else {
        // Handle case where no artwork is found
        console.log("No artwork found for", searchString);
    }
}

function updateInfoPanel(artwork) {
    document.getElementById('info-title').textContent = artwork.title;
    document.getElementById('info-artist').innerHTML = '<b>Artist:</b> ' + artwork.artist;
    var iframe = document.getElementById('info-iframe');
    iframe.src = artwork.link;
    document.getElementById('info-panel').style.display = 'block';
}

//This has been added to the potree.js code to. Remove it if it's not working
function hideInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('info-iframe').src = '';
}

//-------- END OF TEST ---------//


//Search bar code
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

//Checking the user input in the search bar
searchInput.addEventListener('input', () => {
    const inputText = searchInput.value;
    if (inputText) {
        const suggestions = getSuggestions(inputText).slice(0, 3);
        displaySuggestions(suggestions);
        console.log("Displaying list of suggestions")
    } else {
        suggestionsContainer.style.display = 'none';
        console.log("No matches found for suggestions")
    }
});

//Retrieving artwork title suggestion list based on the search bar input
function getSuggestions(searchString) {
    return artworks.filter(obj => {
        if (obj.title && typeof obj.title === 'string') {
            return obj.title.toLowerCase().includes(searchString.toLowerCase());
        }
        return false;
    }).map(obj => obj.title);
}

function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('suggestion');
        div.textContent = suggestion;
        div.onclick = () => flyToSuggestion(artworks, suggestion);
        suggestionsContainer.appendChild(div);
    });
    suggestionsContainer.style.display = 'block';
}




