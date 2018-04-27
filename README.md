# Websocket chat

## Overview:
Chat uses stomp protocol over sockjs as transport to communicate with server writen using Spring boot.

## How to run:
1) npm start 

## Current functionality includes:
1) Public message: just type word into the chat
2) Private message: /w <username> <msg>
3) Output of a help message: /help


## Next steps:

1) Add user-creation and integrate with existing authentication on server
2) Customize profile(built-in user settings)
3) Token-based authentication
4) Integrate with Oath2 (Facebook e.g.)
5) Channels(creation/edit)
6) Interactive board( usecase : you can add a board to chat-area and then you can draw figures therefore other users in the current channel can see these figures)

