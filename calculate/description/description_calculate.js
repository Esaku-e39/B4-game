$(() => {
    $("#bt-p1").click(() => {
        $("#page1").hide();
        $("#page2").show();
    });

    $("#bt-p2").click(() => {
        $("#page2").hide();
        $("#page3").show();
    });

    $("#bt-p3").click(() => {
        $("#page3").hide();
        $("#page4").show();
    });

    $("#bt-p4").click(() => {
        $("#page4").hide();
        $("#page5").show();
    });

    $("#bt-p5").click(() => {
        $("#page5").hide();
        $("#page6").show();
    });

    $("#bt-p6").click(() => {
        $("#page6").hide();
        $("#page7").show();
    });

    $("#bt-p7").click(() => {
        $("#page7").hide();
        $("#page8").show();
    });

    $("input[name='langBtn']").click(function () {
        if ($("input[name='langBtn']:checked").val() == "jpn") {
            $(".jpn").css("display", "block");
            $(".eng").css("display", "none");
        } else if ($("input[name='langBtn']:checked").val() == "eng") {
            $(".jpn").css("display", "none");
            $(".eng").css("display", "block");
        }
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
    });

    $(".bt-back").on("click", () => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
    });

    $(".bt-next").on("click", () => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
    });

    $("#startButton_n").on("click", () => {
        $("#bt-sound").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound").get(0).play();
        setTimeout(() => {
            location.href = '../game_calculate.html';
        }, 150)
    });

    $("#startButton_h").on("click", () => {
        $("#bt-sound").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound").get(0).play();
        setTimeout(() => {
            setTimeout(() => { location.href = '../../index.html' }, 150);
        }, 150)
    });
});