import { Application, Loader } from "pixi.js";
import { getGameScene } from "./game/gameScene";
import "./style.css";

const gameWidth = 512;
const gameHeight = 512;

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
    antialias: true,
});

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("scene", "./assets/scene.json");
        loader.add("dragon", "./assets/enemy/dragon.json");
        loader.add("axie", "./assets/enemy/axie.json");
        loader.add("positions", "./assets/positions.json");
        loader.add("kill", "./assets/killEnemy/mc.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

window.onload = async (): Promise<void> => {
    document.title = "Test QS games";
    await loadGameAssets();

    document.body.appendChild(app.view);

    const gameScene = getGameScene();
    app.stage.addChild(gameScene);
    app.stage.interactive = true;
};
