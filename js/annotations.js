/* Annotations definition */
{// Annotation 1
    let Title01 = $(`
                <span>
                St. Siro Monastery
                </span>
                `);
    let annotation01 = new Potree.Annotation({
        position: [554484.435, 4988585.757, 96.738],
        title: Title01,
        cameraPosition: [554484.435, 4988585.757, 161.510],
        cameraTarget: [554484.435, 4988585.757, 96.738],
        description: ` The Benedictine monastery of S. Siro, founded around 550 by Bishop Siro, is among the oldest cenobies in the city and potentially the first established by the Benedictine order. A secondary foundation occurred in 1056 by Bishop Dionysius, expanding the monastery with essential facilities. Over the 12th and 13th centuries, the monastery's property grew, reflecting effective management.
        Under Abbess Lucia Bagarotti's guidance, the abbey's structures continued to expand, witnessing the construction of the cloister in 1520 and the refectory in 1527. However, the monastery faced demolitions in the 17th century, leading to the removal of the old abbey church in 1674.
        By 1924, the Municipality of Piacenza acquired part of the convent's land to build the Modern Art Gallery, and earlier in 1892, land was expropriated to construct the Pietro Giordani primary school. These changes mark significant transitions in the monastery's history.`
    })
    annotation01.visible = true; // Change this to false if you want to hide the annotations at first loading
    scene.annotations.add(annotation01);
    Title01.toString = () => "St. Siro Monastery";
}
{// Annotation 2
    let Title02 = $(`
                <span>
                    Ricci Oddi Gallery of Modern Art
                </span>
                `);
    let annotation02 = new Potree.Annotation({
        position: [554495.833, 4988553.318, 105.566],
        title: Title02,
        cameraPosition: [554493.085, 4988571.698, 175.112],
        cameraTarget: [554495.833, 4988553.318, 105.566],
        description: 'The Ricci Oddi Gallery of Modern Art was founded in 1931 at the request of Giuseppe Ricci Oddi, a collector from Piacenza (1869-1937), who recognised the need to move his painting collection to a more suitable and accessible location. The museum holds one of the major Italian collections of 19th and early 20th-century paintings and sculptures. The building is a complex architecture designed by the architect Giulio Ulisse Arata. The museum is located on the site of the former Convent of San Siro, of which only a part has been preserved. In fact, the Gallery preserves some parts of the monastery inside, which are connected to the gallery through a number of arcaded courtyards. The building has an entrance hall that leads to a spacious corridor from which visitors enter a series of rooms displaying works of art. At the end of the corridor, an octagonal space opens up. This gives access to a series of radiating rooms, which are connected to each other, allowing visitors to move freely around the building. The architecture reveals also interesting solutions: one of them is the natural zenithal lighting requested by the collector to emphasize the paintings.'
    })
    annotation02.visible = true;
    scene.annotations.add(annotation02);
    Title02.toString = () => "Ricci Oddi Gallery of Modern Art";
}