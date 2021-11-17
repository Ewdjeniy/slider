import ToxinSliderView from '../../view.ts';
import Scale from '../scale.ts';
import testXScale from '../xScale/__tests__/xScale_spec.ts';
import testXRangeScale from '../xRangeScale/__tests__/xRangeScale_spec.ts';
        
const testScale = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
        
        describe('Scale', function() {

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
                expect(Scale).toBeDefined();
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
    
export default testScale;