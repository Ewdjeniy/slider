import './scale.css';

class Scale {

    scaleEl:  HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor() {
        this.scaleEl.className = 'scale';
        this.onScalePointerDown = this.onScalePointerDown.bind(this);
        this.scaleEl.onpointerdown = this.onScalePointerDown;
    }
    
    onScalePointerDown(e: PointerEvent): boolean {
        if (this.mediator) {
            this.mediator.mediateScalePointerDown(e);
        }
        return false;
    }
    
};

export default Scale;