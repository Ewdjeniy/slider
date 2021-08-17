import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';

export class ToxinSliderModel {
    
    subject: any = new ObservableSubject();
    state: any = {
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
    
}