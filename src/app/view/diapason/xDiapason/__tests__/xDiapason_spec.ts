import ToxinSliderView from '../../../view.ts';
import XScale from '../../../scale/xScale/xScale.ts';
import XDiapason from '../xDiapason.ts';
import XOutput from '../../../output/xOutput/xOutput.ts';
import XRunner from '../../../runner/xRunner/xRunner.ts';
import XTip from '../../../tip/xTip/xTip.ts';
import XProgressBar from '../../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';


        
describe('XDiapason', function() {
         
    let inpt: any;
    let view: any;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
        view.update({
            start: 0,
            end: 100,
            step: 1,
            current: 25,
            scaleValuesAmount: 2,
            direction: 'x',
            range: false,
            tip: true,
            separator: ' - '
        });
    });
    
    afterEach (function() {
        view.sliderEl.remove();
    });
        
    it('Должен быть объявлен', function() {
        expect(XDiapason).toBeDefined();
    });
            
    it('Метод render вставляет div с классом "diapason x-diapason" в ".scale x-scale"', function() {
        view.state.diapasones[0].render(view.state.scale.scaleEl);
        
        expect(view.state.diapasones[0].diapasonEl.className).toBe('diapason x-diapason');
        expect(view.state.diapasones[0].diapasonEl.parentElement.className).toBe('scale x-scale');
    });

});  
