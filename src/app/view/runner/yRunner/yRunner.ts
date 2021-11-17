import './yRunner.css';
import Runner from '../runner.ts';

class YRunner extends Runner implements SliderRunner {
    
    constructor() {
        super();
    }
    
    returnMousePosOnRunner(pointerDownEvent: PointerEvent): number {
        return this.runnerEl.getBoundingClientRect().bottom - pointerDownEvent.clientY;
    }
    
    render(diapasoneEl): void {
        this.runnerEl.className = 'runner y-runner';
        diapasoneEl.append(this.runnerEl);
    }
    
};

export default YRunner;