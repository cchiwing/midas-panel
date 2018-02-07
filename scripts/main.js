'use strict';

function MidasPanel() {
    this.checkSetup();

    // Shortcuts to DOM Elements.
    this.userName = document.getElementById('user-name');
    this.signInBtn = document.getElementById('sign-in');
    this.signOutBtn = document.getElementById('sign-out');
    this.signInSnackbar = document.getElementById('must-signin-snackbar');
    this.drawerNav = document.getElementById('drawer-nav');
    this.loginDialog = document.getElementById('login-dialog');

    // Event Listeners
    // this.signOutBtn.addEventListener('click', this.signOut.bind(this));
    this.signInBtn.addEventListener('click', this.signIn.bind(this));

    this.registerServiceWorker();
    this.initFirebase();
};

MidasPanel.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

MidasPanel.prototype.registerServiceWorker = function() {
  if('serviceWorker' in navigator) {
    if(navigator.serviceWorker.controller) {
      console.log('[SW] active service worker found, no need to register')
    } else {
      navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[SW] Registered, with scope: ', reg.scope))
      .catch(err => console.log('[SW] Fail to install: ', err));
    }
  }else{
    console.log('[SW] No Service Worker in this navigator.');
  }
};

MidasPanel.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in
    // Get profile info and display
    this.userName.textContent = user.displayName;
    this.userName.removeAttribute('hidden');
    this.signOutBtn.removeAttribute('hidden');
    this.drawerNav.removeAttribute('hidden');
    this.loginDialog.close();

    // Hide sign-in button
    this.signInBtn.setAttribute('hidden', 'true');
  }else { // User is signed out
    // Hide user's info and sign-out button
    this.userName.setAttribute('hidden', 'true');
    this.signOutBtn.setAttribute('hidden', 'true');
    this.drawerNav.setAttribute('hidden', 'true');
    this.loginDialog.showModal();

    // Show sign-in button
    this.signInBtn.removeAttribute('hidden');
  }
};

MidasPanel.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

MidasPanel.prototype.signOut = function() {
  location.reload();
  this.auth.signOut();
};

MidasPanel.prototype.loadOrders = function() {
  this.ordersRef = this.database.ref('orders');
  this.ordersRef.off();
};

MidasPanel.prototype.saveClient = function(e) {
  e.prevrntDefault();

};

MidasPanel.prototype.checkSetup = function() {
    if(!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('check: firebase sdk, runing using "firebase serve"?');
    };
};

window.onload = function() {
    window.midasPanel = new MidasPanel();
};
