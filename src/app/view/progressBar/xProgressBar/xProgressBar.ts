import './xProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartX, scaleStep, mousePosOnRunner, el): number {
				const scaleValue: number = event.clientX - scaleStartX - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        this.progressBarEl.style.width = size + 'em';
        return size;
    }
    
    setCurrent(current, start, step): void {
        this.progressBarEl.style.width = Math.round((current - start) / step) + 'em';
    }
    
//    setCurrent(): void {
//        this.progressBarEl.style.width = Math.round((this.sliderState.sliderSettings.current - this.sliderState.sliderSettings.start) / this.sliderState.sliderSettings.step) + 'em';
//    }
//    
//    setProgressBarSize(event: PointerEvent): void {
//        const scaleStartX: number = this.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingLeft);
//				const scaleValue: number = event.clientX - scaleStartX - this.sliderState.runners[this.index].mousePosOnRunner;
//        let size: string;
//        
//        if (scaleValue >= 0) {
//            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
//				    this.progressBarEl.style.width = size;
//				} else {
//						this.progressBarEl.style.width = '0em';
//				}
//        this.sliderState.subject.notifyObservers();
//    }
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar x-progress-bar';
        el.before(this.progressBarEl);
    }
};

export default XProgressBar;