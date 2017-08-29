import { Swarm } from 'twlv-swarm';
import PeerLookup from 'twlv-swarm/discovery/peer-lookup';
import Socketio from 'twlv-channel-socketio';
import Webrtc from 'twlv-channel-webrtc';
import Send from './app/send';

import './components/app-main';

(async () => {
  try {
    let swarm = new Swarm();
    window.swarm = swarm;

    swarm.addDiscovery(new PeerLookup());
    swarm.addChannel(new Socketio({ listening: false }));
    // swarm.addChannel(new Webrtc());

    let app = new Send();
    window.app = app;
    swarm.addApp(app);

    await swarm.start();

    console.info('Swarm started');
    console.info(`Advertisement`, swarm.advertisement);
  } catch (err) {
    console.error('Error caught on main', err);
  }
})();
