import Output from '../output.ts';

class YOutput extends Output implements SliderOutput {

    constructor(input: HTMLInputElement) {
        super(input);
    }
    
    setCurrent(current, start, end): void {
        this.outputEl.value = current;        
    }
    
    countOutputValue(elBar, stepsAmount, start, end, step, decimalPlaces): number {
        let outputValue: number;
        
        if (parseInt(elBar.style.height) <= stepsAmount) {
            outputValue = +start + parseInt(elBar.style.height) * step;
        } else {
            outputValue = +end;
        }
        
        outputValue = parseFloat(outputValue.toFixed(decimalPlaces));
        this.outputEl.value = outputValue.toString();
        return outputValue;
    }
    
};

export default YOutput;