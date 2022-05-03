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
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(25, 13, 7), scene);

    // This targets the camera to scene origin
    camera.setTarget = new BABYLON.Vector3(20,0,20);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 11, 2), scene);
    var light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 11, 50), scene);
    //var light1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(23, 7, -30), scene);
    var light = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 7, 0), scene);


    // Default intensity is 1. Let's dim the light a small amount
    light1.intensity = .6;
    light.intensity = 1;

    //SkyBox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:400}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("BackRooms_Final/models/SkyBox/", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Ground Code from Professor Green!
    var groundTexture = new BABYLON.Texture("../models/ground.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;
    
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;
    
    var ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -1;
    ground.material = groundMaterial;

    // Water Code from Professor Green! Thank you!
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 16, scene, false);
    water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(1024, 1024));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("../models/SkyBox/waterbump.png", scene);
    water.windForce = -3;
    water.waveHeight = .5;
    water.bumpHeight = 0.1;
    water.waveLength = 1;
    water.colorBlendFactor = 0;
    water.addToRenderList(skybox);
    water.addToRenderList(ground)
    waterMesh.material = water;

    var room = placeObject('../models/', 'pool.obj',
        new BABYLON.Vector3(0, 0, 0), scene, 7);




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
