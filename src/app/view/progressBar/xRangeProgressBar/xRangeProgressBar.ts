import './xRangeProgressBar.css';
import {ProgressBar} from '../progressBar.ts';

export class XRangeProgressBar extends ProgressBar{
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.renderProgressBar();
        this.setCurrent();
    }
    
    setCurrent(): void {
        this.progressBarEl.style.width = Math.round((this.sliderState.sliderSettings.current[this.index] - this.sliderState.sliderSettings.start) / this.sliderState.sliderSettings.step) + 'em';
    }
    
    setProgressBarSize(event: PointerEvent): void {
        const scaleStartX: number = this.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingLeft);
				const scaleValue: number = event.clientX - scaleStartX - this.sliderState.runners[this.index].mousePosOnRunner;
        let size: string;
        
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
                this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = size); 
            } else {
                this.progressBarEl.style.width = size;  
            }
				} else {
            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
                this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = '0em'); 
            } else {
                this.progressBarEl.style.width = '0em';  
            }
				}
        
        if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
            this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = size); 
        }
        this.sliderState.subject.notifyObservers();
    }
    
    renderProgressBar(): void {
        this.progressBarEl.className = 'xRangeProgressBar';
        this.sliderState.runners[this.index].runnerEl.before(this.progressBarEl);
    }
};
