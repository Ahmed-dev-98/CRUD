var productName = document.getElementById("product-name");
var productPrice = document.getElementById("product-price");
var productDesc = document.getElementById("product-desc");
var productCat = document.getElementById("product-category");
var productStock = document.getElementById("stock");
let addBtn = document.getElementById("addBtn")
var productList = []
var addOrUpdate = "add";
let addToStock = document.getElementById("addToStock")
let RemoveFromStock = document.getElementById("RemoveFromStock")
let stock = document.getElementById("stocknumber")
let alerts = document.getElementsByClassName("alert");
let msg = document.getElementById("addproductErrorMsg")
let state;
let byID = document.getElementById("byID")
let byCategory = document.getElementById("byCategory")
var tmp;

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProducts(productList);
} else {
  productList = [];
}

function addProduct() {
  var prodcut = {
    name: productName.value,
    price: productPrice.value,
    desc: productDesc.value,
    category: productCat.value,
    stock: productStock.value
  };
  if (addOrUpdate === "add" && validation() == true) {
    productList.push(prodcut);
    msg.innerHTML = `product added`
    msg.classList.replace("d-none", "d-block")
    msg.classList.replace("text-danger", "text-success")
    setTimeout(() => {
      msg.classList.replace("d-block", "d-none")
    }, 3000);


    clearForm()
  }
  else if (addOrUpdate === "update" && validation() == true) {
    productList[tmp] = prodcut;
    addOrUpdate = "Add"
    addBtn.innerHTML = "Add Product"
    addBtn.classList.replace("btn-warning", "btn-primary")

    clearForm()
  }
  else {
    msg.classList.replace("d-none", "d-block")
    msg.innerHTML = `all fields are required`
    setTimeout(() => {
      msg.classList.replace("d-block", "d-none")
    }, 3000);

  }
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProducts(productList);

}

function addbtnsForAdding(i) {
  state = "add"
  let showmodal = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel </button>
    <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick = "addItem(${i})">Add</button>
    `
  document.getElementById("modalbtn").innerHTML = showmodal


}
function addbtns(i) {
  let showmodal = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel </button>
        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick = "addItem(${i})">Remove</button>
        `
  document.getElementById("modalbtn").innerHTML = showmodal


}






function addItem(i) {


  let amount = Number(document.getElementById("adding").value);
  if (state == "add") {
    let newStock = productList[i].stock + amount

    productList[i].stock = newStock


    state = "remove"
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);

  }
  else {

    let newStock = productList[i].stock - amount

    productList[i].stock = newStock
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);

  }
  document.getElementById("stocknumber").innerHTML =
    `<td id="stocknumber">
            <Button class="px-2 py-1 text-centerborder-0 btn btn-success"  onclick = "addItem(${i})" id="addToStock">+</Button>
            ${productList[i].Stock}       
            <button class="px-2 py-1 text-centerborder-0 btn btn-danger" onclick = "addItem(${i})" id="RemoveFromStock">-</button>
            </td>
            `
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProducts(productList);

}

function displayProducts(productList) {
  var bbox = ""
  for (let i = 0; i < productList.length; i++) {
    bbox +=
      `<tr class="text-center">
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td id="stocknumber"> 
      <Button class="px-2 py-1 text-centerborder-0 btn btn-success" onclick="addbtnsForAdding(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal"  id="addToStock">+</Button>
      ${productList[i].stock}       
      <button class="px-2 py-1 text-centerborder-0 btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addbtns(${i})" id="RemoveFromStock">-</button>
      </td>
      <td><button class="btn btn-warning"  onclick = "update(${i})" >Update</button></td>
      <td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delexampleModal" onclick = "Delete(${productList[i].ID})"  >Delete</button></td>
  </tr>
  `
  }
  document.getElementById("productData").innerHTML = bbox
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
  productStock.value = ""
}
// localStorage.setItem("us", "jh")

function Delete(i) {
  let msg = `<h4>are you sure you want to delete this product ??</h4>`
  let btn = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel </button>
  <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick = " confirmDelete(${i})">delete</button>
  `
  document.getElementById("delmodalBody").innerHTML = msg
  document.getElementById("delmodalbtn").innerHTML = btn
}



function confirmDelete(index) {

  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProducts(productList);
}

function update(i) {
  addBtn.classList.replace("btn-primary", "btn-warning")

  productName.value = productList[i].name
  productPrice.value = productList[i].price
  productCat.value = productList[i].category
  productDesc.value = productList[i].desc
  productStock.value = productList[i].stock
  addBtn.innerHTML = "Update Product"
  addOrUpdate = "update"
  tmp = i
  scroll({
    top: 0,
    behavior: "smooth",
  })
  productName.focus()

}



function search(value, id) {
  found = ``
  if (id == "byName") {
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].name.includes(value)) {

        found +=
          `<tr class="text-center">
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td id="stocknumber"> 
      <Button class="px-2 py-1 text-centerborder-0 btn btn-success" onclick="addbtnsForAdding(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal"  id="addToStock">+</Button>
      ${productList[i].stock}       
      <button class="px-2 py-1 text-centerborder-0 btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addbtns(${i})" id="RemoveFromStock">-</button>
      </td>
      <td><button class="btn btn-warning"  onclick = "update(${i})" >Update</button></td>
      <td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delexampleModal" onclick = "Delete(${productList[i].ID})"  >Delete</button></td>
  </tr>
  `
      }
    }

  }
  else {
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].category.includes(value)) {

        found +=
          `<tr class="text-center">
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td id="stocknumber"> 
      <Button class="px-2 py-1 text-centerborder-0 btn btn-success" onclick="addbtnsForAdding(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal"  id="addToStock">+</Button>
      ${productList[i].stock}       
      <button class="px-2 py-1 text-centerborder-0 btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addbtns(${i})" id="RemoveFromStock">-</button>
      </td>
      <td><button class="btn btn-warning"  onclick = "update(${i})" >Update</button></td>
      <td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delexampleModal" onclick = "Delete(${productList[i].ID})"  >Delete</button></td>
  </tr>
  `
      }
    }


  }
  document.getElementById("productData").innerHTML = found

}


function productNameValidation() {

  let productNameErrorMsg = document.getElementById("productNameErrorMsg")
  if (productName.value != "") {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    productNameErrorMsg.classList.replace("d-block", "d-none");

    return true
  }
  else {

    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productNameErrorMsg.classList.replace("d-none", "d-block");
    setTimeout(() => {
      productNameErrorMsg.classList.replace("d-block", "d-none")
    }, 3000);


    return false
  }
}

function productPriceValidation() {

  let productPriceErrorMsg = document.getElementById("productPriceErrorMsg")
  if (productPrice.value != "") {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    productPriceErrorMsg.classList.replace("d-block", "d-none");
    return true
  }
  else {

    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    productPriceErrorMsg.classList.replace("d-none", "d-block");
    setTimeout(() => {
      productPriceErrorMsg.classList.replace("d-block", "d-none")
    }, 3000);


    return false
  }
}

function productCategoryValidation() {

  let productCatErrorMsg = document.getElementById("productCatErrorMsg")
  if (productCat.value != "") {
    productCat.classList.add("is-valid");
    productCat.classList.remove("is-invalid");
    productCatErrorMsg.classList.replace("d-block", "d-none");
    return true
  }
  else {

    productCat.classList.add("is-invalid");
    productCat.classList.remove("is-valid");
    productCatErrorMsg.classList.replace("d-none", "d-block");
    setTimeout(() => {
      productCatErrorMsg.classList.replace("d-block", "d-none")
    }, 3000);
    return false
  }
}
function productdescValidation() {

  let productDescErrorMsg = document.getElementById("productDescErrorMsg")
  if (productDesc.value != "") {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    productDescErrorMsg.classList.replace("d-block", "d-none");
    return true
  }
  else {

    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    productDescErrorMsg.classList.replace("d-none", "d-block");
    setTimeout(() => {
      productDescErrorMsg.classList.replace("d-block", "d-none")
    }, 3000);

    return false
  }
}
function productstockValidation() {

  let productStockErrorMsg = document.getElementById("productStockErrorMsg")
  if (productStock.value != "") {
    productStock.classList.add("is-valid");
    productStock.classList.remove("is-invalid");
    productStockErrorMsg.classList.replace("d-block", "d-none");
    return true
  }
  else {

    productStock.classList.add("is-invalid");
    productStock.classList.remove("is-valid");
    productStockErrorMsg.classList.replace("d-none", "d-block");
    setTimeout(() => {
      productStockErrorMsg.classList.replace("d-block", "d-none")
    }, 3000);

    return false
  }
}

function validation() {
  productNameValidation()
  productPriceValidation()
  productCategoryValidation()
  productdescValidation()
  productstockValidation()
  if (productNameValidation() == true && productPriceValidation() == true && productCategoryValidation() == true && productdescValidation() == true && productstockValidation() == true) {
    return true
  } else {
    return false
  }
}
