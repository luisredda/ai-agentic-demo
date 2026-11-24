// DemoBank AI SDLC — client-side JS
// Handles the transfer form submission via fetch

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("transfer-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      fromAccount: form.fromAccount.value,
      toAccount: form.toAccount.value,
      amount: form.amount.value,
      memo: form.memo.value,
    };

    fetch("/api/transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const resultDiv = document.getElementById("transfer-result");
        resultDiv.textContent = "";
        const alertDiv = document.createElement("div");
        if (result.success) {
          alertDiv.className = "alert alert-success";
          alertDiv.setAttribute("style", "font-size:18px;font-weight:800;padding:24px;");

          const msg = document.createTextNode("✅ Transfer completed successfully!");
          alertDiv.appendChild(msg);
          alertDiv.appendChild(document.createElement("br"));

          const amountStrong = document.createElement("strong");
          amountStrong.textContent = "Amount transferred: $" + Number(result.amount).toFixed(2);
          alertDiv.appendChild(amountStrong);
          alertDiv.appendChild(document.createElement("br"));

          const txSpan = document.createElement("span");
          txSpan.setAttribute("style", "font-size:12px;color:#276749;");
          txSpan.textContent = "Transaction ID: " + result.transferId;
          alertDiv.appendChild(txSpan);
        } else {
          alertDiv.className = "alert alert-error";
          alertDiv.textContent = "Error: " + (result.error || "Unknown error");
        }
        resultDiv.appendChild(alertDiv);
      })
      .catch(() => {
        const resultDiv = document.getElementById("transfer-result");
        resultDiv.textContent = "";
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-error";
        alertDiv.textContent = "Transfer request failed.";
        resultDiv.appendChild(alertDiv);
      });
  });
});
