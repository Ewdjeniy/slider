import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';
import defaultSliderSettings from '../defaults.ts';

class ToxinSliderModel implements SliderModel {
    
    subject: ObservableSubject = new ObservableSubject();
    modelCurrent: ObservableSubject = new ObservableSubject();
    state: ToxinSliderOptions = defaultSliderSettings;
    
    constructor(options?: ToxinSliderOptions) {
        this.setState(options);
    }
    
    public executeMethod(method: string, args: any): void {
        if (this[method]) {
            this[method](args);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.toxinSlider' );
        }
    }
    
    protected setState(options: ToxinSliderOptions): void {
        this.state = $.extend( this.state, options );
    }
    
    protected update(options: ToxinSliderOptions): void {
        this.setState(options);
        this.subject.notifyObservers();
    }
    
    protected setCurrent(current: number | number[]): void {
        this.state.current = current;
        this.modelCurrent.notifyObservers();
    }
    
}

export default ToxinSliderModel;