import "../data/css/style.css";
import {Context} from "./app/Context";

function launchGame(): void {
    window.focus();
    new Context().start();
}

window.onload = launchGame;