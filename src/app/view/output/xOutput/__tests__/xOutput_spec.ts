import ToxinSliderView from '../../../view.ts';
import XScale from '../../../scale/xScale/xScale.ts';
import XDiapason from '../../../diapason/xDiapason/xDiapason.ts';
import XOutput from '../xOutput.ts';
import XRunner from '../../../runner/xRunner/xRunner.ts';
import XTip from '../../../tip/xTip/xTip.ts';
import XProgressBar from '../../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';


        
describe('XOutput', function() {
         
    let inpt: any;
    let view: any;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
        view.update({
            start: -50,
            end: 50,
            step: 1,
            current: 25,
            scaleValuesAmount: 2,
            direction: 'x',
            range: false,
            tip: true,
            separator: ' - '
        });
    });
        
    it('должен быть объявлен', function() {
        expect(XOutput).toBeDefined();
    });
    
    it('метод setCurrent записывает текущее значение слайдера в инпут', function() {
        
        for (let i = -25; i < 25; i++) {
            view.sliderSettings.current = i;

            view.state.output.setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.end);
            expect(view.state.output.outputEl.value).toEqual(i.toString());
        }
        
    });
    
    it('countOutputValue переписывает значение инпута в зависимости от длины прогресс бара и возвращает это значение', function() {
 
        expect(view.state.output.countOutputValue(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step)).toEqual(view.sliderSettings.current);
        expect(view.state.output.countOutputValue(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step).toString()).toEqual(view.state.output.outputEl.value);
        
    });

});
    
