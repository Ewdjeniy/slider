import './diapason.css';
import SliderRenderer from '../sliderRenderer/sliderRenderer.ts';
import Runner from '../runner/runner.ts';
import ProgressBar from '../progressBar/progressBar.ts';

class Diapason extends SliderRenderer {   
    
    constructor(props?: any) {;
        
        super(props);
        
        this.state = {
            runnerClass: 'runner_x',
            progressBarWidth: this.props.current
        }
        
    }
    
    handleDrag(mouseCorrection: any): boolean {
        const removeListenersFromDocument = () => {
            document.removeEventListener('pointermove', changeSize);
            document.removeEventListener('pointerup', unActivate);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        const unActivate = () => this.setState({runnerClass: 'runner_x'});
        const changeSize = (e: PointerEvent) => {
            this.setState({progressBarWidth: e.clientX - this.props.returnScaleStart() - mouseCorrection});
        };
        
        window.getSelection().removeAllRanges();
        
        this.setState({runnerClass: 'runner_x runner_active'});
        
        document.addEventListener('pointermove', changeSize);
        document.addEventListener('pointerup', unActivate);
        document.addEventListener('pointerup', removeListenersFromDocument);
        
        return false;
    }
    
    render(children?: any): void {
        
        children = children ? children : [];
        
        return this.createVNode('div', {
            class: 'diapason_x',
            style: 'z-index: ' + this.props.zIndex + ';'
            }, [
            new ProgressBar({
                style: 'width: ' + this.state.progressBarWidth + 'px; font-size: 10px;'
            }).render(),
            new Runner({
                class: this.state.runnerClass,
                ondrag: this.handleDrag.bind(this)
            }).render()
        ]);

    }
    
};

export default Diapason;










//import './diapason.css';
//import ObservableSubject from '../../observers.ts';
//
//class Diapason {   
//    
//    diapasonEl: HTMLElement = document.createElement('div');
//    globalSubjects: Object = {};
//    
//    constructor(settings, globalSubjects?: Object) {
//        this.init(settings);
//    }
//    
//    init(settings, globalSubjects?: Object): void {
//        if (globalSubjects) {
//            this.globalSubjects = globalSubjects;
//        }
//        this.diapasonEl.className = settings.direction == 'x' ? 'diapason diapason_x' : 'diapason diapason_y';
//    }
//};
//
//export default Diapason;