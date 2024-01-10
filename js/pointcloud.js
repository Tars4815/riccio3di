/* Loading Potree viewer in the Potree Render Area defined in index.html */
window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
/* Defining appearance settings for rendering in the viewer */
viewer.setEDLEnabled(true); // Enabling Eye-Dome-Lighting option
viewer.setFOV(60); // Defining Field of view
viewer.setPointBudget(2_000_000); // Defining point budget
viewer.setDescription(""); // Setting a description to be shown on top of viewer
/* Loading the settings for the Potree sidebar */
viewer.loadGUI(() => {
    viewer.setLanguage('en');
    // viewer.toggleSidebar();
    /* Creating a new sidebar section for credits */
    let section = $(`<h3 id="menu_credits" class="accordion-header ui-widget"><span>Credits</span></h3><div class="accordion-content ui-widget pv-menu-list"></div>`);
    let content = section.last();
    content.html(`
    <div class="pv-menu-list">
    <li><b><a href="https://riccioddi.it/" target="_blank">Ricci Oddi Gallery of Modern Art</a></li> Piacenza, IT</b></li>
    <li>Laser scanner survey by Federico Barbieri and Rebecca Fascia</li>
    <li>UAV photogrammetric survey by Federico Barbieri and Francesco Ioli</li>
    <li>Image processing by Federico Barbieri</li>
    <li>Potree Template and data integration by Federica Gaspari and Rebecca Fascia</li>
    <li>Project by <a href="https://labmgf.dica.polimi.it/" target="_blank">LabMGF</a></li></li>
    <li>Politecnico di Milano</li>
    </div>
    `);
    content.hide();
    section.first().click(() => content.slideToggle());
    section.insertBefore($('#menu_appearance'));
    $("#menu_credits").next().show();
});
/* Define scene for the bridge */
let scene = new Potree.Scene();
/* Set scene to be loaded in the Potree Viewer */
viewer.setScene(scene);
/* Loading point cloud data and its setting for rendering in Potree Viewer */
Potree.loadPointCloud("./pointclouds/tls/metadata.json", "Terrestrial Laser Scannning", e => {
    let pointcloud = e.pointcloud;
    let material = pointcloud.material;
    material.size = 0.6;
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    material.shape = Potree.PointShape.CIRCLE;
    material.activeAttributeName = "rgba"; // change this value to "classification" and uncomment the next 2 lines if you desire to show the classified point cloud
    scene.addPointCloud(pointcloud);
    //viewer.setFrontView();
});
Potree.loadPointCloud("./pointclouds/drone/metadata.json", "Drone photogrammetry", e => {
    let pointcloud = e.pointcloud;
    let material = pointcloud.material;
    material.size = 0.6;
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    material.shape = Potree.PointShape.CIRCLE;
    material.activeAttributeName = "rgba"; // change this value to "classification" and uncomment the next 2 lines if you desire to show the classified point cloud
    scene.addPointCloud(pointcloud);
});
Potree.loadPointCloud("./pointclouds/slam/metadata.json", "SLAM laser", e => {
    let pointcloud = e.pointcloud;
    let material = pointcloud.material;
    material.size = 0.6;
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    material.shape = Potree.PointShape.CIRCLE;
    material.activeAttributeName = "rgba"; // change this value to "classification" and uncomment the next 2 lines if you desire to show the classified point cloud
    scene.addPointCloud(pointcloud);
    scene.view.setView(
        [554525.845, 4988505.636, 169.732],
        [554510.667, 4988540.543, 122.537],
    );
});