/**
 * 소수와 합성수 설명 및 연습 문제 모듈
 * 한국어와 영어로 된 설명과 다양한 난이도의 연습 문제를 제공합니다.
 */

// 소수와 합성수에 대한 설명 데이터
const explanations = {
    ko: {
        basic: {
            title: "소수와 합성수란?",
            content: `
                <h3>소수(Prime Number)란?</h3>
                <p>소수는 1과 자기 자신으로만 나누어지는 1보다 큰 자연수입니다. 다른 말로 하면, 약수가 정확히 2개인 수입니다.</p>
                <p>예: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...</p>
                
                <h3>합성수(Composite Number)란?</h3>
                <p>합성수는 1과 자기 자신 외에 다른 약수를 가지는 1보다 큰 자연수입니다. 다른 말로 하면, 약수가 3개 이상인 수입니다.</p>
                <p>예: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, ...</p>
                
                <h3>1은 소수일까요, 합성수일까요?</h3>
                <p>1은 소수도 합성수도 아닙니다! 1은 약수가 1개(자기 자신)뿐이므로 소수의 정의(약수가 2개)에 맞지 않습니다.</p>
            `
        },
        visual: {
            title: "소수와 합성수 시각화하기",
            content: `
                <h3>직사각형으로 표현하기</h3>
                <p>숫자를 직사각형 형태로 배열해보면 소수와 합성수를 쉽게 구분할 수 있어요.</p>
                <ul>
                    <li>소수는 1×n 형태의 직사각형으로만 배열할 수 있습니다.</li>
                    <li>합성수는 여러 가지 직사각형 형태로 배열할 수 있습니다.</li>
                </ul>
                <p>예를 들어, 6개의 동그라미는 1×6, 2×3, 3×2, 6×1 형태로 배열할 수 있으므로 6은 합성수입니다.</p>
                <p>하지만 7개의 동그라미는 1×7, 7×1 형태로만 배열할 수 있으므로 7은 소수입니다.</p>
                
                <h3>에라토스테네스의 체</h3>
                <p>에라토스테네스의 체는 고대 그리스의 수학자 에라토스테네스가 발명한 소수를 찾는 방법입니다.</p>
                <ol>
                    <li>1은 제외합니다.</li>
                    <li>남은 수 중 가장 작은 수(2)는 소수입니다. 2의 모든 배수를 지웁니다.</li>
                    <li>남은 수 중 가장 작은 수(3)는 소수입니다. 3의 모든 배수를 지웁니다.</li>
                    <li>이 과정을 반복합니다.</li>
                    <li>남은 모든 수는 소수입니다!</li>
                </ol>
            `
        },
        stories: {
            title: "소수와 합성수 이야기",
            content: `
                <h3>소수 슈퍼히어로</h3>
                <p>소수 마을에는 특별한 슈퍼히어로들이 살고 있어요. 이 히어로들은 아주 독특한 능력을 가지고 있습니다. 바로 '나눌 수 없는 힘'이에요!</p>
                <p>2, 3, 5, 7, 11, 13... 이 히어로들은 오직 자신과 1로만 나눌 수 있어서, 어떤 적이 공격해도 쉽게 무너지지 않아요.</p>
                <p>반면, 합성수 마을의 주민들은 여러 팀으로 나눌 수 있어요. 예를 들어, 6번 주민은 2명과 3명으로 나눌 수 있고, 12번 주민은 2명, 3명, 4명, 6명으로 나눌 수 있죠.</p>
                
                <h3>소수의 비밀</h3>
                <p>소수는 수학에서 아주 중요한 역할을 해요. 현대 암호 시스템은 큰 소수의 곱으로 만들어진 수를 다시 소인수분해하기 어렵다는 사실을 이용합니다.</p>
                <p>여러분이 인터넷에서 안전하게 정보를 주고받을 수 있는 것도 소수 덕분이에요!</p>
            `
        },
        fun_facts: {
            title: "소수에 관한 재미있는 사실",
            content: `
                <h3>알고 계셨나요?</h3>
                <ul>
                    <li>2는 유일한 짝수 소수입니다.</li>
                    <li>2와 5를 제외한 모든 소수는 1, 3, 7, 9로 끝납니다.</li>
                    <li>쌍둥이 소수란 차이가 2인 소수 쌍을 말합니다. 예: (3, 5), (5, 7), (11, 13), (17, 19)</li>
                    <li>소수는 무한히 많습니다!</li>
                    <li>현재까지 발견된 가장 큰 소수는 약 2500만 자리의 숫자입니다.</li>
                    <li>골드바흐의 추측: 4보다 큰 모든 짝수는 두 소수의 합으로 표현할 수 있다는 아직 증명되지 않은 수학적 추측입니다.</li>
                </ul>
            `
        }
    },
    en: {
        basic: {
            title: "What are Prime and Composite Numbers?",
            content: `
                <h3>What is a Prime Number?</h3>
                <p>A prime number is a natural number greater than 1 that is only divisible by 1 and itself. In other words, it has exactly two factors.</p>
                <p>Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...</p>
                
                <h3>What is a Composite Number?</h3>
                <p>A composite number is a natural number greater than 1 that has factors other than 1 and itself. In other words, it has three or more factors.</p>
                <p>Examples: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, ...</p>
                
                <h3>Is 1 a Prime or Composite Number?</h3>
                <p>1 is neither prime nor composite! It has only one factor (itself), so it doesn't fit the definition of a prime number (which must have exactly two factors).</p>
            `
        },
        visual: {
            title: "Visualizing Prime and Composite Numbers",
            content: `
                <h3>Rectangle Representation</h3>
                <p>Arranging numbers in rectangular patterns can help distinguish between prime and composite numbers.</p>
                <ul>
                    <li>Prime numbers can only be arranged in a 1×n rectangle.</li>
                    <li>Composite numbers can be arranged in multiple rectangular patterns.</li>
                </ul>
                <p>For example, 6 dots can be arranged as 1×6, 2×3, 3×2, or 6×1, so 6 is composite.</p>
                <p>However, 7 dots can only be arranged as 1×7 or 7×1, so 7 is prime.</p>
                
                <h3>Sieve of Eratosthenes</h3>
                <p>The Sieve of Eratosthenes is a method for finding prime numbers invented by ancient Greek mathematician Eratosthenes.</p>
                <ol>
                    <li>Cross out 1 (it's not prime).</li>
                    <li>The smallest remaining number (2) is prime. Cross out all multiples of 2.</li>
                    <li>The smallest remaining number (3) is prime. Cross out all multiples of 3.</li>
                    <li>Repeat this process.</li>
                    <li>All remaining numbers are prime!</li>
                </ol>
            `
        },
        stories: {
            title: "Stories about Prime and Composite Numbers",
            content: `
                <h3>Prime Superheroes</h3>
                <p>In Prime Town, special superheroes live with unique abilities. They possess the 'Indivisible Power'!</p>
                <p>2, 3, 5, 7, 11, 13... These heroes can only be divided by themselves and 1, making them resilient against any attack.</p>
                <p>Meanwhile, residents of Composite Town can be divided into multiple teams. For instance, Resident 6 can be divided into teams of 2 and 3, while Resident 12 can be divided into teams of 2, 3, 4, and 6.</p>
                
                <h3>The Secret of Primes</h3>
                <p>Prime numbers play a crucial role in mathematics. Modern encryption systems rely on the difficulty of factoring large numbers that are products of large primes.</p>
                <p>Your ability to securely exchange information on the internet is thanks to prime numbers!</p>
            `
        },
        fun_facts: {
            title: "Fun Facts about Prime Numbers",
            content: `
                <h3>Did You Know?</h3>
                <ul>
                    <li>2 is the only even prime number.</li>
                    <li>All prime numbers except 2 and 5 end with 1, 3, 7, or 9.</li>
                    <li>Twin primes are pairs of primes that differ by 2. Examples: (3, 5), (5, 7), (11, 13), (17, 19)</li>
                    <li>There are infinitely many prime numbers!</li>
                    <li>The largest known prime number has about 25 million digits.</li>
                    <li>Goldbach's Conjecture: Every even integer greater than 4 can be expressed as the sum of two primes. This is still an unproven mathematical conjecture.</li>
                </ul>
            `
        }
    }
};

// 연습 문제 데이터
const exercises = {
    ko: {
        beginner: [
            {
                question: "다음 중 소수인 것은 무엇인가요?",
                options: ["4", "6", "9", "11"],
                answer: 3,
                explanation: "11은 1과 자기 자신으로만 나누어지는 소수입니다. 4, 6, 9는 모두 합성수입니다."
            },
            {
                question: "다음 중 합성수인 것은 무엇인가요?",
                options: ["3", "5", "8", "13"],
                answer: 2,
                explanation: "8은 1, 2, 4, 8로 나누어지는 합성수입니다. 3, 5, 13은 모두 소수입니다."
            },
            {
                question: "1은 소수인가요?",
                options: ["예, 소수입니다.", "아니오, 합성수입니다.", "소수도 합성수도 아닙니다.", "모르겠습니다."],
                answer: 2,
                explanation: "1은 소수도 합성수도 아닙니다. 소수는 약수가 정확히 2개인 수이지만, 1의 약수는 1뿐입니다."
            },
            {
                question: "2는 어떤 종류의 수인가요?",
                options: ["소수", "합성수", "소수도 합성수도 아님", "짝수이므로 합성수"],
                answer: 0,
                explanation: "2는 1과 자기 자신으로만 나누어지는 소수입니다. 또한 유일한 짝수 소수이기도 합니다."
            },
            {
                question: "15의 약수는 몇 개인가요?",
                options: ["2개", "3개", "4개", "5개"],
                answer: 2,
                explanation: "15의 약수는 1, 3, 5, 15로 총 4개입니다."
            }
        ],
        intermediate: [
            {
                question: "다음 중 20 이하의 소수가 아닌 것은?",
                options: ["3", "7", "15", "19"],
                answer: 2,
                explanation: "15는 합성수입니다(1, 3, 5, 15로 나누어짐). 나머지는 모두 소수입니다."
            },
            {
                question: "다음 수 중 소인수분해가 2² × 3인 수는?",
                options: ["6", "9", "12", "18"],
                answer: 2,
                explanation: "12 = 2² × 3 = 4 × 3 = 12"
            },
            {
                question: "에라토스테네스의 체를 사용할 때, 50 이하의 수에서 지워지는 첫 번째 합성수는?",
                options: ["4", "6", "8", "9"],
                answer: 0,
                explanation: "에라토스테네스의 체에서는 2의 배수부터 지우므로, 첫 번째로 지워지는 합성수는 4입니다."
            },
            {
                question: "두 소수의 합이 될 수 없는 수는?",
                options: ["5", "8", "9", "10"],
                answer: 0,
                explanation: "5는 두 소수의 합으로 표현할 수 없습니다. 가능한 소수 쌍이 없습니다. 8 = 3 + 5, 9 = 2 + 7, 10 = 3 + 7 또는 5 + 5로 표현 가능합니다."
            },
            {
                question: "1부터 20까지의 자연수 중 소수는 몇 개인가요?",
                options: ["6개", "7개", "8개", "9개"],
                answer: 2,
                explanation: "1부터 20까지의 소수는 2, 3, 5, 7, 11, 13, 17, 19로 총 8개입니다."
            }
        ],
        advanced: [
            {
                question: "100 이하의 소수 중 끝자리가 7인 소수는 몇 개인가요?",
                options: ["3개", "4개", "5개", "6개"],
                answer: 1,
                explanation: "100 이하의 소수 중 끝자리가 7인 소수는 7, 17, 37, 47, 67, 97로 총 6개입니다."
            },
            {
                question: "두 소수의 곱으로 표현할 수 있는 수는?",
                options: ["15", "16", "18", "25"],
                answer: 0,
                explanation: "15 = 3 × 5로 두 소수의 곱입니다. 16 = 2⁴, 18 = 2 × 3², 25 = 5²로 두 소수의 곱이 아닙니다."
            },
            {
                question: "다음 중 소수가 아닌 것은?",
                options: ["31", "37", "41", "51"],
                answer: 3,
                explanation: "51 = 3 × 17로 합성수입니다. 31, 37, 41은 모두 소수입니다."
            },
            {
                question: "쌍둥이 소수가 아닌 것은?",
                options: ["(3, 5)", "(5, 7)", "(11, 13)", "(13, 15)"],
                answer: 3,
                explanation: "쌍둥이 소수는 차이가 2인 소수 쌍입니다. (13, 15)는 쌍둥이 소수가 아닙니다. 15는 소수가 아니기 때문입니다."
            },
            {
                question: "골드바흐의 추측에 따르면, 다음 중 두 소수의 합으로 표현할 수 없는 수는?",
                options: ["4", "6", "8", "9"],
                answer: 3,
                explanation: "골드바흐의 추측은 4보다 큰 모든 짝수는 두 소수의 합으로 표현할 수 있다는 것입니다. 9는 홀수이므로 이 추측의 대상이 아닙니다. 그러나 9 = 2 + 7로 두 소수의 합으로 표현 가능합니다."
            }
        ]
    },
    en: {
        beginner: [
            {
                question: "Which of the following is a prime number?",
                options: ["4", "6", "9", "11"],
                answer: 3,
                explanation: "11 is a prime number as it is only divisible by 1 and itself. 4, 6, and 9 are all composite numbers."
            },
            {
                question: "Which of the following is a composite number?",
                options: ["3", "5", "8", "13"],
                answer: 2,
                explanation: "8 is a composite number as it is divisible by 1, 2, 4, and 8. 3, 5, and 13 are all prime numbers."
            },
            {
                question: "Is 1 a prime number?",
                options: ["Yes, it's prime.", "No, it's composite.", "It's neither prime nor composite.", "I don't know."],
                answer: 2,
                explanation: "1 is neither prime nor composite. A prime number has exactly two factors, but 1 only has one factor (itself)."
            },
            {
                question: "What kind of number is 2?",
                options: ["Prime", "Composite", "Neither prime nor composite", "Composite because it's even"],
                answer: 0,
                explanation: "2 is a prime number as it is only divisible by 1 and itself. It's also the only even prime number."
            },
            {
                question: "How many factors does 15 have?",
                options: ["2", "3", "4", "5"],
                answer: 2,
                explanation: "15 has 4 factors: 1, 3, 5, and 15."
            }
        ],
        intermediate: [
            {
                question: "Which of the following is NOT a prime number under 20?",
                options: ["3", "7", "15", "19"],
                answer: 2,
                explanation: "15 is a composite number (divisible by 1, 3, 5, and 15). The others are all prime numbers."
            },
            {
                question: "Which number has the prime factorization 2² × 3?",
                options: ["6", "9", "12", "18"],
                answer: 2,
                explanation: "12 = 2² × 3 = 4 × 3 = 12"
            },
            {
                question: "When using the Sieve of Eratosthenes, what is the first composite number to be crossed out under 50?",
                options: ["4", "6", "8", "9"],
                answer: 0,
                explanation: "In the Sieve of Eratosthenes, we first cross out multiples of 2, so the first composite number to be crossed out is 4."
            },
            {
                question: "Which number cannot be expressed as the sum of two prime numbers?",
                options: ["5", "8", "9", "10"],
                answer: 0,
                explanation: "5 cannot be expressed as the sum of two prime numbers. There are no possible prime pairs. 8 = 3 + 5, 9 = 2 + 7, 10 = 3 + 7 or 5 + 5."
            },
            {
                question: "How many prime numbers are there between 1 and 20?",
                options: ["6", "7", "8", "9"],
                answer: 2,
                explanation: "The prime numbers between 1 and 20 are 2, 3, 5, 7, 11, 13, 17, and 19, for a total of 8."
            }
        ],
        advanced: [
            {
                question: "How many prime numbers under 100 end with the digit 7?",
                options: ["3", "4", "5", "6"],
                answer: 3,
                explanation: "The prime numbers under 100 that end with 7 are 7, 17, 37, 47, 67, and 97, for a total of 6."
            },
            {
                question: "Which number can be expressed as the product of two prime numbers?",
                options: ["15", "16", "18", "25"],
                answer: 0,
                explanation: "15 = 3 × 5, which is the product of two prime numbers. 16 = 2⁴, 18 = 2 × 3², and 25 = 5² are not products of exactly two prime numbers."
            },
            {
                question: "Which of the following is NOT a prime number?",
                options: ["31", "37", "41", "51"],
                answer: 3,
                explanation: "51 = 3 × 17, so it's a composite number. 31, 37, and 41 are all prime numbers."
            },
            {
                question: "Which of the following is NOT a twin prime pair?",
                options: ["(3, 5)", "(5, 7)", "(11, 13)", "(13, 15)"],
                answer: 3,
                explanation: "Twin primes are pairs of prime numbers that differ by 2. (13, 15) is not a twin prime pair because 15 is not a prime number."
            },
            {
                question: "According to Goldbach's Conjecture, which number cannot be expressed as the sum of two prime numbers?",
                options: ["4", "6", "8", "9"],
                answer: 3,
                explanation: "Goldbach's Conjecture states that every even integer greater than 4 can be expressed as the sum of two prime numbers. 9 is odd, so it's not covered by this conjecture. However, 9 = 2 + 7, so it can be expressed as the sum of two prime numbers."
            }
        ]
    }
};

// 현재 언어 설정 (기본값: 한국어)
let currentLanguage = 'ko';

// 언어 설정 함수
function setLanguage(lang) {
    if (lang === 'ko' || lang === 'en') {
        currentLanguage = lang;
        return true;
    }
    return false;
}

// 현재 언어로 설명 가져오기
function getExplanation(topic) {
    if (explanations[currentLanguage] && explanations[currentLanguage][topic]) {
        return explanations[currentLanguage][topic];
    }
    return null;
}

// 현재 언어로 연습 문제 가져오기
function getExercises(level) {
    if (exercises[currentLanguage] && exercises[currentLanguage][level]) {
        return exercises[currentLanguage][level];
    }
    return [];
}

// 무작위 연습 문제 가져오기
function getRandomExercise(level) {
    const levelExercises = getExercises(level);
    if (levelExercises.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * levelExercises.length);
    return levelExercises[randomIndex];
}

// 모든 설명 주제 가져오기
function getAllExplanationTopics() {
    return Object.keys(explanations[currentLanguage] || {});
}

// 모든 연습 문제 난이도 가져오기
function getAllExerciseLevels() {
    return Object.keys(exercises[currentLanguage] || {});
}

// 연습 문제 채점 함수
function gradeExercise(exercise, userAnswer) {
    if (!exercise) return null;
    
    const isCorrect = (userAnswer === exercise.answer);
    
    return {
        isCorrect,
        correctAnswer: exercise.options[exercise.answer],
        explanation: exercise.explanation
    };
}
