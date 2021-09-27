import * as $ from 'jquery';
import * as jQuery from 'jquery';
import ToxinSliderView from './view/view.ts';
import ToxinSliderModel from './model/model.ts';
import ToxinSliderPresenter from './presenter/presenter.ts';
import ObservableSubject from './observers.ts';

(function( $ ){
    let model: SliderModel;
    let view: SliderView;
    let presenter: SliderPresenter;
    
    const init = function(this: JQuery<HTMLInputElement>, options?: ToxinSliderOptions) { 
        return this.each(function() {
            model = new ToxinSliderModel(options);
            view = new ToxinSliderView(this);
            presenter = new ToxinSliderPresenter(model, view);
        });
    }

    $.fn.toxinSlider = function( method?: string | Object, args?: any ): JQuery {
        if ( typeof method === 'object' || !method ) {
            return init.apply( this, arguments );
        } else {
            return this.each(function() {
                model.executeMethod(method, args);
            });
        }
    };

})( jQuery );