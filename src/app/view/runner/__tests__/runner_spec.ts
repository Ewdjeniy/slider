import ToxinSliderView from '../../view.ts';
import Runner from '../runner.ts';
import testXRunner from '../xRunner/__tests__/xRunner_spec.ts';
import testXRangeRunner from '../xRangeRunner/__tests__/xRangeRunner_spec.ts';
        
const testRunner = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
        
        describe('Runner', function() {

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
                expect(Runner).toBeDefined();
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
    
export default testRunner;