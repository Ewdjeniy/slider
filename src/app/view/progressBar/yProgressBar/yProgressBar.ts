import './yProgressBar.css';
import ProgressBar from '../progressBar.ts';

class YProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartY, scaleStep, mousePosOnRunner): number {
				const scaleValue: number = scaleStartY - event.clientY - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        this.progressBarEl.style.height = size + 'em';
        return size;
    }
    
    setCurrent(current, start, step): void {
        this.progressBarEl.style.height = Math.round((current - start) / step) + 'em';
    }
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar y-progress-bar';
        el.after(this.progressBarEl);
    }
};

export default YProgressBar;