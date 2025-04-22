let sup = document.querySelector(".sup");

const container = document.getElementById("menuContainer");

function showMessage(messageText) {
  const msgBox = document.getElementById("message-box");
  msgBox.textContent = messageText;
  msgBox.classList.remove("hidden");

  setTimeout(() => {
    msgBox.classList.add("hidden");
  }, 2000);
}

function Confirmationmessage(messageText) {
  const msgBox = document.getElementById("Confirmation-message");
  msgBox.textContent = messageText;
  msgBox.classList.remove("hidden");

  setTimeout(() => {
    msgBox.classList.add("hidden");
  }, 2000);
}

// استرجاع قيمة العداد من localStorage
let counter = parseInt(localStorage.getItem("cartCounter")) || 0;


function addtocart(product, count, Totalprice) {
  console.log("📦 المنتج اللي بيتبعت:", product);

  // جلب السلة من localStorage أو إنشاء سلة جديدة إذا لم تكن موجودة
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // التحقق إذا كان المنتج موجود في السلة
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // إذا كان المنتج موجودًا، قم بزيادة الكمية بالعدد الذي أدخله المستخدم
    existingProduct.count += count;
    existingProduct.Totalprice += Totalprice; // زيادة السعر الإجمالي
  } else {
    // إذا كان المنتج غير موجود، أضفه إلى السلة مع الكمية المدخلة
    const newProduct = { ...product, count, Totalprice };
    cart.push(newProduct);
  }

  // حفظ السلة المحدثة في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // عرض السلة في console للمراجعة
  console.log(
    "تم إضافة المنتج إلى السلة:",
    product.name,
    "الكمية:",
    product.count
  );
}

export function displayCart(container) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>السلة فارغة</p>";
    return;
  }

  container.innerHTML = cart
    .map(
      (product) => `
      <div class="card shadow-sm mb-4 border border-gray-200 rounded-lg overflow-hidden">
  <div class="row g-0">
    <div class="col-md-4 flex items-center justify-center p-3 bg-gray-50">
      <img src="${product.image}" alt="${product.name}" class="img-fluid rounded w-24 h-24 object-cover" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-lg font-bold text-gray-800 mb-2">${product.name}</h5>
        <p class="card-text text-sm text-gray-600 mb-1"><strong>Price:</strong> ${product.price} EGP</p>
        <p class="card-text text-sm text-gray-600 mb-1"><strong>Description:</strong> ${product.description}</p>
        <p class="card-text text-sm text-gray-600 mb-1"><strong>Count:</strong> ${product.count}</p>
        <p class="card-text text-sm text-gray-600"><strong>Total Price:</strong> ${product.Totalprice} EGP</p>
        <button class="btn btn-danger btn-sm mt-3 delete-btn">Delete</button>
      </div>
    </div>
  </div>
</div>

    `
    )
    .join("");

  const deleteButtons = container.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      cart.splice(index, 1); // إزالة المنتج من السلة
      localStorage.setItem("cart", JSON.stringify(cart)); // تحديث السلة في localStorage
      displayCart(container); // إعادة عرض السلة
    });
  });
}

fetch("https://tarek-goda.github.io/API-menu/menu_final.json")
  .then((res) => res.json())
  .then((x) => {
    if (x?.menu) {
      console.log(x.menu[0]?.items[0]); // الوصول بأمان باستخدام التسلسل الاختياري
      x.menu.forEach((category) => {
        category.items.forEach((item) => {
          console.log(item.image); // الوصول بأمان باستخدام التسلسل الاختياري

          const col = document.createElement("div");
          col.className = "col-md-4 mb-4";

          col.innerHTML = `
                        <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col justify-between" style="height: 100%; min-height: 450px; max-height: 450px; width: 300px;">
                          <img src="${item?.image}" class="rounded mb-3 w-full object-contain h-40" alt="${item?.name}" />
                          
                          <div class="flex-grow">
                              <h4 class="text-xl font-semibold mb-2">${item?.name}</h4>
                              <p class="text-gray-600 text-sm cut-text mb-4" style="height: 80px;">
                                  ${item?.description}
                              </p>
                          </div>
                          
                          <div class="flex items-center justify-between mt-2">
                              <span class="text-lg font-bold text-red-600">${item?.price} EGP</span>
                              
                              <div class="flex items-center space-x-2">
                                  <button type="button" class="btn btn-danger btn-minus">-</button>
                                  <span class="span-count span">0</span>
                                  <button type="button" class="btn btn-success btn-plus">+</button>
                              </div>

                              <button class="btn btn-dark ml-2 button-cart">Add to Cart</button>
                          </div>
                      </div>

                    `;

          container.appendChild(col);

          // ربط الأحداث بالأزرار
          const plusBtn = col.querySelector(".btn-plus");
          const minusBtn = col.querySelector(".btn-minus");
          const spanCount = col.querySelector(".span-count");
          const buttonCart = col.querySelector(".button-cart");
          let count = 0;

          plusBtn.addEventListener("click", () => {
            count++;
            spanCount.textContent = count;
          });

          minusBtn.addEventListener("click", () => {
            if (count > 0) count--;
            spanCount.textContent = count;
          });

          buttonCart.addEventListener("click", () => {
            if (count > 0) {
              let Totalprice = item.price * count; // حساب السعر الإجمالي
              addtocart(item, count, Totalprice); // تمرير الكمية مع المنتج
              counter++;
              sup.innerText = `+${counter}`;
              localStorage.setItem("cartCounter", counter);
              sup.classList.remove("none");
              spanCount.textContent = 0;
              count = 0;
              Confirmationmessage("تمت إضافة المنتج إلى السلة بنجاح.");
            } else {
              showMessage("الرجاء تحديد الكمية قبل الإضافة إلى السلة.");
            }
          });
        });
      });
    }
  })
  .catch((err) => {
    console.error("فشل تحميل البيانات:", err);
  });
