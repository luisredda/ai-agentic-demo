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
        if (result.success) {
          const alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-success";
          alertDiv.style.cssText = "font-size:18px;font-weight:800;padding:24px;";
          alertDiv.appendChild(document.createTextNode("✅ Transfer completed successfully!"));
          alertDiv.appendChild(document.createElement("br"));
          const strong = document.createElement("strong");
          strong.textContent = "Amount transferred: $" + result.amount;
          alertDiv.appendChild(strong);
          alertDiv.appendChild(document.createElement("br"));
          const txSpan = document.createElement("span");
          txSpan.style.cssText = "font-size:12px;color:#276749;";
          txSpan.textContent = "Transaction ID: " + result.transferId;
          alertDiv.appendChild(txSpan);
          resultDiv.replaceChildren(alertDiv);
        } else {
          const alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-error";
          alertDiv.textContent = "Error: " + result.error;
          resultDiv.replaceChildren(alertDiv);
        }
      })
      .catch(() => {
        const resultDiv = document.getElementById("transfer-result");
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-error";
        alertDiv.textContent = "Transfer request failed.";
        resultDiv.replaceChildren(alertDiv);
      });
  });
});
