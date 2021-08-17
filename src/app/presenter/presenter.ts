import ObservableSubject from '../observers.ts';

export class ToxinSliderPresenter {
    
    model: any;
    view: any;
    
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
        
        this.view.updateSettings(this.model.state);
        this.view.init();
        
    }
    
}