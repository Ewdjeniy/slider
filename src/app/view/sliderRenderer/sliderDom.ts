import SliderRenderer from './sliderRenderer.ts';
import ObservableSubject from '../../observers.ts';




class Dom {
    
    sliderRenderer: SliderRenderer = new SliderRenderer();
    vDom: any = this.sliderRenderer.createVNode('body', {}, []);
    connections: any[] = [];
    
    constructor() {
        
    }
    
    render(vNode: any, node: any): any {
        
        const index = this.vDom.children.length;
        
        this.sliderRenderer.patch(vNode, node);
        
        this.vDom.children[index] = vNode;
        
        this.connections[index] = {vNode: this.vDom.children[index], node: node};
        
        return index;
        
    }
    
}

const SliderDom: Dom = new Dom();

export default SliderDom;