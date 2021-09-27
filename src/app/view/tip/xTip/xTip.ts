import './xTip.css';
import Tip from '../tip.ts';

class XTip extends Tip implements SliderTip {   
    
    constructor(index: number, sliderState: SliderState) {
        super(index, sliderState);
        this.renderTip();
        this.setCurrent();
    }
    
    
    showTip(): number {
        let outputValue: number;
        
        if (parseInt(this.sliderState.progressBars[this.index].progressBarEl.style.width) <= this.sliderState.stepsAmount) {
            outputValue = +this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[this.index].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue = +this.sliderState.sliderSettings.end;
        }
        
        this.tipEl.innerHTML = outputValue.toString(); 
        return outputValue;
    }
    
    setCurrent(): void {
        if (this.sliderState.sliderSettings.current > this.sliderState.sliderSettings.end) {
            this.tipEl.innerHTML = this.sliderState.sliderSettings.end.toString();
        } else if (this.sliderState.sliderSettings.current < this.sliderState.sliderSettings.start) {
            this.tipEl.innerHTML = this.sliderState.sliderSettings.start.toString();      
        } else {
            this.tipEl.innerHTML = this.sliderState.sliderSettings.current.toString();        
        }
    }
    
    renderTip(): void {
        this.tipEl.className = "x-tip";
        this.sliderState.runners[this.index].runnerEl.append(this.tipEl);
    }
    
};

export default XTip;
