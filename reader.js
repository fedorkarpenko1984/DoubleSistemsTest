function start (t,i1,i2) {
    const txt = document.getElementById(t).value.toUpperCase() + '.';
    const inp1 = document.getElementById(i1).value.toUpperCase();
    const inp2 = document.getElementById(i2).value.toUpperCase();




    console.log(minSpaceBetweenTwoWords(txt, inp1, inp2));

}

function minSpaceBetweenTwoWords (text, word1, word2) {
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',  'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Щ','Ш','Ь','Ы','Ъ','Э','Ю','Я']
    const LL = letters.length;

    let message = '';
    let numMsg = '';

    let ind1 = 0;
    let ind2 = 0;
    let currentWord = '';

    let previousIsLetter = false;
    let itIsLetter = false;
    let wordIsStarted = false;
    let wordIsFinished = false;
    let countStarted = false;

    let countStartedFromWord1 = false;
    let countStartedFromWord2 = false;

    let lettersCounter = 0;
    let spaceBetween = 0;

    while (ind1 < text.length) {
        ind2 = 0;
        itIsLetter = false;


        if (text[ind1] == '-') {  //проверка дефис-тире. флаг previousIsLetter показывает состояние
            if (previousIsLetter) {  //с прошлой итерации и если '-' после буквы, то это дефис
                currentWord = currentWord + text[ind1];//добавляем дефис к текущему слову
                itIsLetter = true;//дефис - часть слова. отрабатывается как буква
            }
        }

        while (ind2 < LL) {  //проверка буква ли это
            if (text[ind1] == letters[ind2]) {
                itIsLetter = true;//это буква
                wordIsStarted = true;//текущее слово в состоянии 'начато'
                currentWord = currentWord + text[ind1];//
                previousIsLetter = true;
                break;
            }
            ++ind2;
        }

        if (!itIsLetter) {  //если это не буква
            if (wordIsStarted) {//и ранее было начато слово
                wordIsStarted = false;//новое слово еще на начато
                previousIsLetter = false;//на следующей итерации будет показано, что сейчас была не буква
                switch (currentWord) {//проверка на соответствия очередного полученного слова
                    case word1:
                        if (countStartedFromWord2) {
                            if (spaceBetween == 0) {
                                spaceBetween = lettersCounter;
                            } else if (spaceBetween > lettersCounter) {
                                spaceBetween = lettersCounter;
                            }
                        }
                        if (countStartedFromWord1 || countStartedFromWord2) {
                            lettersCounter = 1;
                        }
                        countStartedFromWord1 = true;
                        countStartedFromWord2 = false;
                        break;
                    case word2:
                        if (countStartedFromWord1) {
                            if (spaceBetween == 0) {
                                spaceBetween = lettersCounter;
                            } else if (spaceBetween > lettersCounter) {
                                spaceBetween = lettersCounter;
                            }
                        }
                        if (countStartedFromWord1 || countStartedFromWord2) {
                            lettersCounter = 1;
                        }
                        countStartedFromWord2 = true;
                        countStartedFromWord1 = false;
                        break;
                    default:
                        lettersCounter = lettersCounter + currentWord.length +1;
                }


                currentWord = '';//обнуляем текущее слово
            } else {
                ++lettersCounter;
            }

        }

        ++ind1;
    }
    if (!countStartedFromWord1) {
        message = 'Первого искомого слова в тексте не обнаружено';
    }
    if (!countStartedFromWord2) {
        message = message + 'Второго искомого слова в тексте не обнаружено';
    }
    if (spaceBetween != 0) {
        numMsg = String(spaceBetween);
        message = 'Минимальное расстояние между словами ' + numMsg + ' символ(а/ов)';
    }
    alert(message);

}


