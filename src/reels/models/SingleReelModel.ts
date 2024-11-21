import {TileView} from "../views/TileView";

export class SingleReelModel {
    private tiles: TileView[] = [];

    public addTile(tile: TileView): void {
        this.tiles.push(tile);
    }

    public getTiles(): TileView[] {
        return this.tiles
            .slice()
            .sort((tile1: TileView, tile2: TileView) => tile1.y - tile2.y);
    }
}