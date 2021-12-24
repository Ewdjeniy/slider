import './xTip.css';
import Tip from '../tip.ts';

class XTip extends Tip implements SliderTip {   
    
    constructor(options) {
        super(options);
        this.tipEl.className = "tip x-tip";
        this.setValue(options.current);
    }
    
    setValue(value): void {
        this.tipEl.innerHTML = value;        
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

    
};

export default XTip;
