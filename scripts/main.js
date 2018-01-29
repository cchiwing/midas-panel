function MidasPanel() {
    this.checkSetup();
};

MidasPanel.prototype.checkSetup = function () {
    if(!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('check: firebase sdk, runing using "firebase serve"?');
    }
    window.alert("checked up");
};

window.onload = function() {
    window.midasPanel = new MidasPanel();
};