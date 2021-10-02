import './xProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor(index: number, sliderState: SliderState) {
        super(index, sliderState);
        this.renderProgressBar();
        this.setCurrent();
    }
    
    setCurrent(): void {
        this.progressBarEl.style.width = Math.round((this.sliderState.sliderSettings.current - this.sliderState.sliderSettings.start) / this.sliderState.sliderSettings.step) + 'em';
    }
    
    setProgressBarSize(event: PointerEvent): void {
        const scaleStartX: number = this.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingLeft);
				const scaleValue: number = event.clientX - scaleStartX - this.sliderState.runners[this.index].mousePosOnRunner;
        let size: string;
        
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
				    this.progressBarEl.style.width = size;
				} else {
						this.progressBarEl.style.width = '0em';
				}
        this.sliderState.subject.notifyObservers();
    }
    
    renderProgressBar(): void {
        this.progressBarEl.className = 'x-progress-bar';
        this.sliderState.runners[this.index].runnerEl.before(this.progressBarEl);
    }
};

export default XProgressBar;