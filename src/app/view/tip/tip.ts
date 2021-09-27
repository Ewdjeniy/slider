import ObservableSubject from '../../observers.ts';

class Tip {   
    
    sliderState: SliderState;
    index: number;
    tipEl: HTMLElement = document.createElement('div');
    
    constructor(index: number, sliderState: SliderState) {
        this.sliderState = sliderState;
        this.index = index;
    }
    
};

export default Tip
