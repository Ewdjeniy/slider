import ObservableSubject from '../../observers.ts';

class Scale {

    scaleEl:  HTMLElement = document.createElement('div');;
    subject: ObservableSubject = new ObservableSubject();
    
    constructor() {
        
    }
    
};

export default Scale;