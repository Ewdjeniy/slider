import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';
import SettingsValidator from './settingsValidator.ts';
import { defaultSliderSettingsModel } from './defaults.ts';

class ToxinSliderModel implements SliderModel {
    
    observableSubjects: Object = {
        subjectModelUpdateState: new ObservableSubject(),
        subjectModelChangeCurrent: new ObservableSubject()
    };
    state: ToxinSliderSettings = {};
    settingsValidator: any = new SettingsValidator();
    
    constructor(settings?: ToxinSliderSettings) {
        this.init(settings);
    }
    
    returnModelStateInstance(): ToxinSliderSettings {
        return Object.assign({}, this.state);
    }
    
    public executeMethod(method: string, args: any): void {
        if (method === 'get') {
            this.get[args]();
        } else if (method == 'setState' || method == 'update' || method == 'setCurrent') {
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
    
    protected validateSettings(): void {
        this.state = this.settingsValidator.returnValidatedSettings(Object.assign({}, this.state));
    }
    
    protected init(settings?: ToxinSliderSettings): void {
        
        this.state = Object.assign({}, defaultSliderSettingsModel);
        
        for (let key in this.get) {
            this.get[key] = this.get[key].bind(this);
        }
        this.setState(settings);
        this.validateSettings();
    }
    
    protected setState(settings: ToxinSliderSettings): void {
        this.state = $.extend( this.state, settings );
        this.validateSettings();
    }
    
    protected update(settings: ToxinSliderSettings): void {
        this.setState(settings);
        this.observableSubjects.subjectModelUpdateState.notifyObservers(Object.assign({}, this.state));
    }
    
    protected setCurrent(value: number[]): void {
        this.state.current = value;
        this.observableSubjects.subjectModelChangeCurrent.notifyObservers(value);
    }
    
}

export default ToxinSliderModel;
