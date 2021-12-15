import './xRunner.css';
import Runner from '../runner.ts';

class XRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
    }
    
    setMarginLeft(progressBarEl): void {
        if (parseFloat(getComputedStyle(this.runnerEl).width) < parseFloat(getComputedStyle(progressBarEl).width)) {
            this.runnerEl.style.marginLeft = -1 * parseFloat(getComputedStyle(this.runnerEl).width) / 2 + 'px';
        } else {
            this.runnerEl.style.marginLeft = '0';
        }
    }
    
    returnMousePosOnRunner(pointerDownEvent: PointerEvent): number {
        return pointerDownEvent.clientX - this.runnerEl.getBoundingClientRect().left;
    }
    
    render(diapasoneEl): void {
        this.runnerEl.className = 'runner x-runner';
        diapasoneEl.append(this.runnerEl);
    }
    
};

export default XRunner;