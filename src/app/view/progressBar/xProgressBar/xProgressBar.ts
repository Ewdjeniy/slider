import './xProgressBar.css';
import {ProgressBar} from '../progressBar.ts';

export class XProgressBar extends ProgressBar{
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.renderProgressBar();
        this.setCurrent(this.sliderState.sliderSettings.current);
    }
    
    setCurrent(value: number): void {
        this.progressBarEl.style.width = Math.round((value - this.sliderState.sliderSettings.start) / this.sliderState.sliderSettings.step) + 'em';
    }
    
    setProgressBarSize(event: MouseEvent): void {
        const scaleStartX: number = this.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingLeft);
				const scaleValue: number = event.clientX - scaleStartX - this.sliderState.runners[this.index].mousePosOnRunner;
        let size: string;
        
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
				    this.progressBarEl.style.width = size;
				} else {
						this.progressBarEl.style.width = '0em';
				}
        
        if (this.sliderState.sliderSettings.range) {
            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
                this.sliderState.progressBars[0].progressBarEl.style.width = size;
                this.sliderState.progressBars[1].progressBarEl.style.width = size;
            }
        }
    }
    
    renderProgressBar(): void {
        this.progressBarEl.className = 'xProgressBar';
        this.sliderState.runners[this.index].runnerEl.before(this.progressBarEl);
    }
};
