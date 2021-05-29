
import './style.css';
// import img from './assets/card-back.png';
// import { MainPage } from './pages/MainPage.ts';
// import {AboutPage} from './pages/AboutPage/AboutPage';
import {SettingPage} from './pages/SettingPage/SettingPage';
import { Header } from './pages/Header/Header';
import { ScorePage } from './pages/ScorePage/ScorePage';
window.onload = () => {
  new Header();
  // new SettingPage();
  new ScorePage().renderer();
};
