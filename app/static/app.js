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
        resultDiv.innerHTML = "";
        const alertDiv = document.createElement("div");
        if (result.success) {
          alertDiv.className = "alert alert-success";
          alertDiv.style.cssText = "font-size:18px;font-weight:800;padding:24px;";
          const title = document.createTextNode("✅ Transfer completed successfully!");
          const br1 = document.createElement("br");
          const amountLabel = document.createTextNode("Amount transferred: ");
          const strong = document.createElement("strong");
          strong.textContent = "$" + result.amount;
          const br2 = document.createElement("br");
          const idSpan = document.createElement("span");
          idSpan.style.cssText = "font-size:12px;color:#276749;";
          idSpan.textContent = "Transaction ID: " + result.transferId;
          alertDiv.appendChild(title);
          alertDiv.appendChild(br1);
          alertDiv.appendChild(amountLabel);
          alertDiv.appendChild(strong);
          alertDiv.appendChild(br2);
          alertDiv.appendChild(idSpan);
        } else {
          alertDiv.className = "alert alert-error";
          alertDiv.textContent = "Error: " + result.error;
        }
        resultDiv.appendChild(alertDiv);
      })
      .catch(() => {
        const errDiv = document.getElementById("transfer-result");
        errDiv.innerHTML = "";
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-error";
        alertDiv.textContent = "Transfer request failed.";
        errDiv.appendChild(alertDiv);
      });
  });
});
