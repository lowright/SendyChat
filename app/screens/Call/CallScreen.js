import React from 'react';
import {
<<<<<<< HEAD
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

import io from 'socket.io-client'

const dimensions = Dimensions.get('window')

export default class CallScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,
      remoteStream: null,
    }

    this.sdp
    this.socket = null
    this.candidates = []
  }

  componentDidMount = () => {

    this.socket = io.connect(
      'https://a735f6c9b2d7.ngrok.io/webrtcPeer',
      {
        path: '/io/webrtc',
        query: {}
=======
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
  } from 'react-native-webrtc';

export default function CallScreen() {
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [cachedRemotePC, setCachedRemotePC] = React.useState();

  const [isMuted, setIsMuted] = React.useState(false);

  const startLocalStream = async () => {
    
    //isFront определит, должна ли исходная камера быть лицом к пользователю или среде
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async () => {
    
    const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);

    localPC.onicecandidate = e => {
      try {
        console.log('localPC icecandidate:', e.candidate);
        if (e.candidate) {
          remotePC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
>>>>>>> e8a40b00a80e778cc793370b009dd410d9b336f3
      }
    )

    this.socket.on('connection-success', success => {
      console.log(success)
    })

    this.socket.on('offerOrAnswer', (sdp) => {

      this.sdp = JSON.stringify(sdp)

      this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    this.socket.on('candidate', (candidate) => {
      this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    })

    const pc_config = {
      "iceServers": [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }

    this.pc = new RTCPeerConnection(pc_config)

    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate)
      }
    }

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    this.pc.onaddstream = (e) => {
      this.setState({
        remoteStream: e.stream
      })
    }
    
    const success = (stream) => {
      console.log(stream.toURL())
      this.setState({
        localStream: stream
      })
      this.pc.addStream(stream)
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
<<<<<<< HEAD

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, 
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: (isFront ? "user" : "environment"),
          optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
        }
      }

      mediaDevices.getUserMedia(constraints)
        .then(success)
        .catch(failure);
=======
    };

    localPC.addStream(localStream);
      try {
          const offer = await localPC.createOffer();
          console.log('Offer from localPC, setLocalDescription');
          await localPC.setLocalDescription(offer);
          console.log('remotePC, setRemoteDescription');
          await remotePC.setRemoteDescription(localPC.localDescription);
          console.log('RemotePC, createAnswer');
          const answer = await remotePC.createAnswer();
          console.log(`Answer from remotePC: ${answer.sdp}`);
          console.log('remotePC, setLocalDescription');
          await remotePC.setLocalDescription(answer);
          console.log('localPC, setRemoteDescription');
          await localPC.setRemoteDescription(remotePC.localDescription);
      } catch (err) {
          console.error(err);
      }
      setCachedLocalPC(localPC);
      setCachedRemotePC(remotePC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  const toggleMute = () => {
    if (!remoteStream) return;
    localStream.getAudioTracks().forEach(track => {
      console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
>>>>>>> e8a40b00a80e778cc793370b009dd410d9b336f3
    });
  }
    sendToPeer = (messageType, payload) => {
      this.socket.emit(messageType, {
        socketID: this.socket.id,
        payload
      })
    }

    createOffer = () => {
      console.log('Offer')
  
      this.pc.createOffer({ offerToReceiveVideo: 1 })
        .then(sdp => {
          // console.log(JSON.stringify(sdp))
  
          // set offer sdp as local description
          this.pc.setLocalDescription(sdp)
  
          this.sendToPeer('offerOrAnswer', sdp)
      })
    }
    
    createAnswer = () => {
      console.log('Answer')
      this.pc.createAnswer({ offerToReceiveVideo: 1 })
        .then(sdp => {
          // console.log(JSON.stringify(sdp))
  
          // set answer sdp as local description
          this.pc.setLocalDescription(sdp)
  
          this.sendToPeer('offerOrAnswer', sdp)
      })
    }

    setRemoteDescription = () => {
      const desc = JSON.parse(this.sdp)
  
      this.pc.setRemoteDescription(new RTCSessionDescription(desc))
    }

    addCandidate = () => {
      this.candidates.forEach(candidate => {
        console.log(JSON.stringify(candidate))
        this.pc.addIceCandidate(new RTCIceCandidate(candidate))
      });
    }

  render() {
    const {
      localStream,
      remoteStream,
    } = this.state

    const remoteVideo = remoteStream ?
      (
        <RTCView
          key={2}
          mirror={true}
          style={{ ...styles.rtcViewRemote }}
          objectFit='contain'
          streamURL={remoteStream && remoteStream.toURL()}
        />
      ) :
      (
        <View style={{ padding: 15, }}>
          <Text style={{ fontSize:22, textAlign: 'center', color: 'white' }}>Подкл кандидата ....</Text>
        </View>
      )

    return (
      
      <SafeAreaView style={{ flex: 1, }}>
        <StatusBar backgroundColor="blue" barStyle={'dark-content'}/>
          <View style={{...styles.buttonsContainer}}>
            <View style={{ flex: 1, }}>
              <TouchableOpacity onPress={this.createOffer}>
                <View style={styles.button}>
                  <Text style={{ ...styles.textContent, }}>Call</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, }}>
              <TouchableOpacity onPress={this.createAnswer}>
                <View style={styles.button}>
                  <Text style={{ ...styles.textContent, }}>Answer</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.videosContainer, }}>
          <View style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 10,
            right: 10,
            width: 100, height: 200,
            backgroundColor: 'black', //width: '100%', height: '100%'
          }}>
              <View style={{flex: 1 }}>
                <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
                  <View>
                  <RTCView
                    key={1}
                    zOrder={0}
                    objectFit='cover'
                    style={{ ...styles.rtcView }}
                    streamURL={localStream && localStream.toURL()}
                    />
                  </View>
                </TouchableOpacity>
              </View>
          </View>
          <ScrollView style={{ ...styles.scrollView }}>
            <View style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              { remoteVideo }
            </View>
          </ScrollView>
          </View>
        </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor : 'grey'

  },
  rtcView: {
    width: 100, 
    height: 200,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    // flexDirection: 'row',
    padding: 15,
  },
  rtcViewRemote: {
    width: dimensions.width - 30,
    height: 200,
    backgroundColor: 'black',
  }
});