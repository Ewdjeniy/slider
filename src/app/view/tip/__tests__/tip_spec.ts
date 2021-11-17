import ToxinSliderView from '../../view.ts';
import Tip from '../tip.ts';
import testXTip from '../xTip/__tests__/xTip_spec.ts';
import testXRangeTip from '../xRangeTip/__tests__/xRangeTip_spec.ts';
        
const testTip = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
    
        describe('Tip', function() {

            let inpt: any;
            let view: any;

            beforeEach(function() {
                setFixtures('<input type="text" id="slider">');
                inpt = document.getElementById('slider');
                view = new ToxinSliderView(inpt);
                if (sliderSettings) {
                    view.update(sliderSettings);  
                }
            });

            afterEach (function() {
                view.sliderEl.remove();
            });

            it('Должен быть объявлен', function() {
                expect(Tip).toBeDefined();
            });

            if (testFunction) {
                testFunction(sliderSettings);
            }

        });
        
    }
    
    return {
        testItself: function() {describeFunc();},
        testItselfWithSubClass: function(testFunction: any) {
            describeFunc(testFunction);
        }
    };

}
    
export default testTip;