import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './Connect.css'

const SOCKET_SERVER_URL = "ws://13.124.110.11/ws/webrtc";

const pc_config = {
    iceServers: [
        {
            urls: "stun:stun2.1.google.com:19302",
        },

        {
            urls: "turn:13.124.110.11:3478?transport=udp",
            username: "rarepet",
            credential: "rarepet1234",
        },
        {
            urls: "turn:13.124.110.11?transport=tcp",
            username: "rarepet",
            credential: "rarepet1234",
        },


    ],
}



const Connect = () => {
    const pcRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const connRef = useRef(null);


    const setVideoTracks = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            localVideoRef.current.srcObject = stream;
            //untill here is local video playing

            if (!(pcRef.current)) return;
            stream.getTracks().forEach((track) => {
                if (!pcRef.current) return;
                pcRef.current.addTrack(track, stream);
                console.log("pcRef local track added");
            });
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        var conn = new WebSocket(SOCKET_SERVER_URL);

        conn.onopen = function () {
            console.log("Connected to the signaling server");
            initialize();
        };

        conn.onmessage = function(msg) {
            console.log("Got message", msg.data);
            var content = JSON.parse(msg.data);
            var data = content.data;
            switch (content.event) {
                //when somebody wants to call us
                case "offer":
                    handleOffer(pcRef.current, data);
                    break;
                case "answer":
                    handleAnswer(data);
                    break;
                    //when a remote peer sends an ice candidate to us
                case "candidate":
                    handleCandidate(data);
                    break;
                default:
                    break;
            }
        };

        function send(message) {
            conn.send(JSON.stringify(message));
        }

        //var peerConnection;
        var dataChannel;

        function initialize() {

            pcRef.current = new RTCPeerConnection(pc_config);

            //setup ice handling
            pcRef.current.onicecandidate = function (event) {
                if (event.candidate) {
                    send({
                        event: "candidate",
                        data: event.candidate
                    });
                }
            };

            //create data channel
            dataChannel = pcRef.current.createDataChannel("dataChannel", {
                reliable: true
            });

            dataChannel.onerror = function (error) {
                console.log("Error occured on datachannel", error);
            };

            dataChannel.onmessage = function(event) {
                console.log("message:", event.data);
            };

            dataChannel.onclose = function () {
                console.log("data channel is closed");
            };

            pcRef.current.ondatachannel = function (event) {
                dataChannel = event.channel;
            };
            console.log(pcRef.current)
            console.log("initialized successfully");
        }

        function createOffer() {
            pcRef.current.createOffer(function(offer) {
                send({
                    event : "offer",
                    data : offer
                });
                pcRef.currnet.setLocalDescription(offer);
            }, function(error) {
                alert("Error creating an offer");
            });
        }

        function handleOffer(offer) {
            pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));

            pcRef.current.createAnswer(function(answer) {
                pcRef.current.setLocalDescription(answer);
                send({
                    event : "answer",
                    data : answer
                });
            }, function(error) {
                alert("Error creating an answer");
            });

        }

        function handleCandidate(candidate) {
            pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        };

        function handleAnswer(answer) {
            pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            console.log("connection established successfully!");
        };

        setVideoTracks();

    }, []);

    return (
        <div className="connect">
            <div className="vidContainer">
                <video
                    style={{
                        width: 240,
                        height: 240,
                        margin: 5,
                        backgroundColor: "black",
                    }}
                    muted
                    ref={localVideoRef}
                    autoPlay
                />
                <video
                    id="remotevideo"
                    style={{
                        width: 240,
                        height: 240,
                        margin: 5,
                        backgroundColor: "black",
                    }}
                    ref={remoteVideoRef}
                    autoPlay
                />
            </div>
            <Link className="disconnect" to="/home" />
        </div>
    );
};

export default Connect;