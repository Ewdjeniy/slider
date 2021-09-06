import './index.css';
import * as $ from 'jquery';

$('.slider').toxinSlider(
{
    start: 0,
    end: 100,
    step: 1,
    tip: true,
    range: false,
    current: 0,
    scaleValues: 5,
});

$('.slider').toxinSlider('update', {start:0, end: 500, scaleValues: 2});