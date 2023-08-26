const calculateEarnLossButton = document.getElementById("calculateEarnLossButton");
const earnLossResultContainer = document.getElementById("earnLossResultContainer");
const historyTableBody = document.querySelector("#history tbody");
const clearHistoryButton = document.getElementById("clearHistoryButton");

// Load history from localStorage if available
const savedHistory = localStorage.getItem("earnLossHistory");
if (savedHistory) {
    historyTableBody.innerHTML = savedHistory;
}

calculateEarnLossButton.addEventListener("click", calculateEarnLoss);
clearHistoryButton.addEventListener("click", clearHistory);

function calculateEarnLoss() {
    const giadatlenh = parseFloat(document.getElementById("giadatlenh").value);
    const earnLot = parseFloat(document.getElementById("earnLot").value);
    const earnTP = parseFloat(document.getElementById("earnTP").value);
    const earnSL = parseFloat(document.getElementById("earnSL").value);

    const earn = Math.abs(earnTP - giadatlenh) * earnLot * 100;
    const loss = Math.abs(earnSL - giadatlenh) * earnLot * 100;

    const resultHTML = `Thắng được $${earn.toFixed(2)}<br>Thua mất $${loss.toFixed(2)}`;
    earnLossResultContainer.innerHTML = resultHTML;

    const historyEntry = document.createElement("tr");
    historyEntry.innerHTML = `
        <td>${giadatlenh}</td>
        <td>${earnLot}</td>
        <td>${earnTP}</td>
        <td>${earnSL}</td>
        <td>Thắng $${earn.toFixed(2)}<br>Thua $${loss.toFixed(2)}</td>
    `;
    historyTableBody.appendChild(historyEntry);

    // Save history to localStorage
    localStorage.setItem("earnLossHistory", historyTableBody.innerHTML);
}

function clearHistory() {
    historyTableBody.innerHTML = "";
    localStorage.removeItem("earnLossHistory");
}
