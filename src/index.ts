import { Spine } from "pixi-spine";
import { Application, Loader, Texture, Container, Sprite, TextStyle, Text, AnimatedSprite } from "pixi.js";
import getEnemy from "./enemy";
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
        loader.add("rabbit", "./assets/atlas.json");
        loader.add("enemy", "./assets/enemy/dragon.json", {
            metadata: { spineSkeletonScale: 0.5 },
            crossOrigin: "anonymous",
        });
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

const killEnemy = (x: number, y: number): AnimatedSprite => {
    const explosionTextures = [];

    for (let i = 0; i < 26; i += 1) {
        const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
        explosionTextures.push(texture);
    }
    const enemyKill = new AnimatedSprite(explosionTextures);
    enemyKill.x = x;
    enemyKill.y = y;
    enemyKill.loop = false;
    enemyKill.animationSpeed = 0.1;
    enemyKill.play();
    enemyKill.scale.set(0.5);
    return enemyKill;
};

function getGameScene(): Container {
    const gameScene = new Container();
    const timerStart = new Date();
    const bg = new Sprite(Texture.from("background.png"));
    bg.anchor.set(0, 0);
    gameScene.addChild(bg);
    const scoreBar = new Container();
    scoreBar.position.set(gameScene.width / 2 - scoreBar.width / 2, 22);
    gameScene.addChild(scoreBar);

    const bgScoreBar = new Sprite(Texture.from("score.png"));
    scoreBar.addChild(bgScoreBar);

    const style = new TextStyle({
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
    });

    const enemysPositions = Loader.shared.resources.positions.data;

    let valueScore = enemysPositions.length;
    const score = new Text(valueScore, style);
    score.x = -score.width / 2;
    score.y = -score.height / 2 - 1;
    scoreBar.addChild(score);

    function handlerClick(enemy: Spine) {
        if (valueScore === 1) {
            alert("Game END");
            location.reload();
        }
        valueScore -= 1;
        score.text = valueScore;
        score.x = -score.width / 2;
        score.y = -score.height / 2;
        gameScene.removeChild(enemy);
        const xPos = enemy.x - 50;
        const yPos = enemy.y - 50;
        const kill = killEnemy(xPos, yPos);
        gameScene.addChild(kill);
    }
    enemysPositions.forEach((pos: { x: number; y: number }) => {
        const { x, y } = pos;

        const enemy = getEnemy(x, y);

        gameScene.addChild(enemy);
        enemy.on("click", () => handlerClick(enemy));
    });

    return gameScene;
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    const birdFromSprite = getGameScene();

    app.stage.addChild(birdFromSprite);

    app.stage.interactive = true;
};
