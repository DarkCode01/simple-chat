import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { filter } from 'ramda';

import { Layout } from 'antd';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { SignIn } from './components/SignIn';


function App() {
  const [username, setUsername] = useState(null);
  const [text, setText] = useState('');
  const [messages, setmessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('8d0ada5f604f6f1ca64a', {
      authEndpoint: 'http://localhost:8080/pusher/auth',
      cluster: 'us2',
      useTLS: true
    });

    const channel = pusher.subscribe('presence-chat');

    // add users to list...
    channel.bind('pusher:subscription_succeeded', data => {
      setUsername(data.myID);
      setUsers(Object.keys(data.members));
    });

    channel.bind('pusher:member_added', member => {
      setUsers(u => [ ...u, member.id ]);
    });

    // remove user when unsuscripbe
    channel.bind('pusher:member_removed', member => {
      setUsers(u => filter(id => id !== member.id, u));
    });

    // bind messages
    channel.bind('message', data => {
      setmessages(s => [ ...s, data ]);
    });

    console.log(pusher.sessionID);
    
    return () => {
      pusher.unsubscribe('presence-chat');
    }
  }, []);

  const handleChange = event => {
    event.preventDefault();

    setText(event.target.value);
  }

  const handleTosubmit = message => {
    axios.post('http://localhost:8080/message', message);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* signin */}
      {/* <SignIn
        visible={!username}
        onCancel={() => {}}
        onCreate={newUsername => setUsername(newUsername)}
      /> */}


      <Sidebar users={users} />

      <Layout className="site-layout">
        <Header />

        <Content
          userID={username}
          messages={messages}
          handleToSubmit={handleTosubmit}
        />
      </Layout>
    </Layout>
  );
}

export default App;