class Runner {   
    
    sliderState: SliderState;
    index: number;
    runnerEl: HTMLElement = document.createElement('div');
    mousePosOnRunner: number = 0;
    
    constructor(index: number, sliderState: SliderState) {
        this.sliderState = sliderState;
        this.index = index;
    }
    
};

export default Runner;