let storage = JSON.parse(localStorage.getItem('results') || {});

setTimeout(() => {
    Object.keys(storage).forEach(key => {
        let element = document.getElementById(key);
        element.value = storage[key];
    });
}, 100);


function calculate() {
    resetViews();

    let bonusValue = parseFloat(document.getElementById('bonusValue').value ?? 0);
    let paidValue = parseFloat(document.getElementById('paidValue').value ?? 0);
    let resultValue = parseFloat(document.getElementById('resultValue').value ?? 0);

    if (!((bonusValue > 0) && (paidValue > 0) && (resultValue > 0))) {
        return;
    }

    const halfValue = resultValue / 2;
    const discount = (bonusValue / 2) - paidValue;
    const finalValue = halfValue - discount;

    localStorage.setItem('results', JSON.stringify({ bonusValue, paidValue, resultValue }));
    updateView([
        getCurrency(halfValue),
        getCurrency(discount),
        getCurrency(finalValue)
    ]);

    let streammerValue = bonusValue - paidValue;
    let userValue = (paidValue / bonusValue);
    let streammerPercent = ((streammerValue / bonusValue) * 100).toFixed(0);

    const strammerFormattedValue = ` (${getCurrency(streammerValue)}) ${(streammerPercent)}%`;
    const userFormattedValue = `(${getCurrency(paidValue)}) ${(100 - streammerPercent).toFixed(0)}%`;
    const parityValue = (resultValue * userValue);
    updateParityView([strammerFormattedValue, userFormattedValue, getCurrency(parityValue)], getCurrency(resultValue));
}

function resetViews() {
    let result = document.getElementById('result');
    result.innerHTML = "";
}

function updateParityView(items, result) {
    let container = document.createElement('div');
    let div = document.createElement('div');
    let title = document.createElement('p');
    title.innerHTML = 'Por valores proporcionais (%)';
    title.className = 'label';
    div.style = "display:grid; grid-gap:18px"
    div.innerHTML = `
        <div class="item" style="animation-delay:0.1s">
            <p>Valor pago pelo Minnie</p>
            <p>${items[0]}</p>
        </div>
        <div class="item" style="animation-delay:0.2s">
            <p>Valor pago pelo Fiel</p>
            <p>${items[1]}</p>
        </div>
        <div class="item" style="animation-delay:0.3s">
            <p>
                Valor a receber <br>
                <span style="font-weight: normal;font-size: 18px;"> ${result} * ${items[1].split(')')[1]} </span>
            </p>
            <p class="positive">${items[2]}</p>
        </div>
        `;
    let section = document.getElementById('result');
    container.append(title);
    container.append(div);
    section.append(container);
    document.body.appendChild(section);
}

function updateView(items) {
    let container = document.createElement('div');
    let div = document.createElement('div');
    let title = document.createElement('p');
    title.innerHTML = 'Por valores brutos';
    title.className = 'label';
    div.style = "display:grid; grid-gap:18px"
    div.innerHTML = `
        <div class="item" style="animation-delay:0.1s">
            <p>Valor da forra / 2</p>
            <p>${items[0]}</p>
        </div>
        <div class="item" style="animation-delay:0.2s">
            <p>Complemento do valor</p>
            <p class="negative">- ${items[1]}</p>
        </div>
        <div class="item" style="animation-delay:0.3s">
            <p>Valor a receber</p>
            <p class="positive">${items[2]}</p>
        </div>
        `;
    let section = document.getElementById('result');
    container.append(title);
    container.append(div);
    section.append(container);
    document.body.appendChild(section);
}

function getCurrency(number) {
    return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}
