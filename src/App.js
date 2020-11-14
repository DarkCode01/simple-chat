import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { filter } from 'ramda';

import { Layout } from 'antd';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Content } from './components/Content';
// import { SignIn } from './components/SignIn';


function App() {
  // general
  const [current, setCurrent] = useState('general');

  // user and messages
  const [username, setUsername] = useState(null);
  const [messages, setmessages] = useState([]);
  const [users, setUsers] = useState([]);

  // handles
  const changeChat = chat => {
    return () => setCurrent(chat);
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      authEndpoint: `${process.env.REACT_APP_API_URL}pusher/auth`,
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
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

    // bind dm messages
    // channel.bind('dm', data => {
    //   // TODO: do something 
    // });
    
    return () => {
      pusher.unsubscribe('presence-chat');
    }
  }, []);

  // const handleChange = event => {
  //   event.preventDefault();

  //   setText(event.target.value);
  // }

  const handleTosubmit = (message) => {
    axios.post(`${process.env.REACT_APP_API_URL}messages`, message);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* signin */}
      {/* <SignIn
        visible={!username}
        onCancel={() => {}}
        onCreate={newUsername => setUsername(newUsername)}
      /> */}


      <Sidebar
        current={current}
        setCurrent={changeChat}
        username={username}
        users={users}
      />

      <Layout className="site-layout">
        <Header current={current} />

        <Content
          current={current}
          userID={username}
          messages={messages}
          handleToSubmit={handleTosubmit}
        />
      </Layout>
    </Layout>
  );
}

export default App;