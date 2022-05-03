var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-4, 5, -2), scene);

    // This targets the camera to scene origin
    camera.setTarget = new BABYLON.Vector3(10,3,10);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 7, 2), scene);
    //var light1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(23, 7, -30), scene);
    var light2 = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(10, 7, -10), scene);


    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = .5;
    //light1.intensity = .8;

    var room = placeObject('../models/', 'Room.obj',
        new BABYLON.Vector3(0, 0, 0), scene, 7);

    //Adapted from https://www.babylonjs-playground.com/#FFVJW9#0
    // GUI
    var plane = BABYLON.Mesh.CreatePlane("plane", 2);
    plane.position.y = 5;
    plane.position.x = 10;
    plane.position.z = -2.5;
    plane.rotation.y = 1.5;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "come back");
    button1.width = 2;
    button1.height = 0.2;
    button1.color = "red";
    button1.fontSize = 100;
    button1.background = "white";
    button1.onPointerUpObservable.add(function() {
        window.open("../Opening/index.html");
    });
    advancedTexture.addControl(button1);


    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
