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
    let view: SliderView;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
        view.update({tip: true, range: true, current: [0, 25]});
    });
        
    it('должен быть объявлен', function() {
        expect(XRangeOutput).toBeDefined();
    });

});
