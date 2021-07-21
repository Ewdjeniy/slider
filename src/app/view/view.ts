import {Scale} from './scale/scale.ts';
import {Runner} from './runner/runner.ts';
import {Progress} from './progress/progress.ts';

export class ToxinSliderView {
    input: HTMLInputElement;
    
    sliderState: any = {
        'start': 0,
        'end': 100,
    };
    
    constructor(el: HTMLInputElement) {
        this.input = el;
        const scale = new Scale(this.input, this.sliderState);
        const runner = new Runner(scale.el);
        const progress = new Progress(el, runner.el);
    }
}