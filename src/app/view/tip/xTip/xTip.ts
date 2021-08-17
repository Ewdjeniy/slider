import './xTip.css';
import {Tip} from '../tip.ts';

export class XTip extends Tip {   
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.renderTip();
        this.setCurrent(this.sliderState.sliderSettings.current);
    }
    
    
    showTip(): number {
        let outputValue: number;
        
        if (parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) <= this.sliderState.stepsAmount) {
            outputValue = +this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue = +this.sliderState.sliderSettings.end;
        }
        
        this.tipEl.innerHTML = outputValue.toString(); 
        return outputValue;
    }
    
    setCurrent(value: number): void {
        if (value > this.sliderState.sliderSettings.end) {
            this.tipEl.innerHTML = this.sliderState.sliderSettings.end;
        } else if (value < this.sliderState.sliderSettings.start) {
            this.tipEl.innerHTML = this.sliderState.start;      
        } else {
            this.tipEl.innerHTML = value.toString();        
        }
    }
    
    renderTip(): void {
        this.tipEl.className = "x-tip";
        this.sliderState.runners[this.index].runnerEl.append(this.tipEl);
    }
    
};
