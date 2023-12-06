$(function () {

    let num_prob = 20; //問題数
    let problems = []; //{problem(テキスト), answer(数値)}の組の配列
    let currentProblem = 0;
    let startTime;
    let miss = 0;
    let borderRank = [];

    //問題生成_イージー//////////////////////////////////////////////////////////////////////////
    //加算のみ、「1以上10未満 + 1以上10未満」
    function generateProb_e() {
        //let usedNumbers = []; // 使用済みの問題番号を格納する配列
        for (let i = 0; i < num_prob; i++) {
            let number1 = Math.floor(Math.random() * 9) + 1; // 1以上10未満のランダムな整数を生成
            let number2 = Math.floor(Math.random() * 9) + 1; // 1以上10未満のランダムな整数を生成
            let problem = number1 + " + " + number2 + " = ";
            let answer = number1 + number2;
            problems.push({ problem: problem, answer: answer });
            if (i > 0 && problems[i].answer == problems[i - 1].answer) {
                problems.pop();
                i--;
                continue;
            }
        }
    }

    //問題生成_ノーマル
    //「1以上20未満 + 10以上20未満」または「1桁 × 1桁」
    function generateProb_n() {
        //let usedNumbers = []; // 使用済みの問題番号を格納する配列
        for (let i = 0; i < num_prob; i++) {
            let a = Math.random() * 10;
            let number1 = 0;
            let number2 = 0;
            let problem;
            let answer;
            if (a < 3) {
                number1 = Math.floor(Math.random() * 9) + 11; // 11以上20未満のランダムな整数を生成
                number2 = Math.floor(Math.random() * 9) + 11; // 11以上20未満のランダムな整数を生成
                problem = number1 + " + " + number2 + " = ";
                answer = number1 + number2;
            } else if (a < 6) {
                number1 = Math.floor(Math.random() * 8) + 2; // 2以上10未満のランダムな整数を生成
                number2 = Math.floor(Math.random() * 8) + 2; // 2以上10未満のランダムな整数を生成
                problem = number1 + " × " + number2 + " = ";
                answer = number1 * number2;
            } else {
                while (number1 < number2 + 2) {
                    number1 = Math.floor(Math.random() * 19) + 1; // 1以上20未満のランダムな整数を生成
                    number2 = Math.floor(Math.random() * 9) + 1; // 1以上20未満のランダムな整数を生成
                }
                problem = number1 + " - " + number2 + " = ";
                answer = number1 - number2;
            }
            problems.push({ problem: problem, answer: answer });
            if (i > 0 && problems[i].answer == problems[i - 1].answer) {
                problems.pop();
                i--;
                continue;
            }
        }
    }
    //問題生成_ハード
    //ノーマルに引き算を加える(答えは必ず2以上とする)
    function generateProb_h() {
        //let usedNumbers = []; // 使用済みの問題番号を格納する配列
        for (let i = 0; i < num_prob; i++) {
            let number1 = 0;
            let number2 = 0;
            let problem;
            let answer;
            let a = Math.random() * 9;
            if (a < 3) {
                number1 = Math.floor(Math.random() * 989) + 11; // 11以上1000未満のランダムな整数を生成
                number2 = Math.floor(Math.random() * 989) + 11; // 11以上1000未満のランダムな整数を生成
                problem = number1 + " + " + number2 + " = ";
                answer = number1 + number2;
            } else if (a < 6) {
                number1 = Math.floor(Math.random() * 90) + 10; // 10以上100未満のランダムな整数を生成
                number2 = Math.floor(Math.random() * 7) + 3; // 2以上10未満のランダムな整数を生成
                problem = number1 + " × " + number2 + " = ";
                answer = number1 * number2;
            } else {
                while (number1 < number2 + 2) {
                    number1 = Math.floor(Math.random() * 989) + 11; // 11以上1000未満のランダムな整数を生成
                    number2 = Math.floor(Math.random() * 989) + 11; // 11以上1000未満のランダムな整数を生成
                }
                problem = number1 + " - " + number2 + " = ";
                answer = number1 - number2;
            }
            problems.push({ problem: problem, answer: answer });
            if (i > 0 && problems[i].answer == problems[i - 1].answer) {
                problems.pop();
                i--;
                continue;
            }
        }
    }

    //問題表示//////////////////////////////////////////////////////////////////////////////
    function displayProblems() {
        let problemsElement = $("#problems");
        problemsElement.empty(); // 問題表示をクリア

        for (let i = 0; i < problems.length; i++) {

            //if(i > problems.length - 1){break;}

            let problemElement = $("<div>");
            problemElement.text(problems[i].problem);

            if (i === currentProblem) {
                problemElement.addClass("current-problem");
            }

            if (i < currentProblem) {
                problemElement.text(problemElement.text() + problems[i].answer);
            }
            problemsElement.append(problemElement);
        }

        $(".game_l").animate({ scrollTop: 120 * (currentProblem - 1) }, 100); //問題位置にスクロール移動

        problemsElement.css("display", "block");
    }

    //解答照合//////////////////////////////////////////////////////////////////////////
    function checkAnswer(event) {
        if (event.key === "Enter") {
            let answerInput = $("#answer");
            let userAnswer = parseInt(answerInput.val());

            if (userAnswer === problems[currentProblem].answer) { //正解時

                if (currentProblem === problems.length - 1) { //最終問題正解
                    let endTime = new Date().getTime();
                    let timeDiff = Math.floor((endTime - startTime) / 100) / 10; // 経過時間を秒に変換
                    currentProblem++;
                    displayProblems();

                    $("#fin-sound").get(0).currentTime = 0; //この行は連打用
                    $("#fin-sound").get(0).play();

                    $("#answer").hide();
                    $("#info_game").html("<a style='font-size:25px;'>Finished!</a>");
                    setTimeout(() => {
                        $(".left").show();
                        $(".right").show();
                        $(".head_l").show();
                        $(".head_r").show();
                        $(".game_l").hide();
                        $(".game_r").hide();

                        $("#result").show();
                        $("#text_result-t").html("<b>" + timeDiff + " sec.</b>");
                        $("#result-sound").get(0).currentTime = 0; //この行は連打用
                        $("#result-sound").get(0).play();
                        setTimeout(() => {
                            $("#result-p").show();
                            $("#text_result-p").html("<a style='font-size:20px'>" + miss + " miss  ×  2 sec.  =  </a><b>" + (miss * 2) + " sec.</b>");
                            $("#result-sound").get(0).currentTime = 0; //この行は連打用
                            $("#result-sound").get(0).play();
                            setTimeout(() => {
                                $("#result-r").show();
                                $("#text_result-r").html("<b>" + (timeDiff + (miss * 2)) + " sec.</b>");
                                $("#result-sound").get(0).currentTime = 0; //この行は連打用
                                $("#result-sound").get(0).play();
                                setTimeout(() => {
                                    resultRank(timeDiff + (miss * 2));
                                    $("#rank").show();
                                    $("#result-sound2").get(0).currentTime = 0; //この行は連打用
                                    $("#result-sound2").get(0).play();
                                }, 1000);
                            }, 1000);
                        }, 1000);

                        $("#answer").css("display", "none");
                        $("#rejectButton").hide();
                        $("#finishButton").css("display", "inline-block");
                    }, 3000);
                } else { //最終以外の問題正解
                    currentProblem++;
                    $("#info_game").html("<a class='correct'>OK!</a>");
                    setTimeout(() => { $("#info_game").html(""); }, 300);
                    displayProblems();
                    $("#correct").get(0).currentTime = 0; //この行は連打用
                    $("#correct").get(0).play();
                }
            } else { //不正解時
                $("#info_game").html("<a class='incorrect'>MISS!</a>");
                setTimeout(() => { $("#info_game").html(""); }, 300);
                miss++;
                $("#miss").get(0).currentTime = 0; //この行は連打用
                $("#miss").get(0).play();
            }

            answerInput.val("");


        }
    }

    //ゲーム開始～ゲーム中処理////////////////////////////////////////////////////////////////
    function startGame(difficulty) {
        problems = [];
        currentProblem = 0;
        startTime = new Date().getTime();

        if (difficulty == "easy") {
            generateProb_e();
            borderRank = [20, 25, 30, 40];
        } else if (difficulty == "normal") {
            generateProb_n();
            borderRank = [30, 35, 40, 50];
        } else if (difficulty == "hard") {
            generateProb_h();
            borderRank = [90, 120, 150, 180];
        }
        displayProblems();

        let answerInput = $("#answer");
        answerInput.val("");
        answerInput.css("display", "inline-block");
        answerInput.focus();


        $("#rejectButton").show();

        // let resultElement = $("#result");
        // resultElement.text("");


        answerInput.on("keyup", checkAnswer); // エンターキーを押したときに次の問題に進む
    }

    //カウントダウン////////////////////////////////////////////////////////////////
    function startCountdown(difficulty) {
        $("#problems").css("display", "block");
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

        $("#info_game").html("<a class='jpn'>解答はキーボードで入力してください。<br>Enterキーで確定します。</a>");
        $("#info_game").html($("#info_game").html()
            + "<a class='eng'>Use your keyboad to input.<br>Press Enter to confirm your answer.</a>");
        changeLang();
        setTimeout(function () {
            downCount.html("<h2>3</h2>");
            $("#count-low").get(0).currentTime = 0; //この行は連打用
            $("#count-low").get(0).play();
            setTimeout(function () {
                downCount.html("<h2>2</h2>");
                $("#count-low").get(0).currentTime = 0; //この行は連打用
                $("#count-low").get(0).play();
                setTimeout(function () {
                    downCount.html("<h2>1</h2>");
                    $("#count-low").get(0).currentTime = 0; //この行は連打用
                    $("#count-low").get(0).play();
                    setTimeout(function () {
                        $("#info_game").html("");
                        $("#result-sound").get(0).currentTime = 0; //この行は連打用
                        $("#result-sound").get(0).play();
                        startGame(difficulty);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 2000);
    }

    //ランク計算///////////////////////////////////////////////////////////////////
    function resultRank(timeDiff) {
        if (timeDiff <= borderRank[0]) {
            $("#img_rank").html("<img alt='' src='../img/rank/s.JPG'>");
        } else if (timeDiff <= borderRank[1]) {
            $("#img_rank").html("<img alt='' src='../img/rank/a.JPG'>");
        } else if (timeDiff <= borderRank[2]) {
            $("#img_rank").html("<img alt='' src='../img/rank/b.JPG'>");
        } else if (timeDiff <= borderRank[3]) {
            $("#img_rank").html("<img alt='' src='../img/rank/c.JPG'>");
        } else {
            $("#img_rank").html("<img alt='' src='../img/rank/d.JPG'>");
        }
    }

    //言語切り替え///////////////////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////////////////////////////
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
            location.href = "../index.html"; // ゲーム選択画面に戻る
        }, 150);
    })

    $(".bt-describe").on("click", () => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        setTimeout(() => {
            location.href = 'description/description_calculate.html';
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
            location.href = "../index.html"; // ゲーム選択画面に戻る
        }, 150);
    });

    $("input[name='langBtn']").click(() => {
        $("#bt-sound2").get(0).currentTime = 0; //この行は連打用
        $("#bt-sound2").get(0).play();
        changeLang();
    });


});