import ObservableSubject from '../../observers.ts';

export class Scale {
    subject:any = new ObservableSubject();
    sliderState: any;
    scaleHTML: string = '<div class="scale"></div>' +
                        '<div class="scale-values"></div>';
    scaleEl:  HTMLElement;
    scaleValuesEl: HTMLElement;

    constructor(sliderState: any) {
        this.sliderState = sliderState;
    }
    
};
