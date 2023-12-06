$(function () {
    let borderRank = [];

    //カウントダウン////////////////////////////////////////////////////////////////
    function startCountdown(difficulty) {
        $("#problems").css("display", "block");
        let downCount = $("#problems");

        $("#title").hide();

        if (difficulty == "easy") {
            $("#dispDifficulty").html("<h3 class='jpn'>難易度：かんたん</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Easy</h3>");
        } else if (difficulty == "normal") {
            $("#dispDifficulty").html("<h3>難易度：ふつう</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Normal</h3>");
        } else if (difficulty == "hard") {
            $("#dispDifficulty").html("<h3>難易度：むずかしい</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Hard</h3>");
        }
        changeLang();
        $("#dispDifficulty").show();

        $("#info_game").html("<h6 class='jpn'>数字を順番にクリックしてください。<br>正しくクリックされた数字は色が変わります。</h6>");
        $("#info_game").html($("#info_game").html()
            + "<h6 class='eng'>Click on the numbers in order.<br>Numbers clicked correctly change color.</h6>");
        changeLang();
        setTimeout(function () {
            document.getElementById("countdown-3times").currentTime = 0;//この行は連打でも反応する用です
            document.getElementById("countdown-3times").play();
            downCount.html("<h2>3</h2>");
            setTimeout(function () {
                document.getElementById("countdown-3times").currentTime = 0;//この行は連打でも反応する用です
                document.getElementById("countdown-3times").play();
                downCount.html("<h2>2</h2>");
                setTimeout(function () {
                    document.getElementById("countdown-3times").currentTime = 0;//この行は連打でも反応する用です
                    document.getElementById("countdown-3times").play();
                    downCount.html("<h2>1</h2>");
                    setTimeout(function () {
                        $("#info_game").html("")
                        startGame(difficulty);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 2000);
    }

    function changeLang(){
        if ($("input[name='langBtn']:checked").val() == "jpn") {
            $(".jpn").css("display", "block");
            $(".eng").css("display", "none");
        } else if ($("input[name='langBtn']:checked").val() == "eng") {
            $(".jpn").css("display", "none");
            $(".eng").css("display", "block");
        }
    }

    //ランク計算///////////////////////////////////////////////////////////////////
    function resultRank(elapsedTime) {
        if (elapsedTime <= borderRank[0]) {
            $("#img_rank").html("<img alt='' src='../img/rank/s.JPG'>");
        }else if (elapsedTime <= borderRank[1]) {
            $("#img_rank").html("<img alt='' src='../img/rank/a.JPG'>");
        }else if (elapsedTime <= borderRank[2]) {
            $("#img_rank").html("<img alt='' src='../img/rank/b.JPG'>");
        }else if (elapsedTime <= borderRank[3]) {
            $("#img_rank").html("<img alt='' src='../img/rank/c.JPG'>");
        }else{
            $("#img_rank").html("<img alt='' src='../img/rank/d.JPG'>");
        }
    }

    //ゲーム開始～ゲーム中処理////////////////////////////////////////////////////////////////
    function startGame(difficulty) {
        var buttonClickCount = 0;
        var targetButtonNumber = 1;
        var gameStarted = false;
        var startTime;
        var timerInterval;
        var maxnumber;

        $("#problems").hide()
        $("#order").show();
        if (gameStarted) {
            return;
        }

        $("#number-buttons-container").empty();
        $("#timer-container").empty();

        if (difficulty == "easy") {
            maxnumber = 10;
            borderRank = [8, 10, 12, 14];
        } else if (difficulty == "normal") {
            maxnumber = 20;
            borderRank = [18, 21, 24, 27];
        } else if (difficulty == "hard") {
            maxnumber = 30;
            borderRank = [28, 32, 36, 40];
        }
        var numbers = [];
        for (var i = 1; i <= maxnumber; i++) {
            numbers.push(i);
        }

        shuffleArray(numbers);

        for (var j = 0; j < numbers.length; j++) {
            var numberButton = $("<button>", {
                class: "number-button",
                text: numbers[j]
            });
            $("#number-buttons-container").append(numberButton);
        }

        buttonClickCount = 0;
        targetButtonNumber = 1;
        gameStarted = true;

        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
        //数字のボタンを押したときの処理//
        $(document).on("click", ".number-button", function () {
            if (!gameStarted) {
                return;
            }

            var clickedButtonNumber = parseInt($(this).text());

            if (clickedButtonNumber === targetButtonNumber) {
                $(this).addClass("clicked");
                document.getElementById("dission-button-2").currentTime = 0;//この行は連打でも反応する用です
                document.getElementById("dission-button-2").play();
                buttonClickCount++;
                targetButtonNumber++;

                if (buttonClickCount === maxnumber) {//全ての数字をクリックし終えた時//
                    clearInterval(timerInterval);
                    var endTime = Date.now();
                    var elapsedTime = (endTime - startTime) / 1000;
                    var differencetime = 0.0;
                    document.getElementById("finish").currentTime = 0;//この行は連打でも反応する用です
                    document.getElementById("finish").play();                                 
                    $("#info_game").html("Finished!");
                    $("#rejectButton").hide();
                    $("#timer-container").text("Time: " + elapsedTime.toFixed(2) + "sec");
                    setTimeout(() => {
                        $("#order").hide();
                        $("#button-container").hide();
                        $("#info_game").hide();
                        document.getElementById("result-1").currentTime = 0;//この行は連打でも反応する用です
                        document.getElementById("result-1").play();
                        $("#item_time").show();
                        $("#cleartime").html(elapsedTime.toFixed(2) + "sec");
                        setTimeout(() => {
                            document.getElementById("result-1").currentTime = 0;//この行は連打でも反応する用です
                            document.getElementById("result-1").play();
                            $("#item_difficulty").show();
                            if (difficulty == "easy") {
                                $("#difficultyname").html("<span class='jpn'>かんたん</span>");
                                $("#difficultyname").html($("#difficultyname").html() + "<span class='eng'>Easy</span>");
                            } else if (difficulty == "normal") {
                                $("#difficultyname").html("<span class='jpn'>ふつう</span>");
                                $("#difficultyname").html($("#difficultyname").html() + "<span class='eng'>Normal</span>");
                            } else if (difficulty == "hard") {
                                $("#difficultyname").html("<span class='jpn'>むずかしい</span>");
                                $("#difficultyname").html($("#difficultyname").html() + "<span class='eng'>Hard</span>");
                            }
                            setTimeout(() => {
                                document.getElementById("result-1").currentTime = 0;//この行は連打でも反応する用です
                                document.getElementById("result-1").play();
                                $("#item_comparetime").show();
                                if (difficulty == "easy") {
                                    differencetime = elapsedTime.toFixed(2) - 8.0;
                                    $("#comparetime").html(elapsedTime.toFixed(2) + "sec - 8.0sec" + "=" + differencetime.toFixed(2) + "sec");
                                } else if (difficulty == "normal") {
                                    differencetime = elapsedTime.toFixed(2) - 18.0;
                                    $("#comparetime").html(elapsedTime.toFixed(2) + "sec - 18.0sec" + "=" + differencetime.toFixed(2) + "sec");
                                } else if (difficulty == "hard") {
                                    differencetime = elapsedTime.toFixed(2) - 28.0;
                                    $("#comparetime").html(elapsedTime.toFixed(2) + "sec - 28.0sec" + "=" + differencetime.toFixed(2) + "sec");
                                }
                                if (differencetime <= 0) {
                                    $("#evaluation").html("Great!");
                                } else {
                                    $("#evaluation").html("One more try!");
                                }
                                setTimeout(() => {
                                    document.getElementById("result-2").currentTime = 0;//この行は連打でも反応する用です
                                    document.getElementById("result-2").play();
                                    $("#finishButton").show();
                                    resultRank(elapsedTime);
                                    $("#rank").show();
                                }, 1000);
                                
                            }, 1000);
                        }, 1000);
                    }, 3000);

                    gameStarted = false;
                }
            }
        });

        function updateTimer() {
            var currentTime = Date.now();
            var elapsedTime = (currentTime - startTime) / 1000;
            $("#timer-container").text("Time: " + elapsedTime.toFixed(2) + "sec");
        }

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        $("#rejectButton").show();

        let resultElement = $("#result");
        resultElement.text("");
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    $("#startButton_e").on("click", () => {
        document.getElementById("dission-button-2").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-2").play();
        $(".initial_display").hide();
        $(".left").hide();
        $(".right").hide();
        $(".head_l").hide();
        $(".head_r").hide();

        $(".game_l").show();
        $(".game_r").show();
        startCountdown("easy");
    });

    $("#startButton_n").on("click", () => {
        document.getElementById("dission-button-2").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-2").play();
        $(".initial_display").hide();
        $(".left").hide();
        $(".right").hide();
        $(".head_l").hide();
        $(".head_r").hide();

        $(".game_l").show();
        $(".game_r").show();
        startCountdown("normal");
    });

    $("#startButton_h").on("click", () => {
        document.getElementById("dission-button-2").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-2").play();
        $(".initial_display").hide();
        $(".left").hide();
        $(".right").hide();
        $(".head_l").hide();
        $(".head_r").hide();

        $(".game_l").show();
        $(".game_r").show();
        startCountdown("hard");
    });

    $("#backButton").on("click", function () {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.href = "../home.html"; // ゲーム選択画面に戻る
        }, 150);
    })

    $(".bt-describe").on("click", function () {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.href = 'description/description_num_search.html';
        }, 150);
    });

    $("#rejectButton").on("click", function () {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.reload(); // ページをリロードして最初の画面に戻る
        }, 150);
    });

    $("#finishButton").on("click", function () {
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        setTimeout(() => {
            location.href = "../home.html"; // ゲーム選択画面に戻る
        }, 150);
    });

    $("input[name='langBtn']").click(()=>{
        document.getElementById("dission-button-48").currentTime = 0;//この行は連打でも反応する用です
        document.getElementById("dission-button-48").play();
        changeLang();
    });

});