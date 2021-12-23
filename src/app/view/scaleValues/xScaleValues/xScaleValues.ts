import './xScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class XScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();

        this.setScaleValuesMod();
        
    }
    
    setScaleValuesMod(): void {
        this.scaleValuesEl.className = this.scaleValuesModTurner == 'number' ? 'sсale-values x-scale-values x-sсale-values_numbers' : 'sсale-values x-scale-values x-sсale-values_lines';
    }
    
    setScaleValues(scaleValuesAmount, start, end, step, decimalPlaces, progressBarFontSize, runnerEl): void {
        
        const runnerWidth = parseFloat(getComputedStyle(runnerEl).width);
        
        let result: string = '<div class="scale-value" style="left: 0">' + start + '</div>';
        for (let i = 1; i < scaleValuesAmount - 1; i++) {
            const stepsAmountInOneValue = Math.round(((end - start) / step) / (scaleValuesAmount - 1));
            
            if (parseFloat(start + stepsAmountInOneValue * i * step) <= end) {
                result += '<div class="scale-value" style="left: ' + stepsAmountInOneValue * i * progressBarFontSize + 'px;">';
                result += parseFloat((start + stepsAmountInOneValue * i * step).toFixed(decimalPlaces));
                result += '</div>';  
            }
        }
        result += '<div class="scale-value end-value" style="right: calc(0px + ' + runnerWidth / 2 + 'px)">' + end + '</div>';
        this.scaleValuesEl.innerHTML = result;
        this.scaleValuesEl.style.marginLeft = runnerWidth / 2 + 'px';
        this.scaleValuesEl.style.height = getComputedStyle(this.scaleValuesEl.getElementsByClassName('scale-value')[0]).height;
        
        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;;
        for (let i = 0; i < scaleValues.length; i++) {
            scaleValues[i].style.left = parseFloat(scaleValues[i].style.left) - parseFloat(getComputedStyle(scaleValues[i]).width) / 2 + 'px';
        }
    }
    
    render(scaleEl, scaleValues): void {
        this.scaleValuesEl.className = scaleValues ? 'sсale-values x-scale-values x-sсale-values_on' : 'sсale-values x-scale-values';
        
        scaleEl.after(this.scaleValuesEl);
    }
    
};

export default XScaleValues;
