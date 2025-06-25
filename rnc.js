const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const placeObjs = [
    {   // units
        "0": "",
        "1": "I",
        "2": "II",
        "3": "III",
        "4": "IV",
        "5": "V",
        "6": "VI",
        "7": "VII",
        "8": "VIII",
        "9": "IX"
    },
    {   // tens
        "0": "",
        "1": "X",
        "2": "XX",
        "3": "XXX",
        "4": "XL",
        "5": "L",
        "6": "LX",
        "7": "LXX",
        "8": "LXXX",
        "9": "XC"
    },
    {   // hundreds
        "0": "",
        "1": "C",
        "2": "CC",
        "3": "CCC",
        "4": "CD",
        "5": "D",
        "6": "DC",
        "7": "DCC",
        "8": "DCCC",
        "9": "CM"
    },
    {   // thousands
        "0": "",
        "1": "M",
        "2": "MM",
        "3": "MMM"
    }
]

// to ignore any non-digit except minus sign at the beginning of a string
const cleanStr = (str) => {
    const strArr = str.split("");
    for (let i=0; i<strArr.length; i++) {
        if (str[i]==="e" || str[i]===".") strArr[i] = "";
        if (i!==0 && str[i]==="-") strArr[i] = "";
    }
    return strArr.join("");
}

// removet leading 0s from string
const removeZeros = (arr) => {
    if (arr[0] === "0") {
        arr.shift();
        removeZeros(arr);
    }
    return arr;
}

const toRomanNumeral = (numStr) => {
    let result = "";
    const lastDigitIndex = numStr.length - 1;
    
    let i = lastDigitIndex;

    while (i>=0) {
        const digit = numStr[i]; // standing for placeObj key
        const digitPlaceObjIndex = lastDigitIndex - i; // unit placeObj is at index 0
        const digitPlaceObj = placeObjs[digitPlaceObjIndex];
        const digitPlaceVal = digitPlaceObj[digit];
        result = digitPlaceVal + result;
        i--;
    }

    return result;
}

const displayResult = (numStr) => {
    output.innerText = toRomanNumeral(numStr);
    output.classList.remove("hide");
}

const eventHandler = () => {
    const rawStr = number.value;
    if (rawStr==="") {
        output.innerText = "Please enter a valid number";
        return;
    }

    const numberVal = Number(cleanStr(rawStr));
    if (numberVal<0) {
        output.innerText = "Please enter a number greater than or equal to 1";
        return;
    }
    if (numberVal>3999) {
        output.innerText = "Please enter a number less than or equal to 3999";
        return;
    }

    const cleanedStr = cleanStr(rawStr);
    const cleanedStrArr = cleanedStr.split("");
    const resultStr = removeZeros(cleanedStrArr).join("");

    displayResult(resultStr);

    number.value = "";
    number.focus();
}

convertBtn.addEventListener("click", eventHandler);
number.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        eventHandler();
    }
})