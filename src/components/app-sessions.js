import { define, Component } from '@xinix/xin';
import html from './app-sessions.html';
import './app-sessions.css';

import '@xinix/xin/components/for';

class AppSessions extends Component {
  get props () {
    return Object.assign({}, super.props, {
      connectTo: {
        type: String,
        value: 'socketio://localhost:8080',
      },

      sessions: {
        type: Array,
        value: () => ([]),
      },
    });
  }

  get template () {
    return html;
  }

  created () {
    super.created();

    let onSessionUpdate = this._onSessionUpdate.bind(this);
    window.swarm.on('connect', onSessionUpdate);
    window.swarm.on('disconnect', onSessionUpdate);
  }

  async checkAndConnect (evt) {
    evt.preventDefault();

    let connectTo = this.connectTo;
    if (connectTo.indexOf(':') === -1) {
      connectTo = await window.swarm.lookup(connectTo);
    }
    await window.swarm.connect(connectTo);

    this.set('connectTo', '');
    this.$.connectTo.value = '';
  }

  _onSessionUpdate () {
    this.async(() => {
      this.set('sessions', []);
      this.set('sessions', window.swarm.sessions);
    });
  }

  disconnect (evt, session) {
    evt.preventDefault();

    window.swarm.disconnect(session);
  }
}

define('app-sessions', AppSessions);
