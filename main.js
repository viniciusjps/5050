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
    updateView([halfValue, discount, finalValue]);

    let streammerValue = bonusValue - paidValue;
    let userValue = (paidValue / bonusValue);

    const strammerFormattedValue = ` (R$ ${streammerValue}) ${((streammerValue / bonusValue) * 100)}%`;
    const userFormattedValue = `(R$ ${paidValue}) ${(userValue * 100)}%`;
    const parityValue = (resultValue * userValue);
    updateParityView([strammerFormattedValue, userFormattedValue, parityValue]);
}

function resetViews() {
    let result = document.getElementById('result');
    result.innerHTML = "";
}

function updateParityView(items) {
    let container = document.createElement('div');
    let div = document.createElement('div');
    let title = document.createElement('p');
    title.innerHTML = 'Valor por paridade (%)';
    title.className = 'label';
    div.style = "display:grid; grid-gap:18px"
    div.innerHTML = `
        <div class="item">
            <p>Valor do Minnie</p>
            <p>${items[0]}</p>
        </div>
        <div class="item">
            <p>Valor do Fiel</p>
            <p>${items[1]}</p>
        </div>
        <div class="item">
            <p>Valor a receber</p>
            <p class="positive">R$ ${items[2]}</p>
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
    title.innerHTML = 'Valores brutos';
    title.className = 'label';
    div.style = "display:grid; grid-gap:18px"
    div.innerHTML = `
        <div class="item">
            <p>Valor da forra / 2</p>
            <p>R$ ${items[0]}</p>
        </div>
        <div class="item">
            <p>Complemento do valor</p>
            <p class="negative">- R$ ${items[1]}</p>
        </div>
        <div class="item">
            <p>Valor a receber</p>
            <p class="positive">R$ ${items[2]}</p>
        </div>
        `;
    let section = document.getElementById('result');
    container.append(title);
    container.append(div);
    section.append(container);
    document.body.appendChild(section);
}
