import Output from '../output.ts';

class XOutput extends Output implements SliderOutput {

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
        
        if (parseInt(elBar.style.width) <= stepsAmount) {
            outputValue = +start + parseInt(elBar.style.width) * step;
        } else {
            outputValue = +end;
        }
        
        this.outputEl.value = outputValue.toString(); 
        return outputValue;
    }
    
};

export default XOutput;