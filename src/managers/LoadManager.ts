import {AppConstants} from "../app/AppConstants";

export class LoadManager {
    private loader: PIXI.loaders.Loader = PIXI.loaders.shared;

    public readonly onAssetsLoaded: Promise<void>;

    private assetsResolve: () => void;

    constructor() {
        this.onAssetsLoaded = new Promise((resolve) => this.assetsResolve = resolve);
    }

    public loadAssets(): Promise<void> {
        this.loader.add(AppConstants.pathToAssets);
        this.loader.onProgress.add(this.onProgress.bind(this));
        this.loader.onComplete.once(this.onComplete.bind(this));
        this.loader.load();

        return this.onAssetsLoaded;
    }

    private onProgress(): void {
        console.log(`Loading: ${Math.floor(this.loader.progress)}%`);
    }

    private onComplete(): void {
        this.loader.onProgress.detachAll();
        this.assetsResolve();
    }
}