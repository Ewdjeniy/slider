import './diapason.css';
import ObservableSubject from '../../observers.ts';

class Diapason {   
    
    diapasonEl: HTMLElement = document.createElement('div');
    globalSubjects: Object = {};
    
    constructor(settings, globalSubjects?: Object) {
        this.init(settings);
    }
    
    init(settings, globalSubjects?: Object): void {
        if (globalSubjects) {
            this.globalSubjects = globalSubjects;
        }
        this.diapasonEl.className = settings.direction == 'x' ? 'diapason diapason_x' : 'diapason diapason_y';
    }
};

export default Diapason;