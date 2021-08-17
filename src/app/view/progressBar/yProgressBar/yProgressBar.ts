import './yProgressBar.css';
import {ProgressBar} from '../progressBar.ts';

export class YProgressBar extends ProgressBar{
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.renderProgressBar();
    }
    
    setProgressBarSize(event: MouseEvent): void {
        const scaleStartY: number = this.sliderState.scale.scaleEl.getBoundingClientRect().bottom - parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderBottomWidth) - parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingBottom);
				const scaleValue: number = scaleStartY - event.clientY - this.sliderState.runners[this.index].mousePosOnRunner;
        let size: string;
        
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
				    this.progressBarEl.style.height = size;
				} else {
						this.progressBarEl.style.height = '0em';
				}
        
        if (this.sliderState.sliderSettings.range) {
            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).height) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).height)) {
                this.sliderState.progressBars[0].progressBarEl.style.height = size;
                this.sliderState.progressBars[1].progressBarEl.style.height = size;
            }
        }
    }
    
    renderProgressBar(): void {
        this.progressBarEl.className = 'progressBar';
        this.sliderState.runners[this.index].runnerEl.after(this.progressBarEl);
    }
};
