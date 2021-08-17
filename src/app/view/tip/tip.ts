import ObservableSubject from '../../observers.ts';

export class Tip {   
    
    subject: any = new ObservableSubject();
    sliderState: any;
    index: number;
    tipEl: HTMLElement = document.createElement('div');
    
    constructor(index: number, sliderState: any) {
        this.sliderState = sliderState;
        this.index = index;
    }
    
};
