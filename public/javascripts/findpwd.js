/// <reference path="../../typings/index.d.ts" />
var ifexist = true;
var ifdiff = true;
$(document).ready(function () {
    $("#account").blur(function () {
        $.post("http://localhost:3000/register_verify",
            {
                account: $("#account").val()
            },
            function (data, status) {
                console.log("进入到回调");
                ifregister = true;
                $("#ifregister").text("");
                if (!data.status) {
                    ifregister = false;
                    $("#ifregister").text("账号不存在");
                }
            }
        )
    });
    $("#newpwd").blur(function () {
        $("#ifempty").text("");
        if ($("#newpwd").val() == "") {
            $("#ifempty").text("密码不能为空");
        }
    });
    $("#verifypwd").blur(function () {
        $("#ifdiff").text("");
        ifdiff = true;
        if ($("#newpwd").val() != $("#verifypwd").val()) {
            $("#ifdiff").text("密码不一致！");
            ifdiff = false;
        }
    })
    $("#submit").click(function () {
        if (!ifdiff) {
            alert("两次输入密码不一致，请确认！");
        } else {
            if (!ifregister) {
                alert("输入的账号不存在，请确认！");
            } else {
                $.post("http://localhost:3000/changepwd",
                    {
                        account: $("#account").val(),
                        originpwd: md5($("#originpwd").val()),
                        newpwd: md5($("#newpwd").val())
                    },
                    function (data, status) {
                        if(data.status){
                            var answer = window.confirm("密码修改成功,是否跳转到登录界面");
                            if(answer){
                                location.href = "http://localhost:3000";
                            }
                        }else{
                            alert("密码修改失败，原密码错误！");
                        }
                    })
            }
        }

    })

})