import {TweenMax} from "gsap";

export class Tween {
    static to(target: Object, duration: number, vars: object): Promise<any> {
        return new Promise(resolve => {
            TweenMax.to(target, duration, (<any>Object).assign({}, vars, {
                onComplete: resolve
            }));
        });
    }
}