import ToxinSliderView from '../../view.ts';
import Output from '../output.ts';


const testOutput = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
        describe('Output', function() {

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
                expect(Output).toBeDefined();
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
    
export default testOutput;