import './xRunner.css';
import Runner from '../runner.ts';

class XRunner extends Runner implements SliderRunner {
    
    mousePosOnRunnerOnStartDragging: number = 0;
    
    constructor() {
        super();
        this.runnerEl.className = 'runner x-runner';
        this.onRunnerPointerDown = this.onRunnerPointerDown.bind(this);
        this.runnerEl.onpointerdown = this.onRunnerPointerDown;
    }
    
    onRunnerPointerDown(e: PointerEvent): boolean {
        
        console.log(this.mediator.subviews);
        
        this.mousePosOnRunnerOnStartDragging = e.clientX - this.runnerEl.getBoundingClientRect().left;
        
        if (this.mediator) {
            this.mediator.mediateDragging();
        }
        return false;
    }
    
    returnHalfRunnerSize(e: PointerEvent): PointerEvent {
        
        const pointerDownEvent = new PointerEvent("pointerdown", {
            clientX: e.clientX - parseFloat(getComputedStyle(this.runnerEl).width) / 2,
        });
        
        return pointerDownEvent;
    }
    
    returnMousePosOnRunner(e: PointerEvent): PointerEvent {
        
        const pointerMoveEvent = new PointerEvent("pointermove", {
            clientX: e.clientX - this.mousePosOnRunnerOnStartDragging,
        });
        
        return pointerMoveEvent;
    }
    
};

export default XRunner;