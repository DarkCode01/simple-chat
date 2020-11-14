const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: '1106267',
  key: '8d0ada5f604f6f1ca64a',
  secret: '03ffa2e3a9a33605e75c',
  cluster: 'us2',
  useTLS: true
});
app.set('PORT', process.env.PORT || 8080);

app.post('/message', (req, res) => {
  const payload = req.body;

  pusher.trigger('presence-chat', 'message', payload);

  res.send(payload);
});

app.post('/pusher/auth', async (req, res) => {
  const userID = uuid.v4();
  const socketID = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketID, channel, {
    user_id: userID,
    user_info: { }
  });

  console.log(`User ${userID} joined to chat.`);

  res.send(auth);
});

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))