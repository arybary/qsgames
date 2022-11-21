import { Spine } from "pixi-spine";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";

export const getEnemySpine = (enemyLoader: LoaderResource, size: number): Spine => {
    if (!enemyLoader.spineData) {
        throw new Error("Enemy spine is not loaded");
    }

    const enemy = new Spine(enemyLoader.spineData);

    const { name } = enemyLoader.spineData.animations[0];
    enemy.state.setAnimation(0, name, true);
    enemy.scale.set(size);
    enemy.interactive = true;
    enemy.buttonMode = true;
    enemy.cursor= "url(/assets/cursor.png), pointer";
    return enemy;
};

export const getKillAnimeted = (killLoader: LoaderResource, size: number): AnimatedSprite => {
    if (!killLoader) {
        throw new Error("Kill animated is not loaded");
    }
    const killNameTextures = Object.keys(killLoader.data.frames);
    const killTextures = killNameTextures.map((texture) => Texture.from(texture));
    const enemyKill = new AnimatedSprite(killTextures);

    enemyKill.scale.set(size);
    enemyKill.loop = false;
    enemyKill.animationSpeed = 0.25;
    enemyKill.play();
    return enemyKill;
};
