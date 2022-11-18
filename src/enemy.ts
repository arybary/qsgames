import { Spine } from "pixi-spine";
import { Container, Loader } from "pixi.js";

const getEnemy = (x: number, y: number): Container => {
    if (!Loader.shared.resources.enemy.spineData) {
        throw new Error("Pixie spine is not loaded");
    }

    const dragon = new Spine(Loader.shared.resources.enemy.spineData);
    dragon.scale.set(0.3);
    dragon.position.set(x, y);
    dragon.state.setAnimation(0, "flying", true);
    dragon.interactive = true;
    dragon.buttonMode = true;
    return dragon;
};

export default getEnemy;
