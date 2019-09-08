import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import SimplePeer from 'simple-peer';
import './styles/main.scss';

const bindEvents = (peerConnection: SimplePeer.Instance, acceptServerResponse: (resp: { password: string }) => void) => {
  peerConnection.on('signal', (data) => {
    const strData = JSON.stringify(data);
    fetch('/offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: strData,
    })
      .then(resp => resp.json())
      .then(acceptServerResponse);
  });

  peerConnection.on('stream', stream => {
    // const receiverVideo = document.querySelector('#receiver-video');
    // receiverVideo.srcObject = stream;
    // receiverVideo.volume = 0; // Hluk při testování
    // receiverVideo.play();
  });

  // document.querySelector('#accept-offer').addEventListener('click', () => {
  //   const offerText = document.querySelector('#incoming-offer').value;
  //   const offerObject = JSON.parse(offerText);
  //
  //   if (peerConnection === null) {
  //     peerConnection = new SimplePeer({
  //       initiator: false,
  //       trickle: false,
  //     });
  //     bindEvents(peerConnection);
  //   }
  //   peerConnection.signal(offerObject);
  // });
};

const App: React.FC = () => {
  const myCam = useRef<HTMLVideoElement>();
  const [url, setUrl] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
      .then(stream => {
        const peerConnection = new SimplePeer({
          initiator: true,
          trickle: false,
          stream,
        });

        bindEvents(peerConnection, ({ password }) => {
          setUrl(`${window.location.origin}/#${password}`);
        });

        if (myCam.current) {
          myCam.current.srcObject = stream;
          myCam.current.volume = 0;
          myCam.current.play();
        }
        else {
          throw new Error('Cannot initiate emitter video.');
        }
      });
  }, []);
  return (
    <div className="app">
      <aside className="left">
        <video
          ref={myCam as RefObject<any>}
          className="my-cam"
        />
        <p>
          {url}
        </p>
      </aside>
      <aside className="right">
        <video
          className="remote-cam"
        />
      </aside>
    </div>
  );
};

export default App;
