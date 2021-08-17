import ObservableSubject from '../../observers.ts';

export class Output {

    subject: any = new ObservableSubject();
    sliderState: any;
    outputEl: HTMLInputElement;

    constructor(input: HTMLInputElement, sliderState: any) {
        this.sliderState = sliderState;
        this.outputEl = input;
    }
    
};
