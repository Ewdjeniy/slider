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
    let view: SliderView;

    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
    });
        
    it('должен быть объявлен', function() {
        expect(XDiapason).toBeDefined();
    });

});
    
