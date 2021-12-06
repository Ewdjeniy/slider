import './index.css';
import * as $ from 'jquery';
import synchronizePanelWithSlider from '../../components/sliderWithPanel/sliderWithPanel.js';

const panels = document.getElementsByClassName('slider-with-panel');

synchronizePanelWithSlider(panels[0].getElementsByClassName('first-slider')[0], panels[0], 0, 100, 1, 2, 'x', false, true, ' - ', 25, 0);

synchronizePanelWithSlider(panels[1].getElementsByClassName('second-slider')[0], panels[1], -50, 50, 1, 3, 'x', true, false, ' - ', 25, 0);

synchronizePanelWithSlider(panels[2].getElementsByClassName('third-slider')[0], panels[2], 0, 1000, 10, 0, 'y', false, true, ' - ', 100, 0);

synchronizePanelWithSlider(panels[3].getElementsByClassName('fourth-slider')[0], panels[3], 0, 50, 0.1, 4, 'y', true, false, ' - ', 25, 0);
