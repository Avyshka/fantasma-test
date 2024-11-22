import {TextStyleOptions} from "../export";

export const WinBoxConstants = {
    TICK_UP_TIME: 1,
    DELAY_BEFORE_HIDE: 1500,
    DELAY_BEFORE_HIDE_IN_TERMINATE: 1000,

    textStyle: {
        fontFamily: "Verdana",
        fontSize: 64,
        fontWeight: "bold",
        fill: ["#ceff00", "#00ff99"],
        align: "center",
        stroke: "#5c3762",
        strokeThickness: 7,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 8,
    } as TextStyleOptions
};