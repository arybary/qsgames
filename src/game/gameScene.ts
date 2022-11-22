import { Container, Sprite, Texture } from "pixi.js";
import { EnemiesData, getEnemies } from "./enemies";

export function getGameScene(): Container {
    const { enemies, scoreEnemies } = getEnemies() as EnemiesData;

    const gameScene = new Container();
    const bg = new Sprite(Texture.from("background.png"));
    bg.anchor.set(0, 0);
    gameScene.addChild(bg);

    const scoreBar = new Container();
    scoreBar.position.set(gameScene.width / 2 - scoreBar.width / 2, 22);

    const bgScoreBar = new Sprite(Texture.from("score.png"));
    scoreBar.addChild(bgScoreBar);
    scoreBar.addChild(scoreEnemies);
    gameScene.addChild(scoreBar);

    enemies.forEach((enemy: Container) => gameScene.addChild(enemy));

    return gameScene;
}
