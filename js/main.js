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
            youtube: obj.youtube,
            year: obj.year,
            medium: obj.medium,
            dimensions: obj.dimensions,
        };
    });
}

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
    //var iframe = document.getElementById('info-iframe');
    //iframe.src = artwork.youtube;
    var youtubeLink = document.getElementById('info-youtube');
    youtubeLink.setAttribute('href', artwork.youtube);
    youtubeLink.setAttribute('target', '_blank');
    document.getElementById('info-year').innerHTML = '<b>Year:</b> ' + artwork.year;
    document.getElementById('info-medium').innerHTML = artwork.medium;
    document.getElementById('info-dimensions').innerHTML = artwork.dimensions;
    document.getElementById('info-panel').style.display = 'block';
}

//This has been added to the potree.js code to. Remove it if it's not working
function hideInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('info-iframe').src = '';
}

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

// Toggling legend panel and switching pointcloud colors
function toggleLegendPanel() {
    var panel = document.getElementById("legend_panel");
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
        changePCcolor("tls", 1, 0, 0);
        changePCcolor("photogrammetry", 0, 1, 0);
        changePCcolor("slam", 0, 0, 1);
    } else {
        panel.style.display = "none";
        setRGBA("tls");
        setRGBA("photogrammetry");
        setRGBA("slam");
    }

}

function changePCcolor(source, r, g, b) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "color";
    const newColor = new THREE.Color(r, g, b); // RGB values for new color
    if (targetPointCloud) {
        targetPointCloud.material.color = newColor;
    }
}

function setRGBA(source) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "rgba";
}

// Camera in room? TEST of a WORKING EXAMPLE
/*
function isInsideRoom(cameraPosition, roomBoundingBox) {
    // Extract coordinates of camera position
    const cameraX = cameraPosition.x;
    const cameraY = cameraPosition.y;
    const cameraZ = cameraPosition.z;

    // Extract bounding box coordinates of the room
    const { minX, minY, minZ, maxX, maxY, maxZ } = roomBoundingBox;

    // Check if camera is inside the room
    return (
        cameraX >= minX && cameraX <= maxX &&
        cameraY >= minY && cameraY <= maxY &&
        cameraZ >= minZ && cameraZ <= maxZ
    );
}

// Example usage:
window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
const roomBoundingBox = {
    minX: 554495.642,
    minY: 4988582.288,
    minZ: 96.953,
    maxX: 554505.112,
    maxY: 4988593.742,
    maxZ: 100.095,
};



// Function to check if the camera is inside the room and log the result
function checkCameraPosition() {
    const cameraPosition = viewer.scene.getActiveCamera().position;
    const isInside = isInsideRoom(cameraPosition, roomBoundingBox);

    if (isInside) {
        console.log("Camera is inside the room.");
    } else {
        console.log("Camera is outside the room.");
    }
}

// Initial check when the page loads
checkCameraPosition();

document.addEventListener("mousemove", checkCameraPosition);
document.addEventListener("mousedown", checkCameraPosition);
document.addEventListener("mouseup", checkCameraPosition);
document.addEventListener("wheel", checkCameraPosition);*/

// TEST WITH MULTIPLE OBJECTS
// Array of room bounding boxes
const rooms = [
    {
        name: "Room1",
        minX: 554495.642,
        minY: 4988582.288,
        minZ: 96.953,
        maxX: 554505.112,
        maxY: 4988593.742,
        maxZ: 100.095,
    },
    {
        name: "Room12",
        minX: 554595.642,
        minY: 4988682.288,
        minZ: 100.953,
        maxX: 554605.112,
        maxY: 4988693.742,
        maxZ: 200.095,
    },
    // Add more room objects as needed
];

window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
// Function to check if the camera is inside any of the rooms and log the result
function checkCameraPosition() {
    const cameraPosition = viewer.scene.getActiveCamera().position;

    // Iterate through the array of room bounding boxes
    for (const room of rooms) {
        const isInside = isInsideRoom(cameraPosition, room);

        if (isInside) {
            console.log(`Camera is inside ${room.name}.`);
            return; // Exit the function if the camera is inside any room
        }
    }

    console.log("Camera is outside all rooms.");
}

// Add event listener for camera changes
viewer.addEventListener("camera_changed", checkCameraPosition);

// Add event listener for mouse events
document.addEventListener("mousemove", checkCameraPosition);
document.addEventListener("mousedown", checkCameraPosition);
document.addEventListener("mouseup", checkCameraPosition);
document.addEventListener("wheel", checkCameraPosition);

// Initial check when the page loads
checkCameraPosition();

// Function to check if a point is inside a room bounding box
function isInsideRoom(point, room) {
    return (
        point.x >= room.minX &&
        point.x <= room.maxX &&
        point.y >= room.minY &&
        point.y <= room.maxY &&
        point.z >= room.minZ &&
        point.z <= room.maxZ
    );
}

