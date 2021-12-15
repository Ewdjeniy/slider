import * as $ from 'jquery';
import * as jQuery from 'jquery';
import ToxinSliderView from './view/view.ts';
import ToxinSliderModel from './model/model.ts';
import ToxinSliderPresenter from './presenter/presenter.ts';
import ObservableSubject from './observers.ts';

(function( $ ){
    
    $.fn.toxinSlider = function( method?: string | Object, args?: any ): JQuery {
        
        const modelData = $(this).data("toxinSliderModel") ? $(this).data("toxinSliderModel").model : null;
        
        const init = function(this: JQuery<HTMLInputElement>, options?: ToxinSliderOptions) {
            return this.each(function(index, el) {
                
                if (modelData) return;
                
                const model = new ToxinSliderModel(options);
                const view = new ToxinSliderView(this);
                const presenter = new ToxinSliderPresenter(model, view);
                $(this).data("toxinSliderModel", {model: model});
            });
        }
        
        if ( typeof method === 'object' || !method ) {
            return init.apply( this, arguments );
        } else if (method === 'get') {
            return modelData.get[args]();        
        } else {
            return this.each(function() {
                modelData.executeMethod(method, args);
            });
        }
    };

})( jQuery );

$('.slider').toxinSlider();









//(function( $ ){
//    let model: SliderModel;
//    let view: SliderView;
//    let presenter: SliderPresenter;
//    
//    const init = function(this: JQuery<HTMLInputElement>, options?: ToxinSliderOptions) { 
//        return this.each(function() {
//            model = new ToxinSliderModel(options);
//            view = new ToxinSliderView(this);
//            presenter = new ToxinSliderPresenter(model, view);
//        });
//    }
//
//    $.fn.toxinSlider = function( method?: string | Object, args?: any ): JQuery {
//        if ( typeof method === 'object' || !method ) {
//            return init.apply( this, arguments );
//        } else if (method === 'get') {
//            return model.get[args]();        
//        } else {
//            return this.each(function() {
//                model.executeMethod(method, args);
//            });
//        }
//    };
//
//})( jQuery );