import './index.css';
import * as $ from 'jquery';
import synchronizePanelWithSlider from '../../components/sliderWithPanel/sliderWithPanel.js';

const panels = document.getElementsByClassName('slider-with-panel');

//synchronizePanelWithSlider(panels[0], {
//    extraClass: '',
//    min: 0,
//    max: 100,
//    step: 1,
//    current: [50],
//    scaleValues: false,
//    scaleValuesAmount: 3,
//    direction: 'x',
//    range: false,
//    tip: true,
//    separator: ' - ',
//    decimalPlaces: 0
//});

//synchronizePanelWithSlider(panels[1], {
//    extraClass: '',
//    min: -50,
//    max: 50,
//    step: 1,
//    current: [0, 25],
//    scaleValues: true,
//    scaleValuesAmount: 3,
//    direction: 'x',
//    range: true,
//    tip: true,
//    separator: ' - ',
//    decimalPlaces: 0
//});
//
//synchronizePanelWithSlider(panels[2], {
//    extraClass: '',
//    min: 0,
//    max: 50000,
//    step: 100,
//    current: [1000],
//    scaleValues: false,
//    scaleValuesAmount: 3,
//    direction: 'y',
//    range: false,
//    tip: true,
//    separator: ' - ',
//    decimalPlaces: 0
//});
//
//synchronizePanelWithSlider(panels[3], {
//    extraClass: '',
//    min: 0,
//    max: 50,
//    step: 0.1,
//    current: [16.1, 36.9],
//    scaleValues: true,
//    scaleValuesAmount: 4,
//    direction: 'y',
//    range: true,
//    tip: false,
//    separator: ' - ',
//    decimalPlaces: 1
//});
