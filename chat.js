function insertChat(message) {
    var who = message.username;
    var text = message.text;

    var time = 1;
    var control = "";
    var date = message.time;

    var im = message.attachment ? ('<img src="' + message.attachment + '"/>') : '';

    if(who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ message.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                im +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    } else {
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                im +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+message.avatar+'" /></div>' +
                  '</li>';
    }

    setTimeout(function() {
        $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
    }, time);
}

var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");

editor.setTheme("ace/theme/dawn");
editor.session.setMode("ace/mode/text");

editor.commands.addCommand({
    name: "sendMessage",

    bindKey: {
        win: "Enter",
        mac: "Enter"
    },

    exec: function() {
        postMessage(editor.getValue());

        editor.setValue("");
    }
});

var rhymeCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
        if(prefix.length === 0) {
            callback(null, []);

            return;
        }

        socket.emit("get_completions", {}, (data) => callback(null, data.suggestions.map(item => ({
            name: item,
            value: item,
            score: 100,
            meta: "text"
        }))));
    }
};

langTools.setCompleters([rhymeCompleter]);

editor.setOptions({
    showLineNumbers: false,
    showGutter: false,
    wrap: true,
    wrapBehavioursEnabled: false,
    highlightActiveLine: false,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});