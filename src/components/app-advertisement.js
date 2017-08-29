import { define, Component } from '@xinix/xin';
import html from './app-advertisement.html';

import './app-advertisement.css';

class AppAdvertisement extends Component {
  get props () {
    return Object.assign({}, super.props, {
      address: {
        type: String,
        value: '',
      },
      urls: {
        type: Array,
        value: () => ([]),
      },
      channels: {
        type: Array,
        value: () => ([]),
      },
      discoveries: {
        type: Array,
        value: () => ([]),
      },
    });
  }

  get template () {
    return html;
  }

  formatList (obj) {
    return obj.join(', ');
  }

  created () {
    super.created();

    let { address, urls, channels, discoveries } = window.swarm.advertisement;
    this.address = address;
    this.urls = urls;
    this.channels = channels;
    this.discoveries = discoveries;
  }
}

define('app-advertisement', AppAdvertisement);
