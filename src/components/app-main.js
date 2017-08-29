import { define, Component } from '@xinix/xin';
import html from './app-main.html';

import './app-main.css';
import './app-advertisement';
import './app-sessions';
import './app-messaging';

class AppMain extends Component {
  get template () {
    return html;
  }
}

define('app-main', AppMain);
