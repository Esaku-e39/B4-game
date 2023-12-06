$(function () {

    let timeLimit = 20; //制限時間(s)
    let timer = timeLimit;
    let correct = 0; //正答数を代入
    let miss = 0; //誤答数を代入
    let problem = []; //問題配列
    let currentProblem;
    let colorAnswer;
    let wordAnswer;
    let dummy;
    let flag;
    let object;
    let borderRank = [];

    //回答選択生成/////////////////////////////////////////////////////////////////////////
    function generateProb(difficulty) {
        if (difficulty == "easy") { //3種類
            for (let i = 0; i < 9; i++) {
                problem.push({ id: i, img: ("prob/" + i + ".JPG"), tag: ("img_ans_" + i) });
                $("#answer").html($("#answer").html() + "<input type='image' src=" + problem[i].img + " id=" + problem[i].tag + " class='img_ans' alt=''>");

            }
            for (let i = 0; i < problem.length; i++) {
                $("#" + problem[i].tag).on("click", () => {
                    checkAnswer(i, difficulty);
                });
            }
        } else if (difficulty == "normal") {
            for (let i = 0; i < 9; i++) {
                problem.push({ id: i, img: ("prob/" + i + ".JPG"), tag: ("img_ans_" + i) });
                $("#answer").html($("#answer").html() + "<input type='image' src=" + problem[i].img + " id=" + problem[i].tag + " class='img_ans' alt=''>");

            }
            for (let i = 0; i < problem.length; i++) {
                $("#" + problem[i].tag).on("click", () => {
                    checkAnswer(colorProblems(i), difficulty);
                });
            }
        } else if (difficulty == "hard") {
            for (let i = 0; i < 9; i++) {
                problem.push({ id: i, img: ("prob/" + i + ".JPG"), tag: ("img_ans_" + i) });
                $("#answer").html($("#answer").html() + "<input type='image' src=" + problem[i].img + " id=" + problem[i].tag + " class='img_ans' alt=''>");

            }
            for (let i = 0; i < problem.length; i++) {
                $("#" + problem[i].tag).on("click", () => {
                    checkAnswer(colorProblems(i), difficulty);
                });
            }
        }
    }

    //ダミー決定（hard)/////////////////////////////////////////////////////////////////
    function dummyProblems() {
        dummy = Math.random();
        if (dummy < 0.5) {
            object = "color"
        } else {
            object = "word"
        }
        return object;
    }

    //問題決定（normalとhard）/////////////////////////////////////////////////////////////////
    function colorProblems(number) {
        if (number == 0) {
            return 'red';
        } else if (number == 1) {
            return 'aqua';
        } else if (number == 2) {
            return 'blue';
        } else if (number == 3) {
            return 'green';
        } else if (number == 4) {
            return 'yellow';
        } else if (number == 5) {
            return 'pink';
        } else if (number == 6) {
            return 'purple';
        } else if (number == 7) {
            return 'silver';
        } else if (number == 8) {
            return 'black';
        }
    }

    //問題表示・更新/////////////////////////////////////////////////////////////////
    function displayProblems(difficulty) {
        currentProblem = Math.floor(Math.random() * problem.length);
        if (difficulty == "easy") {
            $("#problems").html("<img src=" + problem[currentProblem].img + " class='img_prob' alt='question'>");
        } else if (difficulty == "normal") {
            wordProblem = Math.floor(Math.random() * problem.length);
            colorAnswer = colorProblems(currentProblem);
            $("#problems").html("<font>color</font><br>");
            $("#problems_hard").html("<font color=" + colorAnswer + "> " + colorProblems(wordProblem) + "</font><br>");
        } else if (difficulty == "hard") {
            flag = dummyProblems();
            wordProblem = Math.floor(Math.random() * problem.length);
            colorAnswer = colorProblems(currentProblem);
            wordAnswer = colorProblems(wordProblem);
            if (flag == "word") {
                $("#problems").html("<a style='color:#eee;'>color</a> / word<br>");
                // $("#problems").html(flag);
            } else {
                $("#problems").html("color / <a style='color:#eee;'>word</a><br>");
                // $("#problems").html(flag);
            }

            $("#problems_hard").html("<font color=" + colorAnswer + ">" + colorProblems(wordProblem) + "</font><br>");
        }
    }

    //解答確認/////////////////////////////////////////////////////////////////////
    function checkAnswer(id, difficulty) {
        if (difficulty == "easy") {
            if (currentProblem == id) {  //正解時の処理
                correct++;
                $("#judge").html("<div class=correct <h3>OK!</a>");
                document.getElementById("correct").currentTime = 0;
                document.getElementById("correct").play();
                setTimeout(() => { $("#judge").html(""); }, 200);
                displayProblems(difficulty);
            } else {  //不正解時の処理
                miss++;
                $("#judge").html("<div class=incorrect>MISS!</a>");
                document.getElementById("miss").currentTime = 0;
                document.getElementById("miss").play();
                setTimeout(() => { $("#judge").html(""); }, 200);
            }
        } else if (difficulty == "normal") {
            if (colorAnswer == id) {  //正解時の処理
                correct++;
                $("#judge").html("<div class=correct>OK!</a>");
                document.getElementById("correct").currentTime = 0;
                document.getElementById("correct").play();
                setTimeout(() => { $("#judge").html(""); }, 200);
                displayProblems(difficulty);
            } else {  //不正解時の処理
                miss++;
                $("#judge").html("<div class=incorrect>MISS!</a>");
                document.getElementById("miss").currentTime = 0;
                document.getElementById("miss").play();
                setTimeout(() => { $("#judge").html(""); }, 200);
            }
        } else if (difficulty == "hard") {
            if (object == "color") {
                if (colorAnswer == id) {  //正解時の処理
                    correct++;
                    $("#judge").html("<div class=correct>OK!</a>");
                    document.getElementById("correct").currentTime = 0;
                    document.getElementById("correct").play();
                    setTimeout(() => { $("#judge").html(""); }, 200);
                    displayProblems(difficulty);
                } else {  //不正解時の処理
                    miss++;
                    $("#judge").html("<div class=incorrect>MISS!</a>");
                    document.getElementById("miss").currentTime = 0;
                    document.getElementById("miss").play();
                    setTimeout(() => { $("#judge").html(""); }, 200);
                }
            } else if (object == "word") {
                if (wordAnswer == id) {  //正解時の処理
                    correct++;
                    $("#judge").html("<div class=correct>OK!</a>");
                    document.getElementById("correct").currentTime = 0;
                    document.getElementById("correct").play();
                    setTimeout(() => { $("#judge").html(""); }, 200);
                    displayProblems(difficulty);
                } else {  //不正解時の処理
                    miss++;
                    $("#judge").html("<div class=incorrect>MISS!</a>");
                    document.getElementById("miss").currentTime = 0;
                    document.getElementById("miss").play();
                    setTimeout(() => { $("#judge").html(""); }, 200);
                }
            }
        }
    }

    //カウントダウン////////////////////////////////////////////////////////////////
    function startCountdown(difficulty) {
        $("#timer-container").hide();
        $("#problems").css("display", "block");
        $("#problems_hard").css("display", "block");
        let downCount = $("#problems");

        $("#title").hide();

        if (difficulty == "easy") {
            $("#dispDifficulty").html("<h3 class='jpn'>難易度：かんたん</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Easy</h3>");
        } else if (difficulty == "normal") {
            $("#dispDifficulty").html("<h3 class='jpn'>難易度：ふつう</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Normal</h3>");
        } else if (difficulty == "hard") {
            $("#dispDifficulty").html("<h3 class='jpn'>難易度：むずかしい</h3>");
            $("#dispDifficulty").html($("#dispDifficulty").html() + "<h3 class='eng'>Difficulty: Hard</h3>");
        }
        changeLang();
        $("#dispDifficulty").show();

        downCount.html("<h2>Let's start!</h2>");


        downCount.html("<h2>Let's start!</h2>");

        if (difficulty == "easy") {
            $("#info_game").html("<a style='color: red;'class='jpn'>マウスを準備してください<br>左の色と同じ右側の色を<br>クリックしてください");
            $("#info_game").html($("#info_game").html() + "<a style='color: red;' class='eng'>Hold your mouse<br>Click the right material <br> which is same as the left one.");
            changeLang();
        } else if (difficulty == "normal") {
            $("#info_game").html("<a style='color: red;'class='jpn'>マウスを準備してください<br>左の文字の色と同じ右側の色を<br>クリックしてください");
            $("#info_game").html($("#info_game").html() + "<a style='color: red;' class='eng'>Hold your mouse<br>Click the right material <br> which is same color as <br>the left word.");
            changeLang();
        } else if (difficulty == "hard") {
            $("#info_game").html("<a style='color: red;'class='jpn'>マウスを準備してください<br>左に色のついた文字が表示されます<br>その上に「word」か「color」<br>と書かれるので<br>指示に従って右側の色を<br>クリックしてください ");
            $("#info_game").html($("#info_game").html() + "<a style='color: red;' class='eng'>Hold your mouse!<br>Colored word appears <br>on the left.<br> Above it will say <br>「word」 or 「Color」<br>so click on it as instructed!");
            changeLang();
        }

        setTimeout(function () {
            $("#count-low").get(0).currentTime = 0; //この行は連打用
            $("#count-low").get(0).play();
            downCount.html("<h2>3</h2>");
            setTimeout(function () {
                $("#count-low").get(0).currentTime = 0; //この行は連打用
                $("#count-low").get(0).play();
                downCount.html("<h2>2</h2>");
                setTimeout(function () {
                    $("#count-low").get(0).currentTime = 0; //この行は連打用
                    $("#count-low").get(0).play();
                    downCount.html("<h2>1</h2>");
                    timerInterval = setInterval(updateTimer, 1000);
                    setTimeout(function () {
                        if (difficulty == "normal")
                            downCount.html("<h1></h1>");
                        $("#info_game").hide()
                        $("#result-sound").get(0).currentTime = 0; //この行は連打用
                        $("#result-sound").get(0).play();
                        startGame(difficulty);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 2000);
    }

    //タイマー////////////////////////////////////////////////////////////////
    function updateTimer() {
        $("#timer-container").html("<h3 class='jpn'>残り時間: " + timer + " 秒</h3>");
        $("#timer-container").html($("#timer-container").html() + "<h3 class='eng'>time left: " + timer + " sec</h3>");
        changeLang();
        timer--;
    }

    //ゲーム開始～ゲーム中処理////////////////////////////////////////////////////////////////
    function startGame(difficulty) {
        generateProb(difficulty);
        displayProblems(difficulty);
        if (difficulty == "easy") {
            setTimeout(() => { $("#timer-container").show(); }, timeLimit * 5);
            borderRank = [19, 17, 15, 12];
        } else if (difficulty == "normal") {
            borderRank = [17, 15, 13, 10];
            $("#timer-container").show();
        } else if (difficulty == "hard") {
            borderRank = [12, 10, 7,5];
            $("#timer-container").show();
        }

        $("#answer").show();

        $("#rejectButton").show();

        setTimeout(() => { finishGame(difficulty); }, timeLimit * 1000);
    }

    //ゲーム終了処理//////////////////////////////////////////////////////////////////////////
    function finishGame(difficulty) {
        $("#answer").hide();
        $("#timer-container").hide();
        $("#problems_hard").hide();
        $("#problems").html("<h2 class='jpn'>終了!</h2>");
        $("#problems").html($("#problems").html() + "<h2 class='eng'>Time Up!</h2>");
        changeLang();
        $("#fin-sound").get(0).currentTime = 0; //この行は連打用
        $("#fin-sound").get(0).play();
        $("#info_game").html("");

        setTimeout(() => {
            $(".game_l").hide();
            $(".game_r").hide();
            $(".left").show();
            $(".right").show();
            $(".head_l").show();
            $(".head_r").show();

            $("#result").show();
            $("#result-sound").get(0).currentTime = 0; //この行は連打用
            $("#result-sound").get(0).play();
            $("#text_result-c").html("<b class='jpn'>" + correct + " 問正解  " + " " + " " + correct + " Points</b>");
            $("#text_result-c").html($("#text_result-c").html() + "<b class='eng'>" + correct + " correct  " + " " + " " + correct + " Points</b>");
            changeLang();
            setTimeout(() => {
                $("#result-sound").get(0).currentTime = 0; //この行は連打用
                $("#result-sound").get(0).play();
                $("#result-p").show();
                if (difficulty == "easy" || difficulty == "normal") {
                    $("#text_result-p").html("<a style='font-size:20px'>" + miss + "miss  ×  -2  =  </a><b>-" + (miss * 2) + " Points</b>");
                } else {
                    $("#text_result-p").html("<a style='font-size:20px'>" + miss + "miss  ×  -1  =  </a><b>-" + (miss * 1) + " Points</b>");
                }
                setTimeout(() => {
                    $("#result-sound").get(0).currentTime = 0; //この行は連打用
                    $("#result-sound").get(0).play();
                    $("#result-r").show();
                    if (difficulty == "easy" || difficulty == "normal") {
                        $("#text_result-r").html("<b>" + (correct - (miss * 2)) + "Points</b>");
                        setTimeout(() => {
                            resultRank((correct - (miss * 2)));
                            $("#rank").show();
                            $("#result-sound2").get(0).currentTime = 0; //この行は連打用
                            $("#result-sound2").get(0).play();
                        }, 1000);
                    } else {
                        $("#text_result-r").html("<b>" + (correct - (miss * 1)) + "Points</b>");
                        setTimeout(() => {
                            resultRank(correct - (miss * 1));
                            $("#rank").show();
                            $("#result-sound2").get(0).currentTime = 0; //この行は連打用
                            $("#result-sound2").get(0).play();
                        }, 1000);
                    }
                }, 1000);
            }, 1000);
            $("#answer").css("display", "none");
            $("#rejectButton").hide();
            $("#finishButton").css("display", "inline-block");
        }, 1500);
    }


    //ランク計算///////////////////////////////////////////////////////////////////
    function resultRank(score) {
        if (score >= borderRank[0]) {
            $("#img_rank").html("<img alt='' src='../img/rank/s.JPG'>");
        } else if (score >= borderRank[1]) {
            $("#img_rank").html("<img alt='' src='../img/rank/a.JPG'>");
        } else if (score >= borderRank[2]) {
            $("#img_rank").html("<img alt='' src='../img/rank/b.JPG'>");
        } else if (score >= borderRank[3]) {
            $("#img_rank").html("<img alt='' src='../img/rank/c.JPG'>");
        } else {
            $("#img_rank").html("<img alt='' src='../img/rank/d.JPG'>");
        }
    }

    //英語対応//////////////////////////////////////////////////////////////////////////

    $("input[name='langBtn']").click(function () {
        if ($("input[name='langBtn']:checked").val() == "jpn") {
            $(".jpn").css("display", "block");
            $(".eng").css("display", "none");
        } else if ($("input[name='langBtn']:checked").val() == "eng") {
            $(".jpn").css("display", "none");
            $(".eng").css("display", "block");
        }
    })



    //翻訳関数///////////////////////////////////////////////////////////////////////////
    function changeLang() {
        if ($("input[name='langBtn']:checked").val() == "jpn") {
            $(".jpn").css("display", "block");
            $(".eng").css("display", "none");
        } else if ($("input[name='langBtn']:checked").val() == "eng") {
            $(".jpn").css("display", "none");
            $(".eng").css("display", "block");
        }
    }



    ///////////////////////////////////////////////////////////////////////////////
    $("#startButton_e").on("click", () => {
        $("#bt-sound").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound").get(0).play();
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
        $("#bt-sound").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound").get(0).play();
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
        $("#bt-sound").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound").get(0).play();
        $(".initial_display").hide();
        $(".left").hide();
        $(".right").hide();
        $(".head_l").hide();
        $(".head_r").hide();

        $(".game_l").show();
        $(".game_r").show();
        startCountdown("hard");
    });

    $("#backButton").on("click", () => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        setTimeout(() => {
            location.href = "../home.html"; // ゲーム選択画面に戻る
        }, 150);
    })

    $(".bt-describe").on("click", () => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        setTimeout(() => {
            location.href = 'description/description_react_speed.html';
        }, 150);
    });

    $("#rejectButton").on("click", function () {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        setTimeout(() => {
            location.reload(); // ページをリロードして最初の画面に戻る
        }, 150);
    });

    $("#finishButton").on("click", function () {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        setTimeout(() => {
            location.href = "../home.html"; // ゲーム選択画面に戻る
        }, 150);
    });

    $("input[name='langBtn']").click(() => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        changeLang();
    });
});