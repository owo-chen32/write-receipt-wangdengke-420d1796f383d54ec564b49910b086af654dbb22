window.onload = function () {
    getRem(375, 95)
};
window.onresize = function () {
    getRem(375, 95)
};
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
}