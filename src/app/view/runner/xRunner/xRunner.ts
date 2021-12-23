import './xRunner.css';
import Runner from '../runner.ts';

class XRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
        this.runnerEl.className = 'runner x-runner';
    }
    
    returnMousePosOnRunner(pointerDownEvent: PointerEvent): number {
        return pointerDownEvent.clientX - this.runnerEl.getBoundingClientRect().left;
    }
    
};

export default XRunner;