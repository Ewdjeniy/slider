import './index.css';
import synchronizePanelWithSlider from '../../components/sliderWithPanel/sliderWithPanel.js';

const panels = document.getElementsByClassName('slider-with-panel');

synchronizePanelWithSlider(panels[0].getElementsByClassName('first-slider')[0], panels[0], -50, 50, 1, 4, 'x', true, true, ' - ', 25, 0)
