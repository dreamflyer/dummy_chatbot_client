var socket = io("127.0.0.1:9595/");

socket.on('connect', function(data) {
    console.log("connected");

    setInterval(() => {
        socket.emit("get_chat", {}, (data) => {
            data.forEach(item => {
                if(chat.find(found => found.id == item.id)) {
                    return;
                }

                chat.push(item);

                insertChat(item);
            })
        })
    }, 100)
});

function postMessage(message) {
    socket.emit("post_message", {
        "username": "me",
        "text": message,
        "avatar": "https://avatars0.githubusercontent.com/u/712787?s=460&v=4"
    });
}

chat = [];


