import {IAssociativeArray} from "../events/interfaces/IAssociativeArray";
import {UniqueUtils} from "./UniqueUtils";

export class Dictionary<KeyType extends object, ItemType> {
    protected map: IAssociativeArray<ItemType> = {};

    public get(key: KeyType): ItemType {
        const tempId: string = UniqueUtils.getObjectUniqueId(key);
        return this.map[tempId];
    }

    public add(key: KeyType, item: ItemType): void {
        const tempId: string = UniqueUtils.getObjectUniqueId(key);
        this.map[tempId] = item;
    }

    public remove(key: KeyType): void {
        const tempId: string = UniqueUtils.getObjectUniqueId(key);
        delete this.map[tempId];
    }

    public forEach(callbackFn: (value: ItemType) => void): void {
        const keys: string[] = Object.keys(this.map);
        const keysCount: number = keys.length;
        for (let keyIndex: number = 0; keyIndex < keysCount; keyIndex++) {
            const tempKey: string = keys[keyIndex];
            callbackFn(this.map[tempKey]);
        }
    }
}