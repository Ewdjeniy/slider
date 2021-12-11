import './yRangeTip.css';
import Tip from '../tip.ts';

class YRangeTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end, i): void {
        this.tipEl.innerHTML = current[i];        
    }
    
    showTip(barEl, stepsAmount, start, end, step, decimalPlaces): number {
        let outputValue: number;
        
        if (parseInt(barEl.style.height) <= stepsAmount) {
            outputValue = +start + parseInt(barEl.style.height) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = parseFloat(outputValue.toFixed(decimalPlaces)).toString(); 
        return outputValue;
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip y-range-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default YRangeTip;
