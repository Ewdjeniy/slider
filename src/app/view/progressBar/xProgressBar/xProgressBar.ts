import './xProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartX, scaleStep, mousePosOnRunner): number {
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
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar x-progress-bar';
        el.before(this.progressBarEl);
    }
};

export default XProgressBar;