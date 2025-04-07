/**
 * 숫자 분류기 (Number Classifier) 모듈
 * 소수와 합성수를 판별하고 약수를 찾는 기능을 제공합니다.
 */

// 소수 판별 함수
function isPrime(num) {
    // 1 이하의 수는 소수가 아님
    if (num <= 1) return false;
    // 2와 3은 소수
    if (num <= 3) return true;
    // 2나 3으로 나누어 떨어지면 소수가 아님
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // 6k ± 1 형태의 수에 대해 검사 (최적화된 알고리즘)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

// 약수 찾기 함수
function getFactors(num) {
    const factors = [];
    
    // 약수 찾기
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i);
            // 제곱근이 아닌 경우 대응되는 약수도 추가
            if (i !== num / i) {
                factors.push(num / i);
            }
        }
    }
    
    // 오름차순 정렬
    factors.sort((a, b) => a - b);
    return factors;
}

// 소인수분해 함수
function getPrimeFactorization(num) {
    if (num <= 1) return [];
    
    const primeFactors = [];
    let n = num;
    
    // 2로 나누기
    while (n % 2 === 0) {
        primeFactors.push(2);
        n /= 2;
    }
    
    // 3 이상의 홀수로 나누기
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            primeFactors.push(i);
            n /= i;
        }
    }
    
    // 남은 수가 1보다 크면 그 자체가 소수
    if (n > 1) {
        primeFactors.push(n);
    }
    
    return primeFactors;
}

// 소인수분해 결과를 지수 형태로 표현
function getPrimeFactorizationFormatted(num) {
    const primeFactors = getPrimeFactorization(num);
    if (primeFactors.length === 0) return "";
    
    const counts = {};
    primeFactors.forEach(factor => {
        counts[factor] = (counts[factor] || 0) + 1;
    });
    
    const formatted = [];
    for (const [prime, count] of Object.entries(counts)) {
        if (count === 1) {
            formatted.push(prime);
        } else {
            formatted.push(`${prime}<sup>${count}</sup>`);
        }
    }
    
    return formatted.join(" × ");
}

// 숫자 분류 (소수, 합성수, 1, 0, 음수)
function classifyNumber(num) {
    if (num < 0) return "negative";
    if (num === 0) return "zero";
    if (num === 1) return "one";
    return isPrime(num) ? "prime" : "composite";
}

// 숫자 분류 결과 텍스트 (다국어 지원)
function getClassificationText(num, lang = 'ko') {
    const classification = classifyNumber(num);
    
    const texts = {
        ko: {
            negative: "음수",
            zero: "0 (영)",
            one: "1 (1은 소수도 합성수도 아닙니다)",
            prime: "소수",
            composite: "합성수"
        },
        en: {
            negative: "Negative number",
            zero: "Zero",
            one: "One (1 is neither prime nor composite)",
            prime: "Prime number",
            composite: "Composite number"
        }
    };
    
    return texts[lang][classification];
}

// 숫자에 대한 설명 생성 (다국어 지원)
function generateNumberDescription(num, lang = 'ko') {
    const classification = classifyNumber(num);
    const factors = getFactors(num);
    
    let description = "";
    
    if (lang === 'ko') {
        description += `${num}은(는) ${getClassificationText(num, 'ko')}입니다.\n\n`;
        
        if (classification === 'negative' || classification === 'zero') {
            return description;
        }
        
        description += `약수: ${factors.join(', ')}\n`;
        description += `약수의 개수: ${factors.length}개\n\n`;
        
        if (classification === 'composite') {
            const primeFactorization = getPrimeFactorizationFormatted(num);
            description += `소인수분해: ${num} = ${primeFactorization}\n`;
        }
        
        if (classification === 'prime') {
            description += "소수는 1과 자기 자신으로만 나누어지는 수입니다.\n";
        } else if (classification === 'composite') {
            description += "합성수는 1과 자기 자신 외에 다른 약수를 가지는 수입니다.\n";
        }
    } else {
        description += `${num} is ${getClassificationText(num, 'en')}.\n\n`;
        
        if (classification === 'negative' || classification === 'zero') {
            return description;
        }
        
        description += `Factors: ${factors.join(', ')}\n`;
        description += `Number of factors: ${factors.length}\n\n`;
        
        if (classification === 'composite') {
            const primeFactorization = getPrimeFactorizationFormatted(num);
            description += `Prime factorization: ${num} = ${primeFactorization}\n`;
        }
        
        if (classification === 'prime') {
            description += "A prime number is only divisible by 1 and itself.\n";
        } else if (classification === 'composite') {
            description += "A composite number has factors other than 1 and itself.\n";
        }
    }
    
    return description;
}
