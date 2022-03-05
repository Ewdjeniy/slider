import './scale.css';
import ObservableSubject from '../../observers.ts';
import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';

class Scale {

    scaleEl:  HTMLElement;
    stepInPx: number = 1;
    zeroPoint: Object = {x: 0, y: 0};
    globalSubjects: Object = {};
    renderer: any = new SliderRenderer();
    scaleVNode: Object = {
        tagName: 'div',
        props: {},
        children: []
    };
    
    constructor(options: Object) {
        
        const that = this;
        
        if (options.globalSubjects) {
            this.globalSubjects = options.globalSubjects;
        }
        
        this.scaleVNode.props.class = options.settings.direction == 'x' ? 'scale scale_x' : 'scale scale_y';
        this.scaleEl = options.elToReplace;
        this.render();
        this.onScalePointerDown = this.onScalePointerDown.bind(this);
        this.scaleEl.onpointerdown = this.onScalePointerDown;
        
    }
    
    render(): void {
        this.scaleEl = this.renderer.mount(this.renderer.createDOMNode(this.scaleVNode), this.scaleEl);
    }
    
    setZeroPoint(): void {
        this.zeroPoint = {
            x: this.scaleEl.getBoundingClientRect().left,
            y: this.scaleEl.getBoundingClientRect().bottom
        };
    }
    
    onScalePointerDown(e: PointerEvent): boolean {
        
        console.log('hi');
        return false;
        
    }
    
};

export default Scale;