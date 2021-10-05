import './xRangeProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XRangeProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, step, i): void {
        this.progressBarEl.style.width = Math.round((current[i] - start) / step) + 'em';
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartX, scaleStep, mousePosOnRunner, el): number {
				const scaleValue: number = event.clientX - scaleStartX - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        
        if (el && 
            +getComputedStyle(el.parentElement).zIndex > +getComputedStyle(this.progressBarEl.parentElement).zIndex && 
            parseFloat(getComputedStyle(el).width) > parseFloat(getComputedStyle(this.progressBarEl).width)) {
            el.style.width = size + 'em';
            this.progressBarEl.style.width = size + 'em';
        } else {
            this.progressBarEl.style.width = size + 'em'; 
        }
        
        return size;
    }
    
    
//    
//    setProgressBarSize(event: PointerEvent): void {
//        const scaleStartX: number = this.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.sliderState.scale.scaleEl).paddingLeft);
//				const scaleValue: number = event.clientX - scaleStartX - this.sliderState.runners[this.index].mousePosOnRunner;
//        let size: string;
//        
//        if (scaleValue >= 0) {
//            size = Math.round(scaleValue / this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl)) + 'em';
//            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
//                this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = size); 
//            } else {
//                this.progressBarEl.style.width = size;  
//            }
//				} else {
//            if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
//                this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = '0em'); 
//            } else {
//                this.progressBarEl.style.width = '0em';  
//            }
//				}
//        
//        if (parseFloat(getComputedStyle(this.sliderState.progressBars[0].progressBarEl).width) > parseFloat(getComputedStyle(this.sliderState.progressBars[1].progressBarEl).width)) {
//            this.sliderState.progressBars.forEach((progress) => progress.progressBarEl.style.width = size); 
//        }
//        this.sliderState.subject.notifyObservers();
//    }
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar x-range-progress-bar';
        el.before(this.progressBarEl);
    }
};

export default XRangeProgressBar;