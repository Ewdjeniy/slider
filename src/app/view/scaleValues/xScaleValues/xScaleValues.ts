import './xScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class XScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();

    }
    
    setScaleValues(scaleValuesAmount, start, end, step, decimalPlaces, progressBarFontSize): void {
        if (scaleValuesAmount == 1) {
            this.scaleValuesEl.innerHTML = '<span class="scale-value first-value">' + start + '</span>'; 
        } else if (scaleValuesAmount == 2) {
            this.scaleValuesEl.innerHTML = '<span class="scale-value first-value">' + start + '</span>' + '<span class="scale-value last-value">' + end + '</span>';      
        } else if (scaleValuesAmount > 2) {
            let result: string = '<span class="scale-value first-value">' + start + '</span>';
            for (let i = 1; i < scaleValuesAmount - 1; i++) {
                const stepsAmountInOneValue = Math.round(((end - start) / step) / (scaleValuesAmount - 1));
                result += '<span class="scale-value medium-value" style="left: ' + stepsAmountInOneValue * i *  progressBarFontSize + 'px;">';
                result += parseFloat((start + stepsAmountInOneValue * i * step).toFixed(decimalPlaces));
                result += '</span>';
            }
            result += '<span class="scale-value last-value">' + end + '</span>';
            this.scaleValuesEl.innerHTML = result;
            const mediumValues = this.scaleValuesEl.getElementsByClassName('medium-value') as HTMLCollectionOf<HTMLElement>;;
            for (let i = 0; i < mediumValues.length; i++) {
                mediumValues[i].style.left = parseFloat(mediumValues[i].style.left) - parseFloat(getComputedStyle(mediumValues[i]).width) / 2 + 'px';
            }
        }
    }
    
    render(scaleEl, scaleValues): void {
        this.scaleValuesEl.className = scaleValues ? 'sсale-values x-scale-values x-sсale-values_on' : 'sсale-values x-scale-values';
        
        scaleEl.after(this.scaleValuesEl);
    }
    
};

export default XScaleValues;
