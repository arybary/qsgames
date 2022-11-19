import { Spine } from "pixi-spine";
import { AnimatedSprite, Loader, LoaderResource, Texture } from "pixi.js";

export const getEnemy = (x: number, y: number, loader: LoaderResource, size: number): Spine => {
    if (!loader.spineData) {
        throw new Error("Enemy spine is not loaded");
    }

    const enemy = new Spine(loader.spineData);

    const { name } = loader.spineData.animations[0];
    enemy.state.setAnimation(0, name, true);

    enemy.scale.set(size);
    enemy.position.set(x, y);
    enemy.interactive = true;
    enemy.buttonMode = true;

    return enemy;
};

export const killEnemy = (x: number, y: number): AnimatedSprite => {
    const killNameTextures = Object.keys(Loader.shared.resources.kill.data.frames);
    const killTextures = killNameTextures.map((texture) => Texture.from(texture));

    const enemyKill = new AnimatedSprite(killTextures);

    enemyKill.scale.set(0.3);
    enemyKill.position.set(x, y);
    enemyKill.loop = false;
    enemyKill.animationSpeed = 0.25;
    enemyKill.play();
    
    return enemyKill;
};
