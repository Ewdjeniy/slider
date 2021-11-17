import ToxinSliderView from '../../../view.ts';
import YRangeDiapason from '../yRangeDiapason.ts';

const testYRangeDiapason = function(sliderSettings) {
         
    describe('YRangeDiapason', function() {
    
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
            expect(YRangeDiapason).toBeDefined();
        });

        it('Метод render вставляет div с классом "diapason y-range-diapason" в элемент, переданный в параметрах"', function() {

            view.state.diapasones.forEach((diapasone, i) => {
                view.state.diapasones[i].diapasonEl.remove();
                view.state.diapasones[i].render(view.state.scale.scaleEl);

                expect(view.state.diapasones[i].diapasonEl.className).toBe('diapason y-range-diapason');
                expect(view.state.diapasones[i].diapasonEl.parentElement.className).toBe('scale y-range-scale'); 
            });

        });
        
    });

}

export default testYRangeDiapason;
