import './xTip.css';
import Tip from '../tip.ts';

class XTip extends Tip implements SliderTip {   
    
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
        
        if (parseInt(barEl.style.width) <= stepsAmount) {
            outputValue = +start + parseInt(barEl.style.width) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = outputValue.toString(); 
        return outputValue;
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip x-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default XTip;
