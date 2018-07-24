App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON('WineToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.WineToken = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.WineToken.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return;
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
      console.log(error);
    }

    var account = accounts[0];
    var receiver = "0x54Dd3DE3CAC40D585c237dA16A971655A2be2e59";
    var wine;

    App.contracts.WineToken.deployed().then(function(instance) {
      wine = instance;
      return wine.transfer(receiver, 100000000000000000000, {from: account});
    }).then(function(result) {
      return axios.post('https://localhost:3000/tx', {txid: result.tx});
    }).then(function(result) {
      return axios.post('https://localhost:3000/done');
    }).catch(function(err){
      console.log(err);
    })

  });
  }
};


//App.init();
$(function() {
  $(window).load(function() {
    App.init();
  });
});
