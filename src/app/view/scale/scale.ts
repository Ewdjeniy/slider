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
    
    setScaleValues(): void {
        if (this.sliderState.sliderSettings.scaleValues == 1) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>'; 
        } else if (this.sliderState.sliderSettings.scaleValues == 2) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>' + '<span class="scale-last-value">' + this.sliderState.sliderSettings.end + '</span>';      
        } else if (this.sliderState.sliderSettings.scaleValues > 2) {
            let result: string = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>';
            for (let i = 1; i < this.sliderState.sliderSettings.scaleValues - 1; i++) {
                result += '<span class="scale-value">';
                result += Math.round(+this.sliderState.sliderSettings.start + ((+this.sliderState.sliderSettings.end - (+this.sliderState.sliderSettings.start))  / (this.sliderState.sliderSettings.scaleValues - 1)) * i);
                result += '</span>';
            }
            result += '<span class="scale-last-value">' + this.sliderState.sliderSettings.end + '</span>';
            this.scaleValuesEl.innerHTML = result;
        }
    }
    
};

export default Scale;