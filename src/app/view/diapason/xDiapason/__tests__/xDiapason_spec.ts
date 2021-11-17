import ToxinSliderView from '../../../view.ts';
import XDiapason from '../xDiapason.ts';

const testXDiapason = function(sliderSettings) {
    
    describe('XDiapason', function() {
    
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
            expect(XDiapason).toBeDefined();
        });

        it('Метод render вставляет div с классом "diapason x-diapason" в элемент, переданный в параметрах', function() {

            view.state.diapasones[0].diapasonEl.remove();
            view.state.diapasones[0].render(view.state.scale.scaleEl);

            expect(view.state.diapasones[0].diapasonEl.className).toBe('diapason x-diapason');
            expect(view.state.diapasones[0].diapasonEl.parentElement).toBe(view.state.scale.scaleEl);

        });
        
    });
    
}
 
export default testXDiapason;