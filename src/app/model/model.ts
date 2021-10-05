import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';
import { defaultSliderSettingsModel } from '../defaults.ts';

class ToxinSliderModel implements SliderModel {
    
    subjectModelUpdateState: ObservableSubject = new ObservableSubject();
    subjectModelChangeCurrent: ObservableSubject = new ObservableSubject();
    state: ToxinSliderOptions = defaultSliderSettingsModel;
    
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
        this.subjectModelUpdateState.notifyObservers();
    }
    
    protected setCurrent(current: number | number[]): void {
        this.state.current = current;
        this.subjectModelChangeCurrent.notifyObservers();
    }
    
}

export default ToxinSliderModel;