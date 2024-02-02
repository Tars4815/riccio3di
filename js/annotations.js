/* Annotations definition */
function createAnnotation(titleText, position, cameraPosition, cameraTarget, description) {
    // Create title element
    let titleElement = $(`<span>${titleText}</span>`);
    // Create Potree.Annotation instance
    let annotation = new Potree.Annotation({
        position: position,
        title: titleElement,
        cameraPosition: cameraPosition,
        cameraTarget: cameraTarget,
        description: description
    });
    // Set the annotation to be visible
    annotation.visible = true;
    // Add the annotation to the scene
    viewer.scene.annotations.add(annotation);
    // Override toString method for title element
    titleElement.toString = () => titleText;
}

// Function to fetch JSON data and create annotations
async function fetchAndCreateAnnotations() {
    try {
        // Fetch JSON data
        const response = await fetch('./assets/artworks.json');
        const data = await response.json();

        // Iterate through data and create annotations
        data.forEach((artwork) => {
            createAnnotation(artwork.title, [artwork.pos_x, artwork.pos_y, artwork.pos_z], [artwork.campos_x, artwork.campos_y, artwork.campos_z], [artwork.tarpos_x, artwork.tarpos_y, artwork.tarpos_z], artwork.artist);
        });
    } catch (error) {
        console.error('Error fetching or processing JSON data:', error);
    }
}

// Call the function to fetch and create annotations
fetchAndCreateAnnotations();

// Saint Siro Monastery:
/*createAnnotation(
    "St. Siro Monastery",
    [554484.435, 4988585.757, 96.738],
    [554484.435, 4988585.757, 161.510],
    [554484.435, 4988585.757, 96.738],
    `The Benedictine monastery of S. Siro, founded around 550 by Bishop Siro, is among the oldest cenobies in the city and potentially the first established by the Benedictine order. A secondary foundation occurred in 1056 by Bishop Dionysius, expanding the monastery with essential facilities. Over the 12th and 13th centuries, the monastery's property grew, reflecting effective management.
    Under Abbess Lucia Bagarotti's guidance, the abbey's structures continued to expand, witnessing the construction of the cloister in 1520 and the refectory in 1527. However, the monastery faced demolitions in the 17th century, leading to the removal of the old abbey church in 1674.
    By 1924, the Municipality of Piacenza acquired part of the convent's land to build the Modern Art Gallery, and earlier in 1892, land was expropriated to construct the Pietro Giordani primary school. These changes mark significant transitions in the monastery's history.`,
);

// Ricci Oddi Gallery of Modern Art:
createAnnotation(
    "Ricci Oddi Gallery of Modern Art",
    [554509.503, 4988599.111, 96.903],
    [554511.210, 4988604.179, 98.907],
    [554507.410, 4988581.229, 95.043],
    'The Ricci Oddi Gallery of Modern Art was founded in 1931 at the request of Giuseppe Ricci Oddi, a collector from Piacenza (1869-1937), who recognised the need to move his painting collection to a more suitable and accessible location. The museum holds one of the major Italian collections of 19th and early 20th-century paintings and sculptures. The building is a complex architecture designed by the architect Giulio Ulisse Arata. The museum is located on the site of the former Convent of San Siro, of which only a part has been preserved. In fact, the Gallery preserves some parts of the monastery inside, which are connected to the gallery through a number of arcaded courtyards. The building has an entrance hall that leads to a spacious corridor from which visitors enter a series of rooms displaying works of art. At the end of the corridor, an octagonal space opens up. This gives access to a series of radiating rooms, which are connected to each other, allowing visitors to move freely around the building. The architecture reveals also interesting solutions: one of them is the natural zenithal lighting requested by the collector to emphasize the paintings.',
)*/