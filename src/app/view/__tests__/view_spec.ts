import ToxinSliderView from '../view.ts';
import ObservableSubject from '../../observers.ts';
import XOutput from '../output/xOutput/xOutput.ts';
import XRangeOutput from '../output/xRangeOutput/xRangeOutput.ts';
import XScale from '../scale/xScale/xScale.ts';
import XRangeScale from '../scale/xRangeScale/xRangeScale.ts';
import XDiapason from '../diapason/xDiapason/xDiapason.ts';
import XRangeDiapason from '../diapason/xRangeDiapason/xRangeDiapason.ts';
import XRunner from '../runner/xRunner/xRunner.ts';
import XRangeRunner from '../runner/xRangeRunner/xRangeRunner.ts';
import XTip from '../tip/xTip/xTip.ts';
import XRangeTip from '../tip/xRangeTip/xRangeTip.ts';
import XProgressBar from '../progressBar/xProgressBar/xProgressBar.ts';
import XRangeProgressBar from '../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import * as $ from 'jquery';

describe('ToxinSliderView', function() {
    let inpt: any;
    let view: SliderView;
    
    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
    });
    

});