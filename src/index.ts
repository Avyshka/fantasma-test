import "../data/css/style.css";
import {Context} from "./Context";

function launchGame(): void {
    window.focus();
    new Context().start();
}

window.onload = launchGame;