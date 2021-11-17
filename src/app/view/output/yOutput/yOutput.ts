import Output from '../output.ts';

class YOutput extends Output implements SliderOutput {

    constructor(input: HTMLInputElement) {
        super(input);
    }
    
    setCurrent(current, start, end): void {
        if (current > end) {
            this.outputEl.value = end.toString();
        } else if (current < start) {
            this.outputEl.value = start.toString();      
        } else {
            this.outputEl.value = current.toString();        
        }
    }
    
    countOutputValue(elBar, stepsAmount, start, end, step): number {
        let outputValue: number;
        
        if (parseInt(elBar.style.height) <= stepsAmount) {
            outputValue = +start + parseInt(elBar.style.height) * step;
        } else {
            outputValue = +end;
        }
        
        this.outputEl.value = outputValue.toString(); 
        return outputValue;
    }
    
};

export default YOutput;