class Output {

    sliderState: SliderState;
    outputEl: HTMLInputElement;

    constructor(input: HTMLInputElement, sliderState: SliderState) {
        this.sliderState = sliderState;
        this.outputEl = input;
    }
    
};

export default Output;