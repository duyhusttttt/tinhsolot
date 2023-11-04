document.getElementById("calculateLotButton").addEventListener("click", calculateLot);
document.getElementById("clearHistoryButton").addEventListener("click", clearHistory);

function calculateLot() {
    const lossAmount = parseFloat(document.getElementById("lossAmount").value);
    const pipLoss = parseFloat(document.getElementById("pipLoss").value);
    const commodity = document.getElementById("commodity").value;
    let lotSize = 0;

    if (pipLoss && lossAmount) {
        switch (commodity) {
            case "USD":
                lotSize = (lossAmount / pipLoss) / 10;
                break;
            case "CHF_EUR":
                lotSize = (lossAmount / pipLoss) / 10 * 0.9;
                break;
            case "NZD_AUD":
                lotSize = (lossAmount / pipLoss) / 10 * 1.7;
                break;
            case "JPY":
                lotSize = (lossAmount / pipLoss) / 10 * 1.5;
                break;
            case "USOIL":
                lotSize = (lossAmount / pipLoss) / 10;
                break;
            case "US30":
                lotSize = (lossAmount / pipLoss) / 10;
                break;
        }
    }

    const lotResultContainer = document.getElementById("lotResultContainer");
    lotResultContainer.textContent = `Số lot phù hợp là ${lotSize.toFixed(2)} lot`;

    // Lưu lịch sử tính toán
    saveHistory(lossAmount, pipLoss, commodity, lotSize);
}

function clearHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    localStorage.removeItem("pipCalculatorHistory");
}

function saveHistory(lossAmount, pipLoss, commodity, lotSize) {
    const historyList = document.getElementById("history");
    const historyEntry = document.createElement("li");
    historyEntry.innerHTML = `Lệnh ${commodity} lỗ ${pipLoss} pip, sụt giảm ${lossAmount}$ thì nên đi ${lotSize.toFixed(2)} lot.`;
    historyList.appendChild(historyEntry);

    // Lưu lịch sử vào localStorage
    const historyData = JSON.parse(localStorage.getItem("pipCalculatorHistory")) || [];
    historyData.push({ lossAmount, pipLoss, commodity, lotSize });
    localStorage.setItem("pipCalculatorHistory", JSON.stringify(historyData));
}

// Khôi phục lịch sử từ localStorage nếu có
const savedHistory = localStorage.getItem("pipCalculatorHistory");
if (savedHistory) {
    const historyData = JSON.parse(savedHistory);
    const historyList = document.getElementById("history");
    historyData.forEach((entry) => {
        const historyEntry = document.createElement("li");
        historyEntry.innerHTML = `Lệnh ${commodity} lỗ ${pipLoss} pip, sụt giảm ${lossAmount}$ thì nên đi ${lotSize.toFixed(2)} lot.`;
        historyList.appendChild(historyEntry);
    });
}
