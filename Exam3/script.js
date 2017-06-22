const data = {
    "parts": [
        {
            "classification": "engine",
            "id": "warp",
            "price": 25
        },
        {
            "classification": "engine",
            "id": "fusion",
            "price": 50,
        },
        {
            "classification": "body",
            "id": "aluminium",
            "price": 50
        },
        {
            "classification": "body",
            "id": "titanium",
            "price": 120
        },
        {
            "classification": "power generator",
            "id": "nuclear",
            "price": 200
        },
        {
            "classification": "power generator",
            "id": "solar",
            "price": 50
        }
    ],
    "parts compatibility": {
        "nuclear:power generator": [
            "titanium:body",
            "engine:warp",
            "engine:fusion"
        ],
        "solar:power generator": [
            "titanium:body",
            "aluminium:body",
            "engine:warp"
        ]
    }
};

let dataArr = data.parts;
let compatibility = data["parts compatibility"];
let newCompatibility = {};
let dataTextForHtml = [];

for (dataA in compatibility) {
    newCompatibility[dataA] = compatibilityParsed(compatibility[dataA], dataArr);
    newCompatibility[dataA].push(reactorParse(dataA, dataArr));
}

for (dataA in newCompatibility) {
    dataTextForHtml.push(displayData(newCompatibility[dataA]));
}

// HTML DATA ADD

const flatArr = [].concat(...dataTextForHtml);
let ulElement = document.getElementsByTagName("ul")[0];
let listTemperature = document.createDocumentFragment();
let liElement = document.createElement("li");

Array.from(flatArr, (val) => {
    let elem = liElement.cloneNode(true);
    elem.innerHTML = val;
    listTemperature.appendChild(elem);

});

ulElement.appendChild(listTemperature);

// END HTML DATA ADD


function compatibilityParsed(nucliar, dataArr) {
    let newCompatibility = [];
    for (let i = 0; i < nucliar.length; i += 1) {
        for (let j = 0; j < dataArr.length; j += 1) {
            if (nucliar[i].includes(dataArr[j].id)) {
                newCompatibility.push(dataArr[j]);
                break;
            }
        }
    }
    return newCompatibility;
}

function reactorParse(dataA, dataArr) {
    let result;
    for (dataA in newCompatibility) {
        for (j = 0; j < dataArr.length; j += 1) {
            if (dataA.includes(dataArr[j].id)) {
                result = dataArr[j];
                break;
            }
        }
    }
    return result;
}

function displayData(m) {
    let dataText = [];
    let arrLen = m.length;

    for (i = 0; i < arrLen - 1; i += 1) {
        if (m[i].classification === "body") {

            for (q = arrLen - 2; q >= 0; q -= 1) {
                if (m[q].classification !== "body") {
                    let sum;
                    sum = m[arrLen - 1].price + m[i].price + m[q].price;
                    dataText.push(`${m[arrLen - 1].id} ${m[arrLen - 1].classification}, ${m[i].id}  ${m[i].classification}, ${m[q].id} ${m[q].classification}. Prise: ${sum}`);
                }
            }
        }
    }
    return dataText;
}

