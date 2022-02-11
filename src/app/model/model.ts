import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';
import SettingsValidator from './settingsValidator.ts';
import { defaultSliderSettingsModel } from './defaults.ts';

class ToxinSliderModel implements SliderModel {
    
    subjectModelUpdateState: ObservableSubject = new ObservableSubject();
    subjectModelChangeCurrent: ObservableSubject = new ObservableSubject();
    state: ToxinSliderOptions = {};
    settingsValidator: any = new SettingsValidator();
    
    constructor(options?: ToxinSliderOptions) {
        this.init(options);
    }
    
    public executeMethod(method: string, args: any): void {
        if (method === 'get') {
            this.get[args]();
        } else if (this[method]) {
            this[method](args);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.toxinSlider' );
        }
    }
    
    public get: any = {
        current: function() {
            return this.state.current;
        }
    }
    
    protected init(options?: ToxinSliderOptions): void {
        for (let key in defaultSliderSettingsModel) {
            this.state[key] = defaultSliderSettingsModel[key];
        }
        
        for (let key in this.get) {
            this.get[key] = this.get[key].bind(this);
        }
        this.setState(options);
        this.settingsValidator.validateSettings(this.state);
    }
    
    protected setState(options: ToxinSliderOptions): void {
        this.state = $.extend( this.state, options );
        this.settingsValidator.validateSettings(this.state);
    }
    
    protected update(options: ToxinSliderOptions): void {
        this.setState(options);
        this.subjectModelUpdateState.notifyObservers();
    }
    
    protected setCurrent(current: number[]): void {
        this.state.current = current;
        this.subjectModelChangeCurrent.notifyObservers();
    }
    
}

export default ToxinSliderModel;
