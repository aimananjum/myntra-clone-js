let bagItemObjects;
let itemIdWiseQty = {};
let newbagItemObject=[];
onLoad();

function onLoad(){
    setItemIdWiseQty();
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function setItemIdWiseQty() {
    bagItems.forEach(ele => {
        if (itemIdWiseQty[ele]) {
            itemIdWiseQty[ele] += 1;
        } else {
            itemIdWiseQty[ele] = 1;
        }
    });

    //console.log(itemIdWiseQty);
}

function loadBagItemObjects(){
    newbagItemObject = [];
    console.log(newbagItemObject);
    Object.keys(itemIdWiseQty).forEach(function(key, index) {
        for(let i=0;i<items.length;i++){
            if(parseInt( key) == parseInt(items[i].id)){
                items[i].quantity = itemIdWiseQty[key]
                newbagItemObject.push(items[i]);
            }
        }
    });

    console.log(newbagItemObject);
}

function displayBagItems() {
    let bagItemsContainer = document.querySelector(".bag-items-container");
    let innerHtml='';
    newbagItemObject.forEach(item => {
        innerHtml += generateItemHTML(item);
    });
    bagItemsContainer.innerHTML=innerHtml;
}
function removeFromBag(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId!=itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    itemIdWiseQty=[];
    setItemIdWiseQty();
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
}


function generateItemHTML(item){

    return `
    <div class="bag-item-container">
    <div class="item-left-part">
    <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="item-quantity">

    </div>
    <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
    </div>
    <div>
        <span>Qty</span>
        <select id=text>
            <option>${item.quantity}</option>
        
        </select>

        <span>Rs ${item.quantity * item.current_price}</span>
    </div>

    <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
    </div>
    <div class="remove-from-cart" onclick = "removeFromBag(${item.id})" >X</div>
    </div>`
}


function displayBagSummary(){
    let bagSummary = document.querySelector(".bag-summary");

    let totalMRP=0;
    let discountOnMRP = 0;

    newbagItemObject.forEach(item => {
        totalMRP+=(item.quantity * item.original_price);
        discountOnMRP += ((item.original_price - item.current_price)*item.quantity );
    });
    

    let totalAmount = (totalMRP - discountOnMRP ) + 99;
    bagSummary.innerHTML  = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${discountOnMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${totalAmount}</span>
    </div>
    </div>
    <button class="btn-place-order">
       <div class="css-xjhrni">PLACE ORDER</div>
    </button>`;
}