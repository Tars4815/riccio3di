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

//Populating the Info Panel with technical details about the highlighted artwork
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

//Showing artwork title suggestions
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
//Defining function to change color of a point cloud to a uniform RGB combination
function changePCcolor(source, r, g, b) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "color";
    const newColor = new THREE.Color(r, g, b); // RGB values for new color
    if (targetPointCloud) {
        targetPointCloud.material.color = newColor;
    }
}
//Defining function to change color of a point cloud to RGB
function setRGBA(source) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "rgba";
}

// TEST WITH MULTIPLE OBJECTS
// Array of room bounding boxes
window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));

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

// test
let currentRoom = null; // Variable to store the current room

function displayRoomBanner(roomName) {
    let bannerElement = document.getElementById("roomBanner");

    // Create or update the banner element
    if (!bannerElement) {
        bannerElement = document.createElement("div");
        bannerElement.id = "roomBanner";
        bannerElement.style.position = "fixed";
        bannerElement.style.bottom = "20px";
        bannerElement.style.left = "50%";
        bannerElement.style.transform = "translateX(-50%)";
        bannerElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        bannerElement.style.color = "white";
        bannerElement.style.padding = "10px";
        bannerElement.style.borderRadius = "5px";
        bannerElement.style.zIndex = "9999";
        document.body.appendChild(bannerElement);
    }

    // Update the banner content if the room has changed
    if (roomName !== currentRoom) {
        bannerElement.textContent = `${roomName}`;
        currentRoom = roomName; // Update the current room
    }

    // Display the banner
    bannerElement.style.display = "block";
}

// Update the checkCameraPosition function to display the banner when entering a different room
function checkCameraPosition() {
    const cameraPosition = viewer.scene.getActiveCamera().position;
    const camera = viewer.scene.getActiveCamera();
    let isInsideAnyRoom = false;
    let originalCameraPosition = camera.position.clone();

    // Iterate through the array of room bounding boxes
    for (const room of rooms) {
        const isInside = isInsideRoom(cameraPosition, room);

        if (isInside) {
            if (currentRoom !== room.name) {
                console.log(`Camera entered ${room.name}.`);
                displayRoomBanner(room.name);
                isInsideAnyRoom = true;
                currentRoom = room.name; // Update the current room
            }

            // Constrain camera movement within the current room
            constrainCameraPosition(camera, room);
            return; // Exit the loop if the camera is inside any room
        }
    }

    if (!isInsideAnyRoom) {
        console.log("Camera is outside all rooms.");

        // Reset the current room
        currentRoom = null;
        // Restore the original camera position if outside all rooms
        camera.position.copy(originalCameraPosition);
    }
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

// Testing room constrains
// Add a function to constrain the active camera position within the current room
function constrainCameraPosition(camera, room) {
    // Constrain camera position within the current room
    camera.position.x = Math.max(room.minX, Math.min(camera.position.x, room.maxX));
    camera.position.y = Math.max(room.minY, Math.min(camera.position.y, room.maxY));
    camera.position.z = Math.max(room.minZ, Math.min(camera.position.z, room.maxZ));
}
