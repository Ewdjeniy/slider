import './yRangeScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class YRangeScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();
    }
    
    setScaleValues(scaleValuesAmount, start, end, step, decimalPlaces, progressBarFontSize, runnerEl): void {
        
        const runnerHeight = parseFloat(getComputedStyle(runnerEl).height);
        
        let result: string = '<div class="scale-value" style="bottom: 0">' + start + '</div>';
        for (let i = 1; i < scaleValuesAmount - 1; i++) {
            const stepsAmountInOneValue = Math.round(((end - start) / step) / (scaleValuesAmount - 1));
            
            if (parseFloat(start + stepsAmountInOneValue * i * step) <= end) {
                result += '<div class="scale-value" style="bottom: ' + stepsAmountInOneValue * i * progressBarFontSize + 'px;">';
                result += parseFloat((start + stepsAmountInOneValue * i * step).toFixed(decimalPlaces));
                result += '</div>';  
            }
        }
        result += '<div class="scale-value end-value" style="top: calc(0px + ' + runnerHeight + 'px)">' + end + '</div>';
        this.scaleValuesEl.innerHTML = result;
        this.scaleValuesEl.style.marginTop = -1 * runnerHeight / 2 + 'px';
        
        let longestScaleValue = this.scaleValuesEl.getElementsByClassName('scale-value')[0];
        
        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;;
        for (let i = 0; i < scaleValues.length; i++) {
            scaleValues[i].style.bottom = parseFloat(scaleValues[i].style.bottom) - parseFloat(getComputedStyle(scaleValues[i]).height) / 2 + 'px';
            
            if (parseFloat(getComputedStyle(scaleValues[i]).width) > parseFloat(getComputedStyle(longestScaleValue).width)) {
                longestScaleValue = scaleValues[i];
            }
        }
        this.scaleValuesEl.style.width = getComputedStyle(longestScaleValue).width;
    }
    
    render(scaleEl, scaleValues): void {
        this.scaleValuesEl.className = scaleValues ? 'sсale-values y-range-scale-values y-range-sсale-values_on' : 'sсale-values y-range-scale-values'; 
        scaleEl.before(this.scaleValuesEl); 
    }
    
};

export default YRangeScaleValues;