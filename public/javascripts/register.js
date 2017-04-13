/// <reference path="../../typings/index.d.ts" />
$(document).ready(function () {
    $("#register").click(function () {
        $.post("http://localhost:3000/register",
            {
                account: $("#account").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                phonenumber: $("#phonenumber").val()
            },
            function (data, status) {

                if ((JSON.parse(data)).status) {
                    var answer = confirm(" 注册成功！是否跳转到登录界面？");
                    if (answer) {
                        location.href = "http://localhost:3000/";
                    }
                }
            })
    })
})