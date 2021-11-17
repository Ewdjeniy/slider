import './yDiapason.css';
import Diapason from '../diapason.ts';

class YDiapason extends Diapason {   
    
    constructor() {
        super();
    }
    
    render(el): void {
        this.diapasonEl.className = 'diapason y-diapason';
        el.append(this.diapasonEl);
    }
    
};

export default YDiapason;