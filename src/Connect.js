import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './Connect.css'
import petVid from './Pexels Videos 1508067.mp4';

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


    const createOffer = async () => {
        if (!(pcRef.current && connRef.current)) return;
        try {
            const sdp = await pcRef.current.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));

            connRef.current.send({
                event: "offer",
                data: sdp
            });

            console.log("offer created");
        } catch (e) {
            console.error(e);
        }
    };
        /*
        pcRef.current.createOffer(function(offer) {
            send({
                event : "offer",
                data : offer
            });
            pcRef.currnet.setLocalDescription(offer);
        }, function(error) {
            alert("Error creating an offer");
        });
    }*/
    /*
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

    }*/
    const createAnswer = async (sdp) => {
        if (!(pcRef.current && connRef.current)) {
            console.log("stupid")
            return;
        }
        try {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
            console.log("answer set remote description success");
            const mySdp = await pcRef.current.createAnswer({
                offerToReceiveVideo: true,
                offerToReceiveAudio: true,
            });
            console.log("create answer");
            await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));

            connRef.current.send(JSON.stringify({
                event: "answer",
                data: mySdp
            }));


        } catch(e) {
            console.error(e);
        }
    };

    function handleCandidate(candidate) {
        return async (candidate) => {
            if(!pcRef.current) return;
            await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            console.log("candidate add success");
        }
    };

    function handleAnswer(answer) {
        pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("connection established successfully!");
    };

    /*
    function send(message) {
        connRef.current.send(JSON.stringify(message));
    };
     */

/*
    function initialize() {

        pcRef.current = new RTCPeerConnection(pc_config);

        //setup ice handling
        pcRef.current.onicecandidate = function (event) {
            if (event.candidate) {
                connRef.current.send(JSON.stringify({
                    event: "candidate",
                    data: event.candidate
                }));
            }
        };


        //create data channel
        const dataChannel = pcRef.current.createDataChannel("dataChannel", {
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
    };
*/
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

            pcRef.current.oniceconnectionstatechange = (e) => {
                console.log(e);
            };

            pcRef.current.ontrack = (ev) => {
                console.log("add remotetrack success");
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = ev.streams[0];
                }
            };

        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {

        connRef.current = new WebSocket(SOCKET_SERVER_URL);

        connRef.current.onopen = function () {
            console.log("Connected to the signaling server");
        };

        createOffer();

        connRef.current.onmessage = function(msg) {
            console.log("Got message", msg.data);
            var content = JSON.parse(msg.data);
            var data = content.data;
            switch (content.event) {
                //when somebody wants to call us
                case "offer":
                    createAnswer(data);
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

        setVideoTracks();

        return () => {
            if (pcRef.current) {
                pcRef.current.close();
            }
        }

    }, []);

    return (
        <div className="connect">
            <div className="vidContainer">
                <video
                    className="remoteVideo"
                    ref={localVideoRef}
                    autoPlay
                />
                <video
                    className="localVideo"
                    muted
                    autoPlay
                >
                    <source src={petVid}
                        type="video/mp4"/>
                </video>
            </div>
            <Link className="disconnect" to="/home2" />
        </div>
    );
};

export default Connect;