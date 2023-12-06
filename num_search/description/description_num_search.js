$(() => {

    $("#bt-pp1").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            window.history.back();
        }, 150);
    });

    $("#bt-p1").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page1").hide();
            $("#page2").show();
        }, 150);
    });

    $("#bt-pp2").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page2").hide();
            $("#page1").show();
        }, 150);
    });

    $("#bt-p2").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page2").hide();
            $("#page3").show();
        }, 150);
    });

    $("#bt-pp3").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page3").hide();
            $("#page2").show();
        }, 150);
    });

    $("#bt-p3").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page3").hide();
            $("#page4").show();
        }, 150);
    });

    $("#bt-pp4").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page4").hide();
            $("#page3").show();
        }, 150);
    });

    $("#bt-p4").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page4").hide();
            $("#page5").show();
        }, 150);
    });

    $("#bt-pp5").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page5").hide();
            $("#page4").show();
        }, 150);
    });

    $("#bt-p5").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page5").hide();
            $("#page6").show();
        }, 150);
    });

    $("#bt-pp6").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page6").hide();
            $("#page5").show();
        }, 150);
    });

    $("#bt-p6").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page6").hide();
            $("#page7").show();
        }, 150);
    });

    $("#bt-pp7").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            $("#page7").hide();
            $("#page6").show();
        }, 150);
    });

    $("#startButton_n").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.href="../game_num_search.html";
        }, 150);
    });

    $("#startButton_h").click(() => {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.href="../../home.html";
        }, 150);
    });

    $("input[name='langBtn']").click(function () {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        if ($("input[name='langBtn']:checked").val() == "jpn") {
            $(".jpn").css("display", "block");
            $(".eng").css("display", "none");
        } else if ($("input[name='langBtn']:checked").val() == "eng") {
            $(".jpn").css("display", "none");
            $(".eng").css("display", "block");
        }
    })
});