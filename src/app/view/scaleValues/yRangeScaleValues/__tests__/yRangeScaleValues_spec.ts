import ToxinSliderView from '../../../view.ts';
import YRangeScaleValues from '../yRangeScaleValues.ts';
        
const testYRangeScaleValues = function(sliderSettings) {
    
    describe('YRangeScaleValues', function() {
         
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
            expect(YRangeScaleValues).toBeDefined();
        });

        it('Отрисовывает шкалу значений с классом "sсale-values y-range-scale-values" перед элементом, переданном в параметрах', function() {

            view.state.scaleValues.scaleValuesEl.remove();
            view.state.scaleValues.render(view.state.scale.scaleEl);

            expect(view.state.scaleValues.scaleValuesEl.className).toBe('sсale-values y-range-scale-values');
            expect(view.state.scaleValues.scaleValuesEl.nextElementSibling).toBe(view.state.scale.scaleEl);
         });
        
    });

}

export default testYRangeScaleValues;