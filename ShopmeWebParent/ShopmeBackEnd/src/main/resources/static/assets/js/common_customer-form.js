contextPath = "[[@{/}]]";
var dropDownCountry;
var dataListState;
var fieldState;


$(document).ready(function (){
    dropDownCountry = $("#reg-country");
    dataListState = $("#listStates");
    fieldState = $("#reg-state");

    dropDownCountry.on("change", function (){
        loadStatesForCountry();
        fieldState.val("").focus();
    })

});

function loadStatesForCountry(){
    selectedCountry = $("#reg-country option:selected");
    countryId = selectedCountry.val();
    url = contextPath + "states/list_states_by_country/" + countryId;

    $.get(url, function (responseJSON){
        dataListState.empty();

        $.each(responseJSON, function (index, state){
            $("<option>").val(state.name).text(state.name).appendTo(dataListState);
        });
    }).fail(function (){
        showErrorModal("Could not connect to server");
    });
}

function checkPasswordMatch(confirmPassword){
    if (confirmPassword.value != $("#reg-pass").val()){
        confirmPassword.setCustomValidity("Password do not match!");
    }else{
        confirmPassword.setCustomValidity("");

    }
}