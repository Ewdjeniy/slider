import ObservableSubject from '../../observers.ts';

class Scale {

    sliderState: SliderState;
    scaleHTML: string = '<div class="scale"></div>' +
                        '<div class="scale-values"></div>';
    scaleEl:  HTMLElement;
    scaleValuesEl: HTMLElement;

    constructor(sliderState: any) {
        this.sliderState = sliderState;
    }
    
    countScaleStep(runnerEl): number {
        return (parseInt(getComputedStyle(this.scaleEl).width) * this.sliderState.stepsCoefficient - parseInt(getComputedStyle(runnerEl).width)) / this.sliderState.stepsAmount; 
    }
    
};

export default Scale;