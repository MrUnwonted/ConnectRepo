decimalSeperator = decimalPointType == 'COMMA' ? ',' : '.';
thousandsSeperator = thousandsPointType == 'COMMA' ? ',' : '.';

$(document).ready(function() {
    console.log("Here")
    $(".linkMinus").on("click", function(evt) {
        evt.preventDefault();
        descreaseQuantity($(this));

    });

    $(".linkPlus").on("click", function(evt) {
        evt.preventDefault();
        increaseQuantity($(this));
    });

    $(".link-remove").on("click", function(evt) {
        evt.preventDefault();
        removeProduct( $(this));

    });
});

function descreaseQuantity(link){
    productId = link.attr("pid");
    quantityInput = $("#quantity" + productId);
    newQuantity = parseInt(quantityInput.val()) - 1;

    if (newQuantity > 0) {
        quantityInput.val(newQuantity);
        updateQuantity(productId, newQuantity)
    } else {
        showWarningModal('Minimum quantity is 1');
    }
}

function increaseQuantity(link){
    productId = link.attr("pid");
    quantityInput = $("#quantity" + productId);
    newQuantity = parseInt(quantityInput.val()) + 1;

    if (newQuantity <= 5) {
        quantityInput.val(newQuantity);
        updateQuantity(productId, newQuantity)
    } else {
        showWarningModal('Maximum quantity is 5');
    }
}

function updateQuantity(productId, quantity){
    url = contextPath + "cart/update/" + productId + "/" + quantity;

    $.ajax({
        type: "POST",
        url: url,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeaderName, csrfValue);
        }
    }).done(function(updatedSubTotal) {
        updateSubTotal(updatedSubTotal, productId);
        updateTotal();
    }).fail(function() {
        showErrorModal("Error while updating product to shopping cart.");
    });
}

function updateSubTotal(updatedSubTotal, productId){
    $("#subtotal" + productId).text(formatCurrency(updatedSubTotal))
}

function updateTotal(){
    total = 0.0;
    productCount = 0;

    $(".subtotal").each(function (index, element){
        productCount++;
        total += parseFloat(clearCurrencyFormat(element.innerHTML));
    });

    if (productCount < 1){
        showEmptyShoppingCart();
    }else{
        $("#estimatedTotal").text(formatCurrency(total));
    }
}

function showEmptyShoppingCart(){
    $("#sectionTotal").hide();
    $("#sectionEmptyCartMessage").removeClass('d-none')
}

function removeProduct(link){
    url = link.attr("href");

    $.ajax({
        type: "DELETE",
        url: url,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeaderName, csrfValue);
        }
    }).done(function(response) {
        rowNumber= link.attr("rowNumber");
        removeProductHTML(rowNumber);
        updateTotal();
        showModalDialog("Cart", response);
    }).fail(function() {
        showErrorModal("Error while removing product to shopping cart.");
    });
}

function removeProductHTML(rowNumber){
    $("#row"+ rowNumber).remove();
}

function formatCurrency(amount){
    return $.number(amount, decimalDigit, decimalSeperator, thousandsSeperator);
}

function clearCurrencyFormat(numberString){
    result = numberString.replaceAll(thousandsSeperator, "");
    return result.replaceAll(decimalSeperator, ".");
}