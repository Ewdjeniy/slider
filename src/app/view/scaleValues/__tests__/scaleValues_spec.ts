import ToxinSliderView from '../../view.ts';
import ScaleValues from '../scaleValues.ts';
import testXScaleValues from '../xScaleValues/__tests__/xScaleValues_spec.ts';
import testXRangeScaleValues from '../xRangeScaleValues/__tests__/xRangeScaleValues_spec.ts';
        
const testScaleValues = function(sliderSettings) {
    
    const describeFunc = function(testFunction?: any) {
    
        describe('ScaleValues', function() {

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
                expect(ScaleValues).toBeDefined();
            });

            it('Метод setScaleValues проставляет значения шкалы, количество значений зависит от view.sliderSettings.scaleValuesAmount', function() {
        
                let expectedValue = '';
                
                if (view.sliderSettings.scaleValuesAmount == 1) {
                    expectedValue = '<span class="scale-first-value">' + view.sliderSettings.start + '</span>'; 
                } else if (view.sliderSettings.scaleValuesAmount == 2) {
                    expectedValue = '<span class="scale-first-value">' + view.sliderSettings.start + '</span>' + '<span class="scale-last-value">' + view.sliderSettings.end + '</span>';      
                } else if (view.sliderSettings.scaleValuesAmount > 2) {
                    let result: string = '<span class="scale-first-value">' + view.sliderSettings.start + '</span>';
                    for (let i = 1; i < view.sliderSettings.scaleValuesAmount - 1; i++) {
                        result += '<span class="scale-value">';
                        result += Math.round(+view.sliderSettings.start + ((+view.sliderSettings.end - (+view.sliderSettings.start))  / (view.sliderSettings.scaleValuesAmount - 1)) * i);
                        result += '</span>';
                    }
                    result += '<span class="scale-last-value">' + view.sliderSettings.end + '</span>';
                    expectedValue = result;
                }
                
                expect(view.state.scaleValues.scaleValuesEl.innerHTML).toBe(expectedValue);
                
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
    
export default testScaleValues;