import * as $ from 'jquery';
import * as jQuery from 'jquery';
import { ToxinSliderView } from './view/view.ts';
import { ToxinSliderModel } from './model/model.ts';

$.fn.toxinSlider = function(this: JQuery<HTMLInputElement>, options?: ToxinSliderOptions): JQuery {
    return this.each(function() {
        const model = new ToxinSliderModel(options);
        const view = new ToxinSliderView(this);
    });
};
