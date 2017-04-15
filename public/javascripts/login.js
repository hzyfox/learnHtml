$(document).ready(function () {
    $("#login").click(function () {
        $.post("http://localhost:3000/login",
            {
                account: $("#account").val(),
                password: md5($("#password").val())
            },
            function (data, status) {
                if((JSON.parse(data)).status){
                    location.href="http://localhost:3000/html/user.html";
                }else{
                    $("#iflogin").text("账号或密码不正确");
                    alert("账号或密码不正确");
                }
            });
    });
    $("#register").click(function () {
        window.open("/html/register.html");
    });
});