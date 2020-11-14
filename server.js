require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const Pusher = require('pusher');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.REACT_APP_PUSHER_APP_ID,
  key: process.env.REACT_APP_PUSHER_KEY,
  secret: process.env.REACT_APP_PUSHER_SECRET,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  useTLS: true
});
app.set('PORT', process.env.PORT || 8080);

app.post('/messages', (req, res) => {
  const payload = req.body;

  if (payload.type === 'general') pusher.trigger('presence-chat', 'message', payload);
  // if (payload.type === 'dm') // TODO: somethign

  res.send(payload);
});

app.post('/pusher/auth', async (req, res) => {
  const username = uuid.v4();
  const socketID = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketID, channel, {
    user_id: socketID,
    user_info: {
      name: username
    }
  });

  console.log(`User ${username} joined to chat.`);

  res.send(auth);
});

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))