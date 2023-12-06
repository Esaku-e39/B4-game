$(() => {
    // 言語切り替え
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
})