import { define, Component } from '@xinix/xin';
import html from './app-messaging.html';
import './app-messaging.css';

import '@xinix/xin/components/for';

class AppMessaging extends Component {
  get template () {
    return html;
  }

  get props () {
    return Object.assign({}, super.props, {
      messages: {
        type: Array,
        value: () => ([]),
      },

      message: {
        type: Object,
        value: () => ({}),
      },
    });
  }

  created () {
    super.created();

    window.app.on('event', evt => {
      this.push('messages', evt.payload);
    });
  }

  doSend (evt) {
    evt.preventDefault();
    let { address, value } = this.message;

    this.$$('.message-field').blur();

    this.async(async () => {
      let command = 'send';
      await window.app.send({ address, command, payload: value });

      this.push('messages', { address: 'me', value });

      this.set('message.value', '');

      this.async(() => this.$$('.message-field').focus());
    }, 300);
  }
}

define('app-messaging', AppMessaging);
