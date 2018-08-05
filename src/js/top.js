const matter = require("matter-js");
const game = require("./game/game.js");
const world = game.build(matter);
const controller = require("./game/controller.js");
const camera = require("./game/camera.js");
controller.build(world, matter, camera.camera);

