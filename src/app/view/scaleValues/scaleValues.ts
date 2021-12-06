class ScaleValues {

    scaleValuesEl:  HTMLElement = document.createElement('div');;
    
    constructor() {
        
    }
    
    setScaleValues(scaleValuesAmount, start, end, step, decimalPlaces): void {
        if (scaleValuesAmount == 1) {
            this.scaleValuesEl.innerHTML = '<span class="scale-value first-value">' + start + '</span>'; 
        } else if (scaleValuesAmount == 2) {
            this.scaleValuesEl.innerHTML = '<span class="scale-value first-value">' + start + '</span>' + '<span class="scale-value last-value">' + end + '</span>';      
        } else if (scaleValuesAmount > 2) {
            let result: string = '<span class="scale-value first-value">' + start + '</span>';
            for (let i = 1; i < scaleValuesAmount - 1; i++) {
                result += '<span class="scale-value medium-value">';
                const stepsAmountInOneValue = Math.round(((end - start) / step) / (scaleValuesAmount - 1));
                result += parseFloat((start + stepsAmountInOneValue * i * step).toFixed(decimalPlaces));
                result += '</span>';
            }
            result += '<span class="scale-value last-value">' + end + '</span>';
            this.scaleValuesEl.innerHTML = result;
        }
    }
    
};

export default ScaleValues;