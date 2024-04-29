const paymentMethodSelect = document.getElementById("payment-method");
const upiInfo = document.getElementById("upi-info");
const thankYouMessage = document.getElementById("thank-you-message");

paymentMethodSelect.addEventListener("change", function() {
    if (this.value === "upi") {
        upiInfo.style.display = "block";
    } else {
        upiInfo.style.display = "none";
    }
});

// function showThankYouMessage() {
//     thankYouMessage.style.display = "block";
// }

// document.getElementById("confirm-payment").addEventListener("click", showThankYouMessage);
