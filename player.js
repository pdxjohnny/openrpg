var Keyboard = {
  left: 37,
  forward: 38,
  right: 39,
  backward: 40,
  shift: 16
};

class Player {
  constructor (path1, path2) {
    this.path1 = path1;
    this.path2 = path2;
    this.speed = 0.3;
    this.rotation_speed = 0.03;
  }

  load (scene) {
    return new Promise(function(resolve, reject) {
      BABYLON.SceneLoader.ImportMesh("him", "textures/Dude/", "Dude.babylon", scene, function (newMeshes2, particleSystems2, skeletons2) {
        this = newMeshes2[0];
        this.keysDown = {};
        this.skeletons2 = skeletons2;

        for (var index = 0; index < newMeshes2.length; index++) {
          shadowGenerator.getShadowMap().renderList.push(newMeshes2[index]);
        }

        this.rotation.y = Math.PI;
        this.position = new BABYLON.Vector3(0, 0, 0);
        this.position.y = ground.getHeightAtCoordinates(0, 0);
        this.scaling.x = 0.2;
        this.scaling.y = 0.2;
        this.scaling.z = 0.2;

        this.animationRunning = false;
        this.run = function (speed) {
          if (this.animationRunning) {
            this.animationRunning = false;
            scene.stopAnimation(this.skeletons2[0]);
          } else {
            this.animationRunning = true;
            scene.beginAnimation(this.skeletons2[0], 0, 100, true, speed);
          }
        };

        scene.registerBeforeRender(this.update);

        // Register events with the right Babylon function
        BABYLON.Tools.RegisterTopRootEvents([{
          name: "keydown",
          handler: function (event) {
            this.keysDown[event.keyCode] = true;
          }
        }, {
          name: "keyup",
          handler: function (event) {
            delete this.keysDown[event.keyCode];
          }
        }]);
      });

			// do a thing, possibly async, then…
			if (/* everything turned out fine */) {
				resolve("Stuff worked!");
			}
			else {
				reject(Error("It broke"));
			}
    });
  }

  update () {
    if (Keyboard.left in this.keysDown) {
      this.rotation.y -= rotation_speed;
    } else if (Keyboard.right in this.keysDown) {
      this.rotation.y += rotation_speed;
    }
    if (Keyboard.backward in this.keysDown) {
      this.position.z += Math.cos(this.rotation.y) * speed;
      this.position.x += Math.sin(this.rotation.y) * speed;
    } else if (Keyboard.forward in this.keysDown) {
      this.position.z -= Math.cos(this.rotation.y) * speed;
      this.position.x -= Math.sin(this.rotation.y) * speed;
    }
  }
};
