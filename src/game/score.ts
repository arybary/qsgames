import { TextStyle, Text } from "pixi.js";

export const getScore = (amount: number): Text => {
    const style = new TextStyle({
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
    });

    const score = new Text(amount, style);
    score.x = -score.width / 2;
    score.y = -score.height / 2 - 1;

    return score;
};
