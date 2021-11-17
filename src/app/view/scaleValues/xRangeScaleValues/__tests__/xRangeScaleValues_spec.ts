import ToxinSliderView from '../../../view.ts';
import XRangeScaleValues from '../xRangeScaleValues.ts';
        
const testXRangeScaleValues = function(sliderSettings) {
    
    describe('XRangeScaleValues', function() {
         
        let inpt: any;
        let view: any;
        const checkXRangeSettings = function(): void {
            if (view.sliderSettings.direction != 'x' || !view.sliderSettings.range) {
                pending ('Тест срабатывает с настройками direction: "x", range: true');
            }
        };

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

        it('должен быть объявлен', function() {
            expect(XRangeScaleValues).toBeDefined();
        });

        it('Отрисовывает шкалу значений с классом "sсale-values x-range-scale-values" за элементом, переданном в параметрах', function() {

            view.state.scaleValues.scaleValuesEl.remove();
            view.state.scaleValues.render(view.state.scale.scaleEl);

            expect(view.state.scaleValues.scaleValuesEl.className).toBe('sсale-values x-range-scale-values');
            expect(view.state.scaleValues.scaleValuesEl.previousElementSibling).toBe(view.state.scale.scaleEl);
         });
        
    });

}

export default testXRangeScaleValues;