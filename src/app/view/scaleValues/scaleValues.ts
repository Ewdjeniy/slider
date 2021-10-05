class ScaleValues {

    scaleValuesEl:  HTMLElement = document.createElement('div');;
    
    constructor() {
        
    }
    
    setScaleValues(scaleValuesAmount, start, end): void {
        if (scaleValuesAmount == 1) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + start + '</span>'; 
        } else if (scaleValuesAmount == 2) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + start + '</span>' + '<span class="scale-last-value">' + end + '</span>';      
        } else if (scaleValuesAmount > 2) {
            let result: string = '<span class="scale-first-value">' + start + '</span>';
            for (let i = 1; i < scaleValuesAmount - 1; i++) {
                result += '<span class="scale-value">';
                result += Math.round(+start + ((+end - (+start))  / (scaleValuesAmount - 1)) * i);
                result += '</span>';
            }
            result += '<span class="scale-last-value">' + end + '</span>';
            this.scaleValuesEl.innerHTML = result;
        }
    }
    
};

export default ScaleValues;