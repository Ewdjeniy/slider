import Output from '../output.ts';

class YRangeOutput extends Output implements SliderOutput {
    constructor(input: HTMLInputElement) {
        super(input);
    }
    
    setCurrent(current, start, end, separator): void {
        current.forEach((value) => {
            if (value > end) {
                value = end;
            } else if (value < start) {
                value = start;      
            }
        })
        this.outputEl.value = current[0] + separator + current[1];
    }
    
    countOutputValue(elBar, stepsAmount, start, end, step, secondElBar, separator): [number, number] {
        let outputValue: [number, number] = [0, 0];
        
        if (parseFloat(elBar.style.width) <= stepsAmount) {
            outputValue[0] = start + parseInt(elBar.style.width) * step;
        } else {
            outputValue[0] = end;
        }
        
        if (parseFloat(secondElBar.style.width) <= stepsAmount) {
            outputValue[1] = start + parseInt(secondElBar.style.width) * step;
        } else {
            outputValue[1] = end;
        }
        
        if (outputValue[1] < outputValue[0]) {
            outputValue = [outputValue[1], outputValue[0]];         
        }
        
        this.outputEl.value = outputValue[0].toString() + separator + outputValue[1].toString();
        return outputValue;
    }

};

export default YRangeOutput;