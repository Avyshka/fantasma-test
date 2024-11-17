import "../data/css/style.css";
import {App} from "./app/App";

function launchGame(): void {
    window.focus();
    new App();
}

window.onload = launchGame;