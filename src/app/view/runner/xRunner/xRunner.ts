import './xRunner.css';
import Runner from '../runner.ts';

class XRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
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