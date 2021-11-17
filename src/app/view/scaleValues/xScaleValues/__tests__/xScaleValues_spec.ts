import ToxinSliderView from '../../../view.ts';
import XScaleValues from '../xScaleValues.ts';
        
const testXScaleValues = function(sliderSettings) {
    
    describe('XScaleValues', function() {
         
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
            expect(XScaleValues).toBeDefined();
        });

        it('Отрисовывает шкалу значений с классом "sсale-values x-scale-values" за шкалой ".scale x-scale"', function() {

            view.state.scaleValues.scaleValuesEl.remove();
            view.state.scaleValues.render(view.state.scale.scaleEl);

            expect(view.state.scaleValues.scaleValuesEl.className).toBe('sсale-values x-scale-values');
            expect(view.state.scaleValues.scaleValuesEl.previousElementSibling.className).toBe('scale x-scale');

        });
        
    });

}
    
export default testXScaleValues;