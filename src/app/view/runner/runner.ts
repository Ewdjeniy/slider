import './runner.css';
import ObservableSubject from '../../observers.ts';

class Runner {   
    
    runnerEl: HTMLElement = document.createElement('div');
    globalSubjects: Object = {};
    mousePosOnRunnerOnStartDragging: number = 0;
    max: number;
    current: number;
    direction: string;
    stepInPx: number = 1;
    zeroPoint: Object = {x: 0, y: 0};
    
    constructor(settings, globalSubjects?: Object) {
        
        if (globalSubjects) {
            this.globalSubjects = globalSubjects;
        }
        this.runnerEl.className = settings.direction == 'x' ? 'runner runner_x' : 'runner runner_y';
        this.max = settings.max;
        this.current = settings.current;
        this.direction = settings.direction;
        this.onRunnerPointerDown = this.onRunnerPointerDown.bind(this);
        this.runnerEl.onpointerdown = this.onRunnerPointerDown;
    }
    
    setZindex(value: string): void {
        this.runnerEl.style.zIndex = value;
    }
    
    onRunnerPointerDown(e: PointerEvent): boolean {
        
        this.mousePosOnRunnerOnStartDragging = this.direction == 'x' ? 
            e.clientX - this.runnerEl.getBoundingClientRect().left :
            this.runnerEl.getBoundingClientRect().bottom - e.clientY;
        
        return false;
    }
    
    returnHalfRunnerSize(e: PointerEvent): PointerEvent {
        
        const pointerDownEvent = new PointerEvent("pointerdown", {
            clientX: e.clientX - parseFloat(getComputedStyle(this.runnerEl).width) / 2,
            clientY: e.clientY + parseFloat(getComputedStyle(this.runnerEl).height) / 2,
        });
        
        return pointerDownEvent;
    }
    
    returnMousePosOnRunner(e: PointerEvent): PointerEvent {
        const pointerMoveEvent = new PointerEvent("pointermove", {
            clientX: e.clientX - this.mousePosOnRunnerOnStartDragging,
            clientY: e.clientY + this.mousePosOnRunnerOnStartDragging,
        });
        
        return pointerMoveEvent;
    }
    
};

export default Runner;