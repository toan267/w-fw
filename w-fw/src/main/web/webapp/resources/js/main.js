$(function() {
    var url = "http://toan-lab:7070/http-bind/"
    var conn
    var connect = function() {
        conn = new Strophe.Connection(url)
        conn.connect($("#jid").val(), $("#pwd").val(), function(state) {
            console.log(state)
            switch (state) {
                case Strophe.Status.CONNECTING:
                    console.log("connecting")
                    break
                case Strophe.Status.CONNECTED:
                    console.log("connected...")
                    connected()
                    break
                default:
                    console.log("error... state: " + state)
            }
        })
    }
    var connected = function() {
        conn.send($pres())
        conn.addHandler(handleMessage, null, "message", "chat")
        conn.addHandler(handleIQ, "custom:iq:example", "iq")
        conn.addHandler(handleIQ2, null, "iq")
        $("#jid").parent().hide()
        var iq = $iq({type: "get", id: "abc", to: "toan-lab"})
            .c("query", {xmlns: "custom:iq:example"})
        conn.send(iq)

    }
    $("#jid").parent().on("click", 'button', connect)

    $.fn.pressEnter = function(fn) {
        return this.each(function() {
            $(this).bind('enterPress', fn)
            $(this).keyup(function(e){
                if(e.keyCode == 13) {
                    $(this).trigger("enterPress")
                }
            })
        })
    }

    $("#textboard").pressEnter(function() {
        var text = $(this).val();
        console.log("send message: " + text)
        var msg = $msg({
            to: 'toan@toan-lab',
            type: 'chat'
        }).c('body').t(text)
        conn.send(msg)
        $(this).val('')
        $("#chat-content").append("me: " + text)
    })

    function handleIQ2(iq) {
        console.log($(iq))
        return true;
    }

    function handleIQ(iq) {
        console.log($(iq))
        var rs = $(iq)[0];
        rs = rs.childNodes;
        if (rs.length > 1) {
            for (var i = 1; i < rs.length; i++) {
                $("#list-id").append($("<div>").text(rs[i].textContent))
            }
        }
        return true;
    }

    function handleMessage(message) {
        window.test = $(message);
        console.log($(message))
        var body = $(message).find('body').contents();
        if (body.length) {
            window.bd = body[0]
            console.log(body[0])
            $("#chat-content").append("calling: " + body[0].nodevalue)

        }
        // }
        return true;
    }
})