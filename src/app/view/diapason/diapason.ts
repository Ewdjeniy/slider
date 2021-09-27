class Diapason {   
    
    sliderState: SliderState;
    index: number;
    rangeEl: HTMLElement = document.createElement('div');
    
    constructor(index: number, sliderState: SliderState) {
        this.index = index;
        this.sliderState = sliderState;
    }
    
};

export default Diapason;