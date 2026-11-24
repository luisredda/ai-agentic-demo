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
        const box = document.createElement("div");
        if (result.success) {
          // DEMO UX BUG: shows success even for invalid (negative/zero) amounts
          box.className = "alert alert-success";
          box.style.cssText =
            "font-size:18px;font-weight:800;padding:24px;";
          box.appendChild(
            document.createTextNode("✅ Transfer completed successfully!")
          );
          box.appendChild(document.createElement("br"));
          box.appendChild(document.createTextNode("Amount transferred: "));
          const strong = document.createElement("strong");
          strong.textContent = "$" + result.amount;
          box.appendChild(strong);
          box.appendChild(document.createElement("br"));
          const span = document.createElement("span");
          span.style.cssText = "font-size:12px;color:#276749;";
          span.textContent = "Transaction ID: " + result.transferId;
          box.appendChild(span);
        } else {
          box.className = "alert alert-error";
          box.textContent = "Error: " + result.error;
        }
        resultDiv.replaceChildren(box);
      })
      .catch(() => {
        document.getElementById("transfer-result").innerHTML =
          '<div class="alert alert-error">Transfer request failed.</div>';
      });
  });
});
