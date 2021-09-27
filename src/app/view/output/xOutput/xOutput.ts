import Output from '../output.ts';

class XOutput extends Output implements SliderOutput {

    constructor(input: HTMLInputElement, sliderState: SliderState) {
        super(input, sliderState);
        this.setCurrent();
    }
    
    setCurrent(): void {
        if (this.sliderState.sliderSettings.current > this.sliderState.sliderSettings.end) {
            this.outputEl.value = this.sliderState.sliderSettings.end.toString();
        } else if (this.sliderState.sliderSettings.current < this.sliderState.sliderSettings.start) {
            this.outputEl.value = this.sliderState.sliderSettings.start.toString();      
        } else {
            this.outputEl.value = this.sliderState.sliderSettings.current.toString();        
        }
    }
    
    countOutputValue(): number {
        let outputValue: number;
        
        if (parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) <= this.sliderState.stepsAmount) {
            outputValue = +this.sliderState.sliderSettings.start + parseInt(this.sliderState.progressBars[0].progressBarEl.style.width) * this.sliderState.sliderSettings.step;
        } else {
            outputValue = +this.sliderState.sliderSettings.end;
        }
        
        this.outputEl.value = outputValue.toString(); 
        return outputValue;
    }
    
};

export default XOutput;