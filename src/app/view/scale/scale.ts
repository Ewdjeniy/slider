import './scale.css';
import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';
import SliderDom from '../sliderRenderer/sliderDom.ts';
import Diapason from '../diapason/diapason.ts';


class Scale extends SliderRenderer {
    
    constructor(props?: any) {
        
        super(props);
        
        this.state = {
            className: 'scale_x',
            bg: 'white',
        }
        
    }
    
    returnScaleStart(): any {
        return this.returnNode().getBoundingClientRect().left + parseInt(getComputedStyle(this.returnNode()).borderLeftWidth) + parseInt(getComputedStyle(this.returnNode()).paddingLeft);
    }
    
    test(): any {
        console.log('hi');
    }
    
    render(children?: any): void {
        
        children = children ? children : [];
        
        return this.createVNode('div', 
        { 
            class: this.state.className,
            style: 'background: ' + this.state.bg + ';',
            onclick: () => this.test(),
        
        }, [
//            new Diapason({
//                node: this.props.node,
//                dir: [0, 0],
//                zIndex: 101,
//                returnScaleStart: this.returnScaleStart.bind(this),
//                current: this.props.current[0],
//                tip: this.props.tip,
//            }).render(),
        ]);
    }
    
};

export default Scale;