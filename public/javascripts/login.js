
$(document).ready(function () {
    if (getCookie("account") != "" && getCookie("pwd") != "") {
        alert("检测到cookie存在 自动填充");
        $("#account").val(getCookie("account"));
        $("#password").val(getCookie("pwd"));
    }
    $("#login").click(function () {
        $.post("http://localhost:3000/login",
            {
                account: $("#account").val(),
                password: md5($("#password").val())
            },
            function (data, status) {
                if ((JSON.parse(data)).status) {
                    location.href = "http://localhost:3000/html/user.html";
                } else {
                    $("#iflogin").text("账号或密码不正确");
                    alert("账号或密码不正确");
                }
            });
    });
    $("#register").click(function () {
        window.open("/html/register.html");
    });
    $("#rempwd").click(function () {
        if ($("#rempwd").prop('checked')) {
            alert("正在设置cookie");
            setCookie("account", $("#account").val(), 7);
            setCookie("pwd", $("#password").val(), 7);
        } else {
            alert("正在取消cookie");
            delCookie("account");
            delCookie("pwd");
        }
    });
});