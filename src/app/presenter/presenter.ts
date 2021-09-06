import ObservableSubject from '../observers.ts';

export class ToxinSliderPresenter {
    
    model: any;
    view: any;
    
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
        
        this.view.update(this.model.state);
        
        this.model.subject.addObserver(function() {
            view.update(model.state);
        });
        
        this.model.modelCurrent.addObserver(function() {
            view.updateCurrent(model.state.current);
        });
        
        this.view.subject.addObserver(function() {
            model.setState({current: view.getCurrentValue()});
        });
    }
    
}