import './yScale.css';
import {Scale} from '../scale.ts';

export class YScale extends Scale{
    constructor(sliderState: any) {
        super(sliderState);
        this.renderScale();
    }
    
    renderScale(): void {
        const div:  any = document.createElement('div');
        div.className = 'yScale'; 
        div.innerHTML = this.scaleHTML;
        this.sliderState.output.outputEl.after(div);
        this.scaleEl = div.getElementsByClassName('scale')[0];
        this.scaleValuesEl = div.getElementsByClassName('scale-values')[0];
    }
    
    countScaleStep(runnerEl): number {
        return (parseInt(getComputedStyle(this.scaleEl).height) * this.sliderState.stepsCoefficient - parseInt(getComputedStyle(runnerEl).height)) / this.sliderState.stepsAmount;
    }
    
};
