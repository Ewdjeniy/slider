import './progressBar.css';
import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';



class ProgressBar extends SliderRenderer {
    
    constructor(props?: any) {
        
        super(props);
        
        this.state = {
            className: 'progress-bar_x'
        }
        
    }
    
    ondrag(): any {
        
        const removeListenersFromDocument = () => {
            document.removeEventListener('pointermove', changeSize);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        const changeSize = (e: PointerEvent) => {

        };
        
        document.addEventListener('pointermove', changeSize);
        document.addEventListener('pointerup', removeListenersFromDocument);
        
        return false;
        
    }
    
    render(children?: any): void {
        
        children = children ? children : [];
        
        return this.createVNode('div', { 
            class: this.state.className,
            style: this.props.style
        }, children);

    }
    
};

export default ProgressBar;
























//import './progressBar.css';
//import ObservableSubject from '../../observers.ts';
//import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';
//
//class ProgressBar {
//    
//    renderer: any = new SliderRenderer();
//    min: number;
//    max: number;
//    step: number;
//    direction: string;
//    decimalPlaces: number;
//    stepsAmount: number;
//    stepInPx: number = 1;
//    globalSubjects: Object = {};
//    progressBarEl: HTMLElement = document.createElement('div');
//    zeroPoint: Object = {x: 0, y: 0};
//    progressBarVNode: Object = {
//        tagName: 'div',
//        props: {},
//        children: []
//    };
//    
//    constructor(settings: Object, globalSubjects?: Object) {
//        
//        if (globalSubjects) {
//            this.globalSubjects = globalSubjects;
//        }
//        this.min = settings.min;
//        this.max = settings.max;
//        this.step = settings.step;
//        this.direction = settings.direction;
//        this.decimalPlaces = settings.decimalPlaces;
//        this.stepsAmount = Math.round((this.max - this.min) / this.step);
//        
//        this.progressBarVNode.props.class = settings.direction == 'x' ? 'progress-bar progress-bar_x' : 'progress-bar progress-bar_y'; 
//        
//        this.setValue(settings.current);
//        
//    }
//    
//    render(): void {
//        this.progressBarEl = this.renderer.mount(this.renderer.createDOMNode(this.progressBarVNode), this.progressBarEl);
//    }
//    
//    setZindex(value: string): void {
//        this.progressBarEl.style.zIndex = value;
//    }
//    
//    setBackground(background: string): void {
//        this.progressBarEl.style.background = background;
//    }
//    
//    returnValue(): number {
//        
//        const sizeName = this.direction == 'x' ? 'width' : 'height';
//        let value = this.min + parseInt(this.progressBarEl.style[sizeName]) * this.step;
//        value = value >= this.max ? this.max : value;
//        value = +value.toFixed(this.decimalPlaces);
//        
//        return value;
//    }
//       
//    setFontSize(): void {
//        this.progressBarEl.style.fontSize = this.stepInPx + 'px';
//    }
//    
//    setValueOnEvent(e: PointerEvent): void {
//        
//        e.preventDefault();
//
//        const sizeName: string = this.direction == 'x' ? 'width' : 'height';
//        let size: number;
//        const scaleValue: number = this.direction == 'x' ? 
//            e.clientX - this.zeroPoint.x :
//            this.zeroPoint.y - e.clientY;
//        
//        size = scaleValue >= 0 ? Math.round(scaleValue / this.stepInPx) : 0;
//        size = size >= this.stepsAmount ? Math.ceil((this.max - this.min) / this.step) : size;
//        this.progressBarEl.style[sizeName] = size + 'em';
//        
//    }
//    
//    setValue(value: number): void {
//        
//        const size = this.direction == 'x' ? 'width' : 'height';
//        
//        this.progressBarEl.style[size] = Math.round((value - this.min) / this.step) + 'em';
//        if (value == this.max) {
//            this.progressBarEl.style[size] = (this.max - this.min) / this.step + 'em';
//        }
//    }
//    
//};
//
//export default ProgressBar;