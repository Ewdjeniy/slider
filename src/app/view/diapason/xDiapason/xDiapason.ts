import './xDiapason.css';
import Diapason from '../diapason.ts';

class XDiapason extends Diapason {   
    
    constructor() {
        super();
        this.diapasonEl.className = 'diapason x-diapason';
    }
    
};

export default XDiapason;