import './yTip.css';
import Tip from '../tip.ts';

class YTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end): void {
        this.tipEl.innerHTML = current;        
    }
    
    showTip(barEl, stepsAmount, start, end, step, decimalPlaces): number {
        let outputValue: number;
        
        if (parseInt(barEl.style.height) < stepsAmount) {
            outputValue = +start + parseInt(barEl.style.height) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = outputValue.toFixed(decimalPlaces); 
        return outputValue;
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip y-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default YTip;
