//import ToxinSliderView from '../view.ts';
//
//const testToxinSliderView = function(sliderSettings) {
//    
//    const describeFunc = function(testSubviews?: any) {
//    
//        describe('ToxinSliderView', function() {
//
//            let inpt: any;
//            let view: any;
//
//            beforeEach(function() {
//                setFixtures('<div id="test" style="width: 120px;"><input type="text" id="slider"></div>');
//                inpt = document.getElementById('slider');
//                view = new ToxinSliderView(inpt);
//                if (sliderSettings) {
//                    view.update(sliderSettings);  
//                }
//            });
//
//            afterEach (function() {
//                view.sliderEl.remove();
//            });
//
//            it('Должен быть объявлен', function() {
//                expect(ToxinSliderView).toBeDefined();
//            });
//            
//            it('Метод getCurrentValue возвращает текущее значение слайдера', function() {
//                
//                const expectedValue = (view.getCurrentValue() instanceof Array) ? view.getCurrentValue()[0] + view.sliderSettings.separator + view.getCurrentValue()[1] : view.getCurrentValue().toString();
//                
//                expect(expectedValue).toEqual(inpt.value);
//                
//            });
//
//            if (testSubviews) {
//                testSubviews();
//            }
//
//        });
//    }
//    
//    return {
//        testItself: function() {describeFunc();},
//        testItselfWithSubViews: function(testFunction: any) {
//            describeFunc(testFunction);
//        }
//    };
//    
//}
//
//
//export default testToxinSliderView;