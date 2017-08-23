var createScene = function (engine, canvas) {
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 30, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 70, 120));
    light.position = new BABYLON.Vector3(20, 150, 70);
    camera.minZ = 10.0;

    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);


        // Dude
        BABYLON.SceneLoader.ImportMesh("him", "textures/Dude/", "Dude.babylon", scene, function (newMeshes2, particleSystems2, skeletons2) {
            var dude = newMeshes2[0];

            for (var index = 0; index < newMeshes2.length; index++) {
                shadowGenerator.getShadowMap().renderList.push(newMeshes2[index]);
            }

            dude.rotation.y = Math.PI;
            dude.position = new BABYLON.Vector3(0, 0, -80);

            scene.beginAnimation(skeletons2[0], 0, 100, true, 1.0);
        });

    return scene;
};
