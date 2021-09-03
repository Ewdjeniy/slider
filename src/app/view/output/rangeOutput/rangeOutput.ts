import './rangeOutput.css';
import {Output} from '../output.ts';

export class RangeOutput extends Output {
    constructor(input: HTMLInputElement, sliderState: any) {
        super(input, sliderState);
        this.setCurrent();
    }
    
    setCurrent(): void {
        this.sliderState.sliderSettings.current.forEach((value) => {
            if (value > this.sliderState.sliderSettings.end) {
                value = this.sliderState.sliderSettings.end;
            } else if (value < this.sliderState.sliderSettings.start) {
                value = this.sliderState.start;      
            }
        })
        this.outputEl.value = this.sliderState.sliderSettings.current[0] + this.sliderState.sliderSettings.separator + this.sliderState.sliderSettings.current[1];
    }
    
    countOutputValue(): [number, number] {
        let outputValue: [number, number] = [0, 0];
        
        if (parseFloat(this.sliderState.progressBars[0].progressBarEl.style.width) <= this.sliderState.stepsAmount) {
            outputValue[0] = this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue[0] = this.sliderState.sliderSettings.end;
        }
        
        if (parseFloat(this.sliderState.progressBars[1].progressBarEl.style.width) <= this.sliderState.stepsAmount) {
            outputValue[1] = this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[1].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue[1] = this.sliderState.sliderSettings.end;
        }
        
        if (this.sliderState.sliderSettings.range) {
            this.outputEl.value = outputValue[0].toString() + this.sliderState.sliderSettings.separator + outputValue[1].toString();
        } else {
            this.outputEl.value = outputValue[0].toString(); 
        }
        return outputValue;
    }
};