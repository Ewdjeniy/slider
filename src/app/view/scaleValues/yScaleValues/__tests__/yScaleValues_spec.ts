import ToxinSliderView from '../../../view.ts';
import YScaleValues from '../yScaleValues.ts';
        
const testYScaleValues = function(sliderSettings) {
    
    describe('YScaleValues', function() {
         
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
            expect(YScaleValues).toBeDefined();
        });

        it('Отрисовывает шкалу значений с классом "sсale-values y-scale-values" перед шкалой ".scale y-scale"', function() {

            view.state.scaleValues.scaleValuesEl.remove();
            view.state.scaleValues.render(view.state.scale.scaleEl);

            expect(view.state.scaleValues.scaleValuesEl.className).toBe('sсale-values y-scale-values');
            expect(view.state.scaleValues.scaleValuesEl.nextElementSibling.className).toBe('scale y-scale');

        });
        
    });

}
    
export default testYScaleValues;