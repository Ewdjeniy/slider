import ToxinSliderView from '../../../view.ts';
import XRangeScale from '../../../scale/xRangeScale/xRangeScale.ts';
import XRangeDiapason from '../../../diapason/xRangeDiapason/xRangeDiapason.ts';
import XRangeOutput from '../xRangeOutput.ts';
import XRangeRunner from '../../../runner/xRangeRunner/xRangeRunner.ts';
import XRangeTip from '../../../tip/xRangeTip/xRangeTip.ts';
import XRangeProgressBar from '../../../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import * as $ from 'jquery';


describe('XRangeOutput', function() {
         
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
            current: [-10,10],
            scaleValuesAmount: 2,
            direction: 'x',
            range: true,
            tip: true,
            separator: ' - '
        });
    });
        
    it('должен быть объявлен', function() {
        expect(XRangeOutput).toBeDefined();
    });
    
    it('метод setCurrent записывает текущее значение слайдера в инпут', function() {
        
        for (let i = -25; i < 25; i++) {
            view.sliderSettings.current[0] = i;
            view.sliderSettings.current[1] = i + 3;

            view.state.output.setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.separator);
            expect(view.state.output.outputEl.value).toEqual(i + view.sliderSettings.separator + (i+3));
        }
        
    });
    
    it('countOutputValue переписывает значение инпута в зависимости от длин прогресс баров и возвращает это значение', function() {
        
        const outputValue = view.state.output.countOutputValue(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step, view.state.progressBars[1].progressBarEl, view.sliderSettings.separator);
        
        expect(outputValue).toEqual(view.sliderSettings.current);
        
        expect(outputValue[0] + view.sliderSettings.separator + outputValue[1]).toEqual(inpt.value);
        
    });

});
