import './xRangeTip.css';
import Tip from '../tip.ts';

class XRangeTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end, i): void {
        this.tipEl.innerHTML = current[i];        
    }
    
    showTip(barEl, stepsAmount, start, end, step, decimalPlaces): number {
        let outputValue: number;
        
        if (parseInt(barEl.style.width) <= stepsAmount) {
            outputValue = +start + parseInt(barEl.style.width) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = parseFloat(outputValue.toFixed(decimalPlaces)).toString(); 
        return outputValue;
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip x-range-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default XRangeTip;
