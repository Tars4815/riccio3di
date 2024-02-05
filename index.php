<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="description" content="Ricci Oddi Gallery of Modern Art">
	<meta name="author" content="Rebecca Fascia">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>Ricci Oddi Gallery</title>
	<link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'>
	<link rel="stylesheet" type="text/css" href="./libs/potree/potree.css">
	<link rel="stylesheet" type="text/css" href="./libs/jquery-ui/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="./libs/openlayers3/ol.css">
	<link rel="stylesheet" type="text/css" href="./libs/spectrum/spectrum.css">
	<link rel="stylesheet" type="text/css" href="./libs/jstree/themes/mixed/style.css">
</head>

<body>
	<script src="./libs/jquery/jquery-3.1.1.min.js"></script>
	<script src="./libs/spectrum/spectrum.js"></script>
	<script src="./libs/jquery-ui/jquery-ui.min.js"></script>
	<script src="./libs/other/BinaryHeap.js"></script>
	<script src="./libs/tween/tween.min.js"></script>
	<script src="./libs/d3/d3.js"></script>
	<script src="./libs/proj4/proj4.js"></script>
	<script src="./libs/openlayers3/ol.js"></script>
	<script src="./libs/i18next/i18next.js"></script>
	<script src="./libs/jstree/jstree.js"></script>
	<script src="./libs/potree/potree.js"></script>
	<script src="./libs/plasio/js/laslaz.js"></script>
	<script src="./libs/three.js/build/three.min.js"></script>
	<!-- INCLUDE ADDITIONAL DEPENDENCIES HERE -->
	<!-- Custom styles for this template -->
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<!--Including welcome message-->
	<div id="container" class="container">
		<div class="info">
			<div class="website-link"><a href="https://riccioddi.it/" target="_blank" alt="Ricci Oddi website"
					title="Ricci Oddi website">Official website</a></div>
			<div class="title">Ricci Oddi Gallery</div>
			<br>
			<div class="subtitle">Virtual tour implemented by <a href="https://labmgf.dica.polimi.it/"
					target="_blank"><b>LabMGF@PoliMI</b></a></div>
			<div class="button" id="start_exploring" onclick="hideWelcomePanel()" alt="Start 3D exploration"
				title="Start 3D exploration">Start exploring!</div>
			<div class="instructions">
				<div><strong>Rotate</strong>: Left button</div>
				<div><strong>Move</strong>: Right button</div>
				<div><strong>Zoom in/Zoom out</strong>: Scroll wheel</div>
			</div>
		</div>
	</div>
	<!--Defining searchbx by artwork title-->
	<div class="search-container">
		<input type="text" id="searchInput" placeholder="Search artwork title..." alt="Search for an artwork"
			title="Search for an artwork">
		<div id="suggestions" class="suggestions"></div>
	</div>
	<!--Loading settings for Potree viewer-->
	<div class="potree_container" style="position: relative; height:100%; width: 100%;">
		<div id="potree_render_area"></div>
		<div id="potree_sidebar_container" style="width: 50%; height: 100%;"> </div>
	</div>
	<div id="info-panel" style="display: none;">
		<h2 id="info-title"></h2>
		<p id="info-artist"></p>
		<!--<iframe id="info-iframe" src="" width="100%" height="300"></iframe>-->
		<a id="info-youtube">YouTube Commentary</a>
		<p id="info-year"></p>
		<p id="info-medium"></p>
		<p id="info-dimensions"></p>
		<!-- Add more elements as needed -->
	</div>
	<img id="cloud_legend_toggle" src="./libs/potree/resources/icons/eye_2.png"
		alt="Toggle/Untoggle the legend for point cloud sources"
		title="Toggle/Untoggle the legend for point cloud sources" onclick="toggleLegendPanel()">
	<div id="legend_panel" style="display: none;">
		<p>
			<b>Pointcloud source</b>

		<div style="color:green;"><b>UAV - Photogrammetry</b></div>
		<div style="color: red;"><b>Terrestrial Laser Scanning</b></div>
		<div style="color: blue;"><b>SLAM</b></div>
		</ul>
		</p>
	</div>
	<img id="indoor_map_toggle" src="./libs/potree/resources/icons/floor-plan.svg"
		alt="Toggle/Untoggle indoor plan view" title="Toggle/Untoggle indoor plan view" onclick="toggleFloorPlan()">
	<div id="indoor_panel" style="display: none;">
		<p>
			<b>Floor plan</b><br><br>

			<img id="indoor_panel_image" alt="Indoor Panel Image">

		</p>
	</div>
	<!-- Import ARTWORKS list-->
	<script src="js/artworks.js"></script>
	<!-- Import ROOMS list-->
	<script src="js/rooms.js"></script>
	<script src="./js/main.js"></script>
	<!-- Import POINTCLOUD-->
	<script src="js/pointcloud.js"></script>
	<!--- Connect to Database -->
	<?php
	$connection = pg_connect("host=localhost port=5432 dbname=webapp user=postgres password=root");
	if (!$connection) {
		echo "An error occurred.<br>";
		exit;
	}

	$result = pg_query($connection, "SELECT * FROM artworks ORDER BY id");
	if (!$result) {
		echo "An error occurred.<br>";
		exit;
	}

	// Fetch data and store it in an array
	$data = array();
	while ($row = pg_fetch_assoc($result)) {
		// Convert numeric strings to actual numbers
		$row['pos_x'] = floatval($row['pos_x']);
		$row['pos_y'] = floatval($row['pos_y']);
		$row['pos_z'] = floatval($row['pos_z']);
		$row['campos_x'] = floatval($row['campos_x']);
		$row['campos_y'] = floatval($row['campos_y']);
		$row['campos_z'] = floatval($row['campos_z']);
		$row['tarpos_x'] = floatval($row['tarpos_x']);
		$row['tarpos_y'] = floatval($row['tarpos_y']);
		$row['tarpos_z'] = floatval($row['tarpos_z']);
		$data[] = $row;
	}

	// Convert data to JSON format
	$json_data = json_encode($data, JSON_PRETTY_PRINT);

	// Save JSON data to a file (e.g., artworks.json)
	$json_filename = 'assets/artworks.json';
	file_put_contents($json_filename, $json_data);

	// Close the database connection
	pg_close($connection);

	?>
	<!-- Import ANNOTATIONS-->
	<script src="js/annotations.js"></script>
	<!--Import ORIENTED IMAGES-->
	<script src="js/orientedcameras.js"></script>
	<!--Import MESH-->
	<!--<script type="module" src="js/mesh.js"></script>-->
</body>

</html>