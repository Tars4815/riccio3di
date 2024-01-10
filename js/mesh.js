import { PLYLoader } from "../libs/three.js/loaders/PLYLoader.js";

function loadOriginalGate(file_path, name, label) {
    var loader = new PLYLoader();
    loader.load(Potree.resourcePath + file_path, (geometry) => {
        geometry.computeVertexNormals();

        let mesh;
        {
            let material = new THREE.MeshNormalMaterial();
            mesh = new THREE.Mesh(geometry, material);
            mesh.scale.multiplyScalar(1);
            mesh.rotation.set(0, 0, 0)
            viewer.scene.scene.add(mesh);
            mesh.name = name;
            mesh.visible = false;
        }

        viewer.onGUILoaded(() => {
            // Add entries to object list in sidebar
            let tree = $(`#jstree_scene`);
            let parentNode = "other";

            let test_mesh = tree.jstree('create_node', parentNode, {
                "text": label,
                "icon": `${Potree.resourcePath}/icons/triangle.svg`,
                "data": mesh
            },
                "last", false, false);
            tree.jstree(mesh.visible ? "check_node" : "uncheck_node", test_mesh);
        });
    })

}

loadOriginalGate("/models/fence.ply", "Gate", "Gate")