import ToxinSliderView from '../../view.ts';
import Output from '../Output.ts';
import XScale from '../../scale/xScale/xScale.ts';
import XDiapason from '../../diapason/xDiapason/xDiapason.ts';
import XOutput from '../xOutput/xOutput.ts';
import XRunner from '../../runner/xRunner/xRunner.ts';
import XTip from '../../tip/xTip/xTip.ts';
import XProgressBar from '../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';

describe('Output', function() {
        
    let inpt: any;
    let view: SliderView;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
    });
     
    it('должен быть объявлен', function() {
        expect(Output).toBeDefined();
    });
        
    it('получает ссылку на input и на view.sliderState', function() {
        expect(view.sliderState.output.outputEl).toBe(inpt);
        expect(view.sliderState.output.sliderState).toBe(view.sliderState);
    });
        
});
