import './xRangeDiapason.css';
import Diapason from '../diapason.ts';

class XRangeDiapason extends Diapason {   
    
    constructor() {
        super();
    }
    
    render(el): void {
        this.diapasonEl.className = 'diapason x-range-diapason';
        el.append(this.diapasonEl);
    }
    
};

export default XRangeDiapason;