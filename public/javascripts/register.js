/// <reference path="../../typings/index.d.ts" />
var ifregister = false;
$(document).ready(function () {
    $("#account").blur(function () {
        $.post("http://localhost:3000/register_verify",
            {
                account: $("#account").val()
            },
            function (data, status) {
                console.log("进入到回调");
                ifregister = false;
                $("#ifregister").text("");
                if (data.status) {
                    ifregister = true;
                    $("#ifregister").text("账号已被注册");
                    alter("该账号已被注册！");
                }
            }
        )
    });
    $("#register").click(function () {
        if (!ifregister) {
            $.post("http://localhost:3000/register",
                {
                    account: $("#account").val(),
                    password: md5($("#password").val()),
                    email: $("#email").val(),
                    phonenumber: $("#phonenumber").val()
                },
                function (data, status) {
                    console.log(data);
                    if ((JSON.parse(data)).status) {
                        var answer = confirm(" 注册成功！是否跳转到登录界面？");
                        if (answer) {
                            location.href = "http://localhost:3000/";
                        }
                    }
                })
        } else {

        }
    })
})