
  var dude = {};
  var speed = 0.3;
  var rotation_speed = 0.03;
  var left = 37;
  var forward = 38;
  var right = 39;
  var backward = 40;
  var shift = 16;
  BABYLON.SceneLoader.ImportMesh("him", "textures/Dude/", "Dude.babylon", scene, function (newMeshes2, particleSystems2, skeletons2) {
    dude = newMeshes2[0];
    dude.keysDown = {};
    dude.skeletons2 = skeletons2;

    for (var index = 0; index < newMeshes2.length; index++) {
      shadowGenerator.getShadowMap().renderList.push(newMeshes2[index]);
    }

    dude.rotation.y = Math.PI;
    dude.position = new BABYLON.Vector3(0, 0, 0);
    dude.position.y = ground.getHeightAtCoordinates(0, 0);
    dude.scaling.x = 0.2;
    dude.scaling.y = 0.2;
    dude.scaling.z = 0.2;

    dude.animationRunning = false;
    dude.run = function (speed) {
      if (dude.animationRunning) {
        dude.animationRunning = false;
        scene.stopAnimation(dude.skeletons2[0]);
      } else {
        dude.animationRunning = true;
        scene.beginAnimation(dude.skeletons2[0], 0, 100, true, speed);
      }
    };

    camera.lockedTarget = dude; // target any mesh or object with a "position" Vector3

    scene.registerBeforeRender(function () {
      if (left in dude.keysDown) {
        dude.rotation.y -= rotation_speed;
      } else if (right in dude.keysDown) {
        dude.rotation.y += rotation_speed;
      }
      if (backward in dude.keysDown) {
        dude.position.z += Math.cos(dude.rotation.y) * speed;
        dude.position.x += Math.sin(dude.rotation.y) * speed;
      } else if (forward in dude.keysDown) {
        dude.position.z -= Math.cos(dude.rotation.y) * speed;
        dude.position.x -= Math.sin(dude.rotation.y) * speed;
      }
