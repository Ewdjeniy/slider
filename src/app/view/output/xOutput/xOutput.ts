import Output from '../output.ts';

class XOutput extends Output implements SliderOutput {

    constructor(options: Object) {
        super(options);
        this.setValue(options.current);
    }
    
    setValue(value): void {
        this.outputEl.value = value.toString();        
    }
    
    countOutputValue(elBar, stepsAmount, start, end, step, decimalPlaces): number {
        let outputValue: number;
        
        if (parseInt(elBar.style.width) <= stepsAmount) {
            outputValue = +start + parseInt(elBar.style.width) * step;
        } else {
            outputValue = +end;
        }
        
        outputValue = parseFloat(outputValue.toFixed(decimalPlaces));
        this.outputEl.value = outputValue.toString();
        return outputValue;
    }
    
};

export default XOutput;