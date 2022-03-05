import * as $ from 'jquery';
import * as jQuery from 'jquery';
import ToxinSliderView from './view/view.ts';
import ToxinSliderModel from './model/model.ts';
import ToxinSliderPresenter from './presenter/presenter.ts';
import ObservableSubject from './observers.ts';

(function( $ ){
    
    $.fn.toxinSlider = function( method?: string | Object, args?: any ): JQuery {
        
        const modelData = $(this).data("toxinSliderModel") ? $(this).data("toxinSliderModel").model : null;
        
        const init = function(this: JQuery<HTMLInputElement>, options?: ToxinSliderSettings) {
            
            this.each(function() {
                
                if (modelData) return;
                
                const model = new ToxinSliderModel(options);
                const view = new ToxinSliderView(this);
                const presenter = new ToxinSliderPresenter(model, view);
                $(this).data("toxinSliderModel", {model: model});
            });
            
            return this;
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
