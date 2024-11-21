import {SingleReelModel} from "./SingleReelModel";

export class ReelsViewModel {
    private static instance: ReelsViewModel;

    public singleReelModels: SingleReelModel[] = [];

    private constructor() {
    }

    public static getInstance(): ReelsViewModel {
        if (!ReelsViewModel.instance) {
            ReelsViewModel.instance = new ReelsViewModel();
        }
        return ReelsViewModel.instance;
    }
}