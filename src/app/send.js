import { App } from 'twlv-swarm';

class Send extends App {
  constructor () {
    super('send');
  }

  up () {

  }

  down () {

  }

  onMessage ({ address, command, payload }) {
    this.sendEvent({ name: 'message', payload: { address, value: payload } });
  }

  onRequest () {

  }
}

export default Send;
