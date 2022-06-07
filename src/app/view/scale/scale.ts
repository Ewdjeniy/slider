import './scale.css';
import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';
import Diapason from '../diapason/diapason.ts';


class Scale extends SliderRenderer {
    
    constructor(props?: any) {
        
        super(props);
        
        this.state = {
            className: 'scale_x',
            current: [0,50]
        }
        
    }
    
    returnScaleStart(): number {
        return this.returnNode().getBoundingClientRect().left + parseInt(getComputedStyle(this.returnNode()).borderLeftWidth) + parseInt(getComputedStyle(this.returnNode()).paddingLeft);
    }
    
    render(children?: any): void {
        
        children = children ? children : [];
        
        return this.createVNode('div', { class: this.state.className },[
            new Diapason({
                zIndex: 101,
                returnScaleStart: this.returnScaleStart.bind(this),
                current: this.state.current[0]
            }).render(),
            new Diapason({
                zIndex: 1,
                returnScaleStart: this.returnScaleStart.bind(this),
                current: this.state.current[1]
            }).render(),
        ]);

    }
    
};

export default Scale;