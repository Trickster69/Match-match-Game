import './style.css';

// import img from './assets/card-back.png';
// import { MainPage } from './pages/MainPage/MainPage';
import {AboutPage} from './pages/AboutPage/AboutPage';
import {SettingPage} from './pages/SettingPage/SettingPage';
import { Header } from './pages/Header/Header';
import { ScorePage } from './pages/ScorePage/ScorePage';
import {VictoryModal} from './components/VictoryModal/VictoryModal';
import { AudioController } from './components/AudioConterller';
import { GameOverModal } from './components/GameOverModal/GameOverModal';
import { GameContainer } from './components/GameContainer/GameContainer';
import { MainPage } from './pages/MainPage/MainPage';
import music from './assets/match-bg2.mp3'
window.onload = () => {

  // new Header();
  // new SettingPage();
  // new ScorePage().renderer();
  // new VictoryModal('356');
  new MainPage();
  // new AudioController().startMusic();






};
