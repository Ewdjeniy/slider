import './scale.css';

class Scale {

    scaleEl:  HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor(options) {
        this.scaleEl.className = options.direction == 'x' ? 'scale scale_x' : 'scale scale_y';
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