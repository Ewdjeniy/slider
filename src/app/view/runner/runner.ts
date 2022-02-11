import './runner.css';

class Runner {   
    
    runnerEl: HTMLElement = document.createElement('div');
    mediator: any;
    mousePosOnRunnerOnStartDragging: number = 0;
    max: number;
    current: number;
    direction: string;
    
    constructor(options) {
        this.runnerEl.className = options.direction == 'x' ? 'runner runner_x' : 'runner runner_y';
        this.max = options.max;
        this.current = options.current;
        this.direction = options.direction;
        this.runnerEl.style.zIndex = (Math.abs(options.max) + 1000 - options.current).toString();
        this.onRunnerPointerDown = this.onRunnerPointerDown.bind(this);
        this.runnerEl.onpointerdown = this.onRunnerPointerDown;
    }
    
    setZindex(value: string): void {
        this.runnerEl.style.zIndex = value;
    }
    
    setCurrentZedIndex(): void {
       this.runnerEl.style.zIndex = (Math.abs(this.max) + 1000 - this.current).toString(); 
    }
    
    setHigerZedIndex(): void {
        this.runnerEl.style.zIndex = (Math.abs(this.max) + 1000).toString(); 
    }
    
    onRunnerPointerDown(e: PointerEvent): boolean {
        
        this.mousePosOnRunnerOnStartDragging = this.direction == 'x' ? 
            e.clientX - this.runnerEl.getBoundingClientRect().left :
            this.runnerEl.getBoundingClientRect().bottom - e.clientY;
        
        if (this.mediator) {
            this.mediator.mediateDragging(e);
        }
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