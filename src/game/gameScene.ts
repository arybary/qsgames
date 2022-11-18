import { Spine } from "pixi-spine";
import { Container, Sprite, TextStyle, Texture, Text, Loader } from "pixi.js";
import { getEnemy, killEnemy } from "./enemy";

export function getGameScene(): Container {
    const enemiesPositions = Loader.shared.resources.positions.data;
    let enemiesAmount = enemiesPositions.length;

    const gameScene = new Container();
    const bg = new Sprite(Texture.from("background.png"));
    bg.anchor.set(0, 0);
    gameScene.addChild(bg);
    gameScene.cursor = "url('../../assets/bunny.png'),auto";

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

    const score = new Text(enemiesAmount, style);
    score.x = -score.width / 2;
    score.y = -score.height / 2 - 1;
    scoreBar.addChild(score);

    function handlerClickKillEnemy(enemy: Spine) {
        enemiesAmount -= 1;
        score.text = enemiesAmount;
        score.x = -score.width / 2;
        score.y = -score.height / 2;
        gameScene.removeChild(enemy);
        const xPos = enemy.x - 50;
        const yPos = enemy.y - 50;
        const kill = killEnemy(xPos, yPos);
        gameScene.addChild(kill);
        if (enemiesAmount === 0) {
            alert(`Game END`);
            location.reload();
        }
    }
    enemiesPositions.forEach((pos: { x: number; y: number }) => {
        const { x, y } = pos;

        const enemy = getEnemy(x, y);

        gameScene.addChild(enemy);
        enemy.on("pointerdown", () => handlerClickKillEnemy(enemy));
    });

    return gameScene;
}
