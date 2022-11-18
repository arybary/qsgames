import { Spine } from "pixi-spine";
import { AnimatedSprite, Loader, LoaderResource, Texture } from "pixi.js";

export const getEnemy = (x: number, y: number, loader: LoaderResource, animateName: string, size: number): Spine => {
    if (!loader.spineData) {
        throw new Error("Enemy spine is not loaded");
    }

    const enemy = new Spine(loader.spineData);
    enemy.scale.set(size);
    enemy.position.set(x, y);
    enemy.state.setAnimation(0, animateName, true);
    enemy.interactive = true;
    enemy.buttonMode = true;
    return enemy;
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
