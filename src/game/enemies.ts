import { Container, Loader } from "pixi.js";
import { getEnemySpine, getKillAnimeted } from "./enemy";
import { getScore } from "./score";

export const getEnemies = () => {
    const loaderAssets = Loader.shared.resources;

    const enemiesPositions = loaderAssets.positions.data;

    let enemiesAmount = enemiesPositions.length;
    const scoreEnemies = getScore(enemiesAmount);

    const handlerClickKillEnemy = (enemyForGame: Container) => {
        enemiesAmount -= 1;
        scoreEnemies.text = enemiesAmount;

        enemyForGame.removeChildren();

        const killLoader = loaderAssets.kill;
        const killEnemyAnimated = getKillAnimeted(killLoader, 0.4);
        const xPos = enemyForGame.width / 2 - killEnemyAnimated.width / 2;
        const yPos = enemyForGame.height / 2 - killEnemyAnimated.height / 2;

        killEnemyAnimated.position.set(xPos, yPos);
        enemyForGame.addChild(killEnemyAnimated);

        if (enemiesAmount === 0) {
            alert(`Game END`);
            location.reload();
        }
    };

    const enemies = enemiesPositions.map((pos: { id: number; x: number; y: number; name: string }) => {
        const { x, y, name } = pos;
        const enemyForGame = new Container();
        enemyForGame.position.set(x, y);
        const loaderAssetEnemy = loaderAssets[name];
        const enemy = getEnemySpine(loaderAssetEnemy, 0.12);

        enemyForGame.addChild(enemy);

        enemy.on("pointerdown", () => handlerClickKillEnemy(enemyForGame));

        return enemyForGame;
    });
    return { enemies, scoreEnemies };
};
