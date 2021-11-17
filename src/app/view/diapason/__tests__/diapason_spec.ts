import ToxinSliderView from '../../view.ts';
import Diapason from '../diapason.ts';

const testDiapason = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
        
        describe('Diapason', function() {

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

            it('должен быть объявлен', function() {
                expect(Diapason).toBeDefined();
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

export default testDiapason;