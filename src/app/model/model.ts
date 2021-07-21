import * as $ from 'jquery';

export class ToxinSliderModel {
    state: any = {
        'start': 0,
        'end': 100,
        'current': 33,
        'step': 2,
    };
    constructor(options: ToxinSliderOptions) {
        this.state = $.extend( this.state, options );
    }
}