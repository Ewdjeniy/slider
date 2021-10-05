import ToxinSliderView from '../../../view.ts';
import XRangeScale from '../../../scale/xRangeScale/xRangeScale.ts';
import XRangeDiapason from '../xRangeDiapason.ts';
import XRangeOutput from '../../../output/xRangeOutput/xRangeOutput.ts';
import XRangeRunner from '../../../runner/xRangeRunner/xRangeRunner.ts';
import XRangeTip from '../../../tip/xRangeTip/xRangeTip.ts';
import XRangeProgressBar from '../../../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import * as $ from 'jquery';


describe('XRangeDiapason', function() {
         
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
            current: [0,25],
            scaleValuesAmount: 2,
            direction: 'x',
            range: true,
            tip: true,
            separator: ' - '
        });
    });
    
    afterEach (function() {
        view.sliderEl.remove();
    });
        
    it('Должен быть объявлен', function() {
        expect(XRangeDiapason).toBeDefined();
    });
            
    it('Метод render вставляет div с классом "diapason x-range-diapason" в ".scale x-range-scale"', function() {
        view.state.diapasones[0].render(view.state.scale.scaleEl);
        
        expect(view.state.diapasones[0].diapasonEl.className).toBe('diapason x-range-diapason');
        expect(view.state.diapasones[0].diapasonEl.parentElement.className).toBe('scale x-range-scale');
    });

});
