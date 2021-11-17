import './yTip.css';
import Tip from '../tip.ts';

class YTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end): void {
        if (current > end) {
            this.tipEl.innerHTML = end.toString();
        } else if (current < start) {
            this.tipEl.innerHTML = start.toString();      
        } else {
            this.tipEl.innerHTML = current.toString();        
        }
    }
    
    showTip(barEl, stepsAmount, start, end, step): number {
        let outputValue: number;
        
        if (parseInt(barEl.style.height) <= stepsAmount) {
            outputValue = +start + parseInt(barEl.style.height) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = outputValue.toString(); 
        return outputValue;
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip y-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default YTip;
