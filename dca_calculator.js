const entryCountInput = document.getElementById("entryCount");
const generateTableButton = document.getElementById("generateTable");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const tableContainer = document.getElementById("tableContainer");
const resultContainer = document.getElementById("resultContainer");
const history = document.getElementById("history");

generateTableButton.addEventListener("click", generateTable);
clearHistoryButton.addEventListener("click", clearHistory);

// Load history from local storage when the page loads
loadHistory();

function generateTable() {
    const entryCount = parseInt(entryCountInput.value);

    let tableHTML = '<table><tr><th>Price</th><th>Lot</th></tr>';
    for (let i = 1; i <= entryCount; i++) {
        tableHTML += `<tr><td><input type="number" id="price${i}" placeholder="Price ${i}"></td>`;
        tableHTML += `<td><input type="number" id="lot${i}" placeholder="Lot ${i}"></td></tr>`;
    }
    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;

    const calculateButton = document.createElement("button");
    calculateButton.textContent = "Tính toán DCA";
    calculateButton.addEventListener("click", calculateDCA);
    resultContainer.innerHTML = "";
    resultContainer.appendChild(calculateButton);
}

function calculateDCA() {
    const entryCount = parseInt(entryCountInput.value);
    let totalDCA = 0;
    let totalLot = 0;
    const pricesAndLots = [];

    for (let i = 1; i <= entryCount; i++) {
        const price = parseFloat(document.getElementById(`price${i}`).value);
        const lot = parseFloat(document.getElementById(`lot${i}`).value);

        totalDCA += price * lot;
        totalLot += lot;
        pricesAndLots.push({ price, lot });
    }

    const dca = totalDCA / totalLot;
    resultContainer.innerHTML = `Tổng số lot là ${totalLot.toFixed(2)} tại giá ${dca.toFixed(2)}`;
    const historyEntry = document.createElement("div");
    const historyText = `Có ${entryCount} entry với tổng số lot là ${totalLot.toFixed(2)} tại giá ${dca.toFixed(2)}`;
    historyEntry.textContent = historyText;
    history.appendChild(historyEntry);

    // Save history to local storage
    saveHistory();
}

function clearHistory() {
    history.innerHTML = "";

    // Clear history in local storage
    localStorage.removeItem("dcaHistory");
}

function loadHistory() {
    const savedHistory = localStorage.getItem("dcaHistory");
    if (savedHistory) {
        history.innerHTML = savedHistory;
    }
}

function saveHistory() {
    localStorage.setItem("dcaHistory", history.innerHTML);
}
