console.log("hello query");
$(document).ready(function () {
    $("#login").click(function () {
        $.post("http://localhost:3000/login",
            {
                account: $("#account").val(),
                password: $("#password").val()
            },
            function (data, status) {
                $("#iflogin").text(data);
            });
    });
    $("#register").click(function () {
        window.open("/html/register.html");
    });
});