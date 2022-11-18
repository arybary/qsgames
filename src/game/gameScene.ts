import { Spine } from "pixi-spine";
import { Container, Sprite, Texture, Loader } from "pixi.js";
import { getEnemy, killEnemy } from "./enemy";
import { getScore } from "./scoreBar";

export function getGameScene(): Container {
    const enemiesPositions = Loader.shared.resources.positions.data;
    let enemiesAmount = enemiesPositions.length;

    const gameScene = new Container();
    const bg = new Sprite(Texture.from("background.png"));
    bg.anchor.set(0, 0);
    gameScene.addChild(bg);

    const scoreBar = new Container();
    scoreBar.position.set(gameScene.width / 2 - scoreBar.width / 2, 22);
    gameScene.addChild(scoreBar);

    const bgScoreBar = new Sprite(Texture.from("score.png"));
    scoreBar.addChild(bgScoreBar);

    const scoreEnemy = getScore(enemiesAmount);
    scoreBar.addChild(scoreEnemy);

    const handlerClickKillEnemy = (enemy: Spine) => {
        enemiesAmount -= 1;
        scoreEnemy.text = enemiesAmount;

        gameScene.removeChild(enemy);

        const xPos = enemy.x - 50;
        const yPos = enemy.y - 50;
        const kill = killEnemy(xPos, yPos);
        gameScene.addChild(kill);

        if (enemiesAmount === 0) {
            alert(`Game END`);
            location.reload();
        }
    };

    enemiesPositions.forEach((pos: { x: number; y: number; name: string }) => {
        const { x, y, name } = pos;
        const loaderEnemy = Loader.shared.resources[name];
        console.log(loaderEnemy);

        const enemy = getEnemy(x, y, loaderEnemy, 0.1);

        gameScene.addChild(enemy);

        enemy.on("pointerdown", () => handlerClickKillEnemy(enemy));
    });

    return gameScene;
}
