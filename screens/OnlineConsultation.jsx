import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, MediaStream } from 'react-native-webrtc';
import { ref, onValue, push, set, update, remove, off } from 'firebase/database';
import { database } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const OnlineConsultation = ({ route, navigation }) => {
  const { id } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(null);
  const isCaller = useRef(false);

  const channelRef = ref(database, `channels/${id}`);
  const offerCandidatesRef = ref(database, `channels/${id}/offerCandidates`);
  const answerCandidatesRef = ref(database, `channels/${id}/answerCandidates`);

  useEffect(() => {
    startLocalStream();

    // Clean up on disconnect
    return () => {
      if (pc.current) pc.current.close();
      if (localStream) localStream.getTracks().forEach(track => track.stop());
      cleanupFirebase();
    };
  }, []);

  const cleanupFirebase = async () => {
    // Remove channel and candidates on disconnect
    await remove(channelRef);
    off(channelRef);
    off(offerCandidatesRef);
    off(answerCandidatesRef);
  };

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    setupWebRTC(stream);
  };

  const setupWebRTC = async (stream) => {
    pc.current = new RTCPeerConnection(configuration);

    // Add local tracks
    stream.getTracks().forEach(track => {
      pc.current.addTrack(track, stream);
    });

    // Create remote stream and set it
    const remote = new MediaStream();
    setRemoteStream(remote);

    // Add tracks to remote stream on receiving
    pc.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remote.addTrack(track);
      });
    };

    // Handle ICE candidates locally
    pc.current.onicecandidate = event => {
      if (event.candidate) {
        const candidate = event.candidate.toJSON();
        if (isCaller.current) {
          push(offerCandidatesRef, candidate);
        } else {
          push(answerCandidatesRef, candidate);
        }
      }
    };

    // Check if this user is the caller or not
    onValue(channelRef, async snapshot => {
      const data = snapshot.val();

      if (!data?.offer && !isCaller.current) {
        // Caller: create offer
        isCaller.current = true;
        const offerDescription = await pc.current.createOffer();
        await pc.current.setLocalDescription(offerDescription);
        await set(channelRef, { offer: offerDescription.toJSON() });

        // Listen for answer
        onValue(channelRef, snapshot => {
          const data = snapshot.val();
          if (data?.answer && !pc.current.currentRemoteDescription) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.current.setRemoteDescription(answerDescription);
          }
        });

        // Listen for remote ICE candidates from answerer
        onValue(answerCandidatesRef, snapshot => {
          snapshot.forEach(childSnapshot => {
            const candidate = childSnapshot.val();
            pc.current.addIceCandidate(new RTCIceCandidate(candidate));
          });
        });

      } else if (data?.offer && !isCaller.current) {
        // Answerer: set remote offer and create answer
        const offerDescription = new RTCSessionDescription(data.offer);
        await pc.current.setRemoteDescription(offerDescription);

        const answerDescription = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answerDescription);

        await update(channelRef, { answer: answerDescription.toJSON() });

        // Listen for remote ICE candidates from caller
        onValue(offerCandidatesRef, snapshot => {
          snapshot.forEach(childSnapshot => {
            const candidate = childSnapshot.val();
            pc.current.addIceCandidate(new RTCIceCandidate(candidate));
          });
        });
      }
    }, { onlyOnce: true });
  };

  const endCall = () => {
    if (pc.current) pc.current.close();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    cleanupFirebase();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
            objectFit="cover"
            mirror
          />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        )}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={endCall} style={styles.endCallButton}>
          <Icon name="call-end" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  localVideo: {
    width: width,
    height: height/2,
  },
  remoteVideo: {
    width: width,
    height: height/2,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 30,
  },
});

export default OnlineConsultation;