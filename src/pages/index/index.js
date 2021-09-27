import './index.css';
import * as $ from 'jquery';

$('.slider').toxinSlider({
    start: 0,
    end: 100,
    step: 1,
    current: [0,0],
    scaleValues: 0,
    direction: 'x',
    range: true,
    tip: true,
    separator: ' - '
});
