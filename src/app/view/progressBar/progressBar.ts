import './progressBar.css';
import ObservableSubject from '../../observers.ts';

export class ProgressBar {
    
    subject: any = new ObservableSubject();
    sliderState: any;
    index: number;
    progressBarEl: HTMLElement = document.createElement('div');
    mousePosOnSlider: number = 0;
    
    constructor(index: number, sliderState: any) {
        this.sliderState = sliderState;
        this.index = index;
        this.setFontSize();
        if (this.sliderState.sliderSettings.range && this.sliderState.progressBars[0]) {
            this.sliderState.progressBars[0].progressBarEl.style.backgroundColor = getComputedStyle(this.sliderState.scale.scaleEl).backgroundColor;
        }
    }
    
    setCurrent(value: number): void {
        this.progressBarEl.style.width = Math.round((value - this.sliderState.sliderSettings.start) / this.sliderState.sliderSettings.step) + 'em';
    }
    
    setFontSize(): void {
        this.progressBarEl.style.fontSize = this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl) + 'px';
    }
    
};
