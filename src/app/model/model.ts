import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';

export class ToxinSliderModel {
    
    subject: ObservableSubject = new ObservableSubject();
    modelCurrent: ObservableSubject = new ObservableSubject();
    state: Object = {
        start: -50,
        end: 50,
        step: 1,
        current: 0,
        scaleValues: 5,
        direction: 'x',
        range: false,
        tip: false,
    };
    
    constructor(options: ToxinSliderOptions) {
        this.state = $.extend( this.state, options );
    }
    
    executeMethod(method: any, args: any): void {
        if (this[method]) {
            this[method](args);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.toxinSlider' );
        }
    }
    
    setState(args: any): void {
        this.state = $.extend( this.state, args );
    }
    
    update(args: any): void {
        this.setState(args);
        this.subject.notifyObservers();
    }
    
    setCurrent(current: any): void {
        this.state.current = current;
        this.modelCurrent.notifyObservers();
    }
    
}