import './yRangeRunner.css';
import Runner from '../runner.ts';

class YRangeRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
    }
    
    returnMousePosOnRunner(pointerDownEvent: PointerEvent): number {
        return pointerDownEvent.clientX - this.runnerEl.getBoundingClientRect().left;
    }
    
    render(diapasoneEl): void {
        this.runnerEl.className = 'runner y-range-runner';
        diapasoneEl.append(this.runnerEl);
    }
    
};

export default YRangeRunner;