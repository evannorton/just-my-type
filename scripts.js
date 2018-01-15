//vars
let $playButton = $("#play-button");
let $content = $("#target");
let $highlight = $("#yellow-block");
let $highlightPosition = 0;
let $keyUpper = $("#keyboard-upper-container");
let $keyLower = $("#keyboard-lower-container");
let $sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let $sentenceNumber = 0;
let $sentence = $sentences[$sentenceNumber];
let $charNumber = 0;
let $letter = $sentence.substring($charNumber, $charNumber + 1);
let $mistakes = 0;

//load page with button
$($playButton).click(function () {
    $($content).css("display", "block");
    $($playButton).css("display", "none");

    //toggle keyboards
    $(document).keydown(function (e1) {
        if (e1.which === 16) {
            $($keyUpper).css("display", "block");
            $($keyLower).css("display", "none");
            $(document).keyup(function (e2) {
                if (e2.which === 16) {
                    $($keyUpper).css("display", "none");
                    $($keyLower).css("display", "block");
                }
            });
        }
    });

    //highlight keys
    $(document).keypress(function (e) {
        let $key = $("#" + e.which);
        $($key).css("background-color", "yellow");
        $(document).keyup(function (e) {
            $($key).css("background-color", "#f5f5f5");
        });
    });

    //typing test
    let $startDate = new Date();
    let $startTime = $startDate.getTime();
    $("#sentence").text($sentence);
    $("#target-letter").text($letter);
    $(document).keypress(function (e) {
        if (e.which == $sentences[$sentenceNumber].charCodeAt($charNumber)) {
            let $right = $("<span>✔</span>");
            $($right).addClass('green');
            $($right).appendTo("#feedback");
            $highlightPosition += 21;
            $($highlight).css("margin-left", $highlightPosition + "px");
            $charNumber++;
            $letter = $sentence.substring($charNumber, $charNumber + 1);
            $("#target-letter").text($letter);
            if ($charNumber === $sentence.length) {
                $sentenceNumber++;
                if ($sentenceNumber === $sentences.length) {
                    let $endDate = new Date();
                    let $endTime = $endDate.getTime();
                    let $minutes = ($endTime - $startTime) / 60000;
                    $wpm = Math.round(54 / $minutes - 2 * $mistakes);
                    var r = confirm("You type " + $wpm + " words per minute. Would you like to try again?");
                    if (r == true) {
                        location.reload();
                    } else {
                        console.log("done.");
                    }
                } else {
                    $sentence = $sentences[$sentenceNumber];
                    $("#sentence").text($sentence);
                    $charNumber = 0;
                    $letter = $sentence.substring($charNumber, $charNumber + 1);
                    $("#target-letter").text($letter);
                    $highlightPosition = 0;
                    $($highlight).css("margin-left", $highlightPosition + "px");
                    $("#feedback").text("");
                }
            }
        } else {
            let $wrong = $("<span>✗</span>");
            $($wrong).addClass('red');
            $($wrong).appendTo("#feedback");
            $mistakes++;
        }
    });
});