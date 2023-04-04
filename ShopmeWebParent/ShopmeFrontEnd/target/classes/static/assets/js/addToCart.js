$(document).ready(function (){
    $("#buttonAdd2Cart").on('click', function (evt){
        addToCart();
    })
})

function addToCart() {
    quantity = $("#quantity" + productId).val();
    url = contextPath + "cart/add/" + productId + "/" + quantity;

    if (quantity > quantityStock){
        error("Insufficient Stock");
        return;
    }

    $.ajax({
        type: "POST",
        url: url,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeaderName, csrfValue);
        }
    }).done(function(response) {

        if (response.includes('Could not add')){
            info(response);
        }else {
            success(response);
        }
    }).fail(function() {
        error("Error while adding product to shopping cart.");
    });
}