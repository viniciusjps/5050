let storage = JSON.parse(localStorage.getItem('results') || {});

setTimeout(() => {
    Object.keys(storage).forEach(key => {
        let element = document.getElementById(key);
        element.value = storage[key];
    });
}, 100);


function calculate() {
    let result = document.getElementById('result');
    result.innerHTML = "";

    let bonusValue = parseFloat(document.getElementById('bonusValue').value ?? 0);
    let paidValue = parseFloat(document.getElementById('paidValue').value ?? 0);
    let resultValue = parseFloat(document.getElementById('resultValue').value ?? 0);

    if (!(bonusValue + paidValue + resultValue)) {
        return;
    }

    const halfValue = resultValue / 2;
    const discount = (bonusValue / 2) - paidValue;
    const finalValue = halfValue - discount;

    localStorage.setItem('results', JSON.stringify({ bonusValue, paidValue, resultValue }));
    updateView([halfValue, discount, finalValue]);
}

function updateView(items) {
    let section = document.getElementById('result');
    let div = document.createElement('div');
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
        `
    section.append(div);
    document.appendChild(section);
}
