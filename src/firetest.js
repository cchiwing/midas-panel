'use strict'

function Firetest() {
  // = = = DOM Shortcuts
  this.clientTable = document.getElementById('client-list');
  this.deleteClientBtn = document.getElementById('delete-client');
  this.addClientBtn = document.getElementById('add-client');
  this.testBtn = document.getElementById('test-button');
  this.addClientModal = document.getElementById('add-client-modal');
  this.closeModalBtn = document.getElementsByClassName('cancel')[0];

  // = = = Event
  this.addClientBtn.addEventListener('click',this.saveClient.bind(this));
  this.testBtn.addEventListener('click', this.showModal.bind(this));
  this.closeModalBtn.addEventListener('click', this.hideModal.bind(this));

  this.loadClient();
};

/*
 ██████  ██████  ███    ██ ████████ ██████   ██████  ██      ██      ███████ ██████
██      ██    ██ ████   ██    ██    ██   ██ ██    ██ ██      ██      ██      ██   ██
██      ██    ██ ██ ██  ██    ██    ██████  ██    ██ ██      ██      █████   ██████
██      ██    ██ ██  ██ ██    ██    ██   ██ ██    ██ ██      ██      ██      ██   ██
 ██████  ██████  ██   ████    ██    ██   ██  ██████  ███████ ███████ ███████ ██   ██
*/

//=================================================================
// CLIENT =========================================================
//=================================================================

Firetest.CLIENT_CELL_TEMPLATE =
    '<td class="name"></td>'+
    '<td class="tel"></td>'+
    '<td class="addr"></td>'+
    '<td><button class="btn btn-default" id="delete-client">Delete</button></td>';

Firetest.prototype.displayClient = function(id, data, tamplate) {
  var row = document.getElementById(id);
  if(!row){
    var row = this.clientTable.insertRow(0);
    row.innerHTML = tamplate;
    row.setAttribute('id', id);
    row.querySelector('#delete-client').addEventListener('click',this.removeClient.bind(this));
  }
  for(var key in data){
    row.querySelector('.'+key).textContent = data[key];
  }
};

Firetest.prototype.showModal = function() {
  this.addClientModal.style.display = "block";
};

Firetest.prototype.hideModal = function() {
  this.addClientModal.style.display = "none";
};

/*
███    ███  ██████  ██████  ███████ ██
████  ████ ██    ██ ██   ██ ██      ██
██ ████ ██ ██    ██ ██   ██ █████   ██
██  ██  ██ ██    ██ ██   ██ ██      ██
██      ██  ██████  ██████  ███████ ███████
*/

// Firetest.prototype.loadOrders = function() {
//   //  = = = load orders
//   this.ordersRef = firebase.database().ref().child("order");
//   this.ordersRef.on("child_added", snap => {
//     // TODO load order data
//     console.log(JSON.stringify(snap));
//   });
// };

Firetest.prototype.loadClient = function(){
  // = = =  load client
  this.clientRef = firebase.database().ref().child("client");

  var setClient = function(snap) {
    console.log(snap.key + ': ', snap.toJSON());
    var val = snap.val();
    this.displayClient(snap.key, val, Firetest.CLIENT_CELL_TEMPLATE);
  }.bind(this);

  var delClient = function(snap) {
    console.log(snap.key + ': ', snap.toJSON());
    var tr = document.getElementById(snap.key);
    tr.parentNode.removeChild(tr);
  }.bind(this);

  this.clientRef.on("child_added", setClient);
  this.clientRef.on("child_changed", setClient);
  this.clientRef.on("child_removed", delClient);
};

Firetest.prototype.saveClient = function(e) {
  // e.prevrntDefault();
  var newPostRef = firebase.database().ref().child('client').push();
  newPostRef.update({
    name: "ClientName-" + Math.floor(Math.random()*100),
    tel: "56785678",
    addr:"建發街 新興大廈"
  }, function(error){
    if(error){
      console.log('Error updating data:', error);
    }
  });
};

Firetest.prototype.removeClient = function(e) {
  // console.log(JSON.stringify(e.target.parentNode.parentNode.id));
  var key = e.target.closest("tr").id;
  console.log(key);
  firebase.database().ref().child('client/' + key)
  .remove()
  .then( () => console.log("Remove succeeded."))
  .catch(error => console.log("Remove failed: ", error.message));
};

Firetest.prototype.saveData = function(child, data){

// = = =  save orders
// firebase.database().ref().child('orders').push({
//   id: "2015090201",
//   timestamp:"1517821689",
//   total_price: "100",
//   client_key:"-L4ZxlL2iqBk_R2zfsj4",
//   client_name:"chan tai man",
//   client_tel:"33334444",
//   item:{
//     p1: {name:"aaa",qty:"5",unitprice:"10",is_ready:false},
//     p2: {name:"bbb",qty:"10",unitprice:"5",is_ready:false}
//   },
//   remark:"This is a remark."
//   });

//  = = = save products
  // firebase.database().ref().child('products').push({
  //   name:"The Fish Tank"
  //   price:"1000",
  //   stock:"3"
  // });
};


/*
 ██████  ███    ██ ██       ██████   █████  ██████
██    ██ ████   ██ ██      ██    ██ ██   ██ ██   ██
██    ██ ██ ██  ██ ██      ██    ██ ███████ ██   ██
██    ██ ██  ██ ██ ██      ██    ██ ██   ██ ██   ██
 ██████  ██   ████ ███████  ██████  ██   ██ ██████
*/
window.onload = function(){
  if(window.firetest){
    console.log('firetest has excit.')
  }else{
    console.log('new firetest created.')
    window.firetest = new Firetest();
  }
};
