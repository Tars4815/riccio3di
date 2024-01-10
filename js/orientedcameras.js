/* Loading oriented images chunks */
/* First chunk of images */
/* Setting the paths for camera parameters and images list */
const cameraParamsPathPila1 = "./img_selected/indoor/camera_parameters.xml";
const imageParamsPathPila1 = "./img_selected/indoor/orientedimages.txt";

Potree.OrientedImageLoader.load(cameraParamsPathPila1, imageParamsPathPila1, viewer).then(images => {
    images.visible = true;
    viewer.scene.addOrientedImages(images);
    images.name = 'artworks';
});

/* Second chunk of images */
/* Setting the paths for camera parameters and images list */
/*const cameraParamsPath = "./img_selected/chunk2/camera_P1.xml";
const imageParamsPath = "./img_selected/chunk2/camera_P1.txt";

Potree.OrientedImageLoader.load(cameraParamsPath, imageParamsPath, viewer).then(images => {
    images.visible = false; // change this to true if you want to make them visible at first loading without any user action or input
    viewer.scene.addOrientedImages(images);
    images.name = 'chunk2';
});*/