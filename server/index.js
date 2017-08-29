const { Swarm } = require('twlv-swarm');
const PeerLookup = require('twlv-swarm/discovery/peer-lookup');
const Socketio = require('twlv-channel-socketio');
const Bono = require('bono');
const http = require('http');

const PORT = process.env.PORT || 8080;

(async () => {
  const bundle = new Bono();
  bundle.use(require('koa-static')('./www'));

  const server = http.createServer(bundle.callback());
  server.listen(PORT, () => console.info(`Listening on ${PORT}`));

  let swarm = new Swarm();
  swarm.addDiscovery(new PeerLookup());
  swarm.addChannel(new Socketio({ port: PORT, server }));

  await swarm.start();
  console.info(`Server started`);
  console.info(`Advertisement`, swarm.advertisement);
})();
