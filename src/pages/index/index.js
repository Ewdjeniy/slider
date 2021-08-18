import './index.css';
import * as $ from 'jquery';

$('.slider').toxinSlider(
{
    start: 0,
    end: 100,
    step: 1,
    tip: false,
    range: true,
    current: [0, 75]
});