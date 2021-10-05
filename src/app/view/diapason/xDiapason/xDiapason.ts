import './xDiapason.css';
import Diapason from '../diapason.ts';

class XDiapason extends Diapason {   
    
    constructor() {
        super();
    }
    
    render(el): void {
        this.diapasonEl.className = 'diapason x-diapason';
        el.append(this.diapasonEl);
    }
    
};

export default XDiapason;