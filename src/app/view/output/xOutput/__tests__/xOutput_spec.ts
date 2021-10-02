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
    let view: SliderView;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
    });
        
    it('должен быть объявлен', function() {
        expect(XOutput).toBeDefined();
    });
    
    it('метод setCurrent устанавливет текущее значение инпута в зависимости от view.sliderSettings.current', function() {
        expect(view.sliderState.output.outputEl.value).toEqual(view.sliderSettings.current.toString());
    });
    
    it('countOutputValue записывает значение инпута в зависимости от положения ползунка и возвращает это значение', function() {
        expect(view.sliderState.output.countOutputValue().toString()).toEqual(view.sliderState.output.outputEl.value);
    });

});
    
