import { displayCart } from "../menu.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("test");
  displayCart(container);
});

function showMessage(messageText) {
  const msgBox = document.getElementById("message-box");
  msgBox.textContent = messageText;
  msgBox.classList.remove("hidden");

  setTimeout(() => {
    msgBox.classList.add("hidden");
  }, 2000);
}
const Total = document.getElementById("Total");

function calculateTotalCartPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((item) => {
    total += Number(item.Totalprice) || 0;
  });

  Total.textContent = `Total: ${total} EGP`;
}

// استدعاء الدالة وقت تحميل الصفحة
calculateTotalCartPrice();

let deleteButtons = document.getElementById("deleteButtons");

deleteButtons.addEventListener("click", () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCounter"); // حذف العداد من localStorage
  localStorage.removeItem("TotalPrice"); // حذف السعر الإجمالي من localStorage
  const container = document.getElementById("test");
  container.innerHTML = ""; // Clear the cart display
  showMessage("  سيتم تجهيز الطلبية الخاصة بك في خلال 30 دقيقة ");
});


