import { Spine } from "pixi-spine";
import { AnimatedSprite, Loader, Texture } from "pixi.js";

export const getEnemy = (x: number, y: number): Spine => {
    if (!Loader.shared.resources.enemy.spineData) {
        throw new Error("Enemy spine is not loaded");
    }

    const dragon = new Spine(Loader.shared.resources.enemy.spineData);
    dragon.scale.set(0.1);
    dragon.position.set(x, y);
    dragon.state.setAnimation(0, "flying", true);
    dragon.interactive = true;
    dragon.buttonMode = true;
    return dragon;
};

export const killEnemy = (x: number, y: number): AnimatedSprite => {
    const killNameTextures = Object.keys(Loader.shared.resources.kill.data.frames);
    const killTextures = killNameTextures.map((texture) => Texture.from(texture));

    const enemyKill = new AnimatedSprite(killTextures);
    enemyKill.x = x;
    enemyKill.y = y;
    enemyKill.loop = false;
    enemyKill.animationSpeed = 0.2;
    enemyKill.play();
    enemyKill.scale.set(0.5);
    return enemyKill;
};
