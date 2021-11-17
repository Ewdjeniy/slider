import ToxinSliderView from '../../../view.ts';
import XRangeDiapason from '../xRangeDiapason.ts';

const testXRangeDiapason = function(sliderSettings) {
         
    describe('XRangeDiapason', function() {
    
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
            expect(XRangeDiapason).toBeDefined();
        });

        it('Метод render вставляет div с классом "diapason x-range-diapason" в элемент, переданный в параметрах"', function() {

            view.state.diapasones.forEach((diapasone, i) => {
                view.state.diapasones[i].diapasonEl.remove();
                view.state.diapasones[i].render(view.state.scale.scaleEl);

                expect(view.state.diapasones[i].diapasonEl.className).toBe('diapason x-range-diapason');
                expect(view.state.diapasones[i].diapasonEl.parentElement.className).toBe('scale x-range-scale'); 
            });

        });
        
    });

}

export default testXRangeDiapason;
