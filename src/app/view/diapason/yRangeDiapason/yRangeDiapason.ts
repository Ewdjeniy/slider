import './yRangeDiapason.css';
import Diapason from '../diapason.ts';

class YRangeDiapason extends Diapason {   
    
    constructor() {
        super();
    }
    
    render(el): void {
        this.diapasonEl.className = 'diapason y-range-diapason';
        el.append(this.diapasonEl);
    }
    
};

export default YRangeDiapason;