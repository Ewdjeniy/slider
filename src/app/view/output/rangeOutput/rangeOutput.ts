import './rangeOutput.css';
import {Output} from '../output.ts';

export class RangeOutput extends Output {
    constructor(input: HTMLInputElement, sliderState: any) {
        super(input, sliderState);
    }
    
    countOutputValue(): [number, number] {
        let outputValue: [number, number] = [0, 0];
        let size: string;
        
        if (parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) <= this.sliderState.countStepsAmount()) {
            outputValue[0] = this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue[0] = this.sliderState.sliderSettings.end;
        }
        
        if (this.sliderState.progressBars[1] && parseInt(this.sliderState.progressBars[1].progressBarEl.style.width) <= this.sliderState.countStepsAmount()) {
            outputValue[1] = this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[1].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue[1] = this.sliderState.sliderSettings.end;
        }
        
        if (this.sliderState.sliderSettings.range) {
            this.outputEl.value = outputValue[0].toString() + ' - ' + outputValue[1].toString();
        } else {
            this.outputEl.value = outputValue[0].toString(); 
        }
        return outputValue;
    }
};