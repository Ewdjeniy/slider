import './xRangeRunner.css';
import Runner from '../runner.ts';

class XRangeRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
    }
    
    returnMousePosOnRunner(pointerDownEvent: PointerEvent): number {
        return pointerDownEvent.clientX - this.runnerEl.getBoundingClientRect().left;
    }
    
    render(diapasoneEl): void {
        this.runnerEl.className = 'runner x-range-runner';
        diapasoneEl.append(this.runnerEl);
    }
    
};

export default XRangeRunner;