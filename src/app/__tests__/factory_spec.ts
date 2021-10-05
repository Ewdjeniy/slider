import * as $ from 'jquery';

describe('jquery.toxinSlider', function() {
    let inpt: any;
    
    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
    });
    
    it('Должен быть доступен в объекте jquery', function() {
        expect($.fn.toxinSlider).toBeDefined();
    });
    
    it('Должен иметь цепной способ вызова', function() {
        expect($(inpt).toxinSlider()).toEqual(inpt);
    });
});