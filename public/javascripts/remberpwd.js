/// <reference path="../../typings/index.d.ts" />
$("#rempwd").click(function(){
    if($("#rempwd").prop('checked')){
        alert("正在设置cookie");
        setCookie("account",$("#account").val(),7);
        setCookie("pwd",$("#password").val(),7);
    }else{
        alert("正在取消cookie");
        delCookie("account");
        delCookie("pwd");
    }
})