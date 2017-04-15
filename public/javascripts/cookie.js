function setCookie(c_name, value, exdateiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdateiredays);
    document.cookie = c_name + "=" + escape(value) + ((exdateiredays == null) ? "" : ";exdateires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function delCookie(c_name) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null)
        document.cookie = c_name + "=" + escape(cval) + ";exdateires=" + exdate.toGMTString();
}