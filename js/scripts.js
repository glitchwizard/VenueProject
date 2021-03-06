// Business Logic
function Band(bandName, addMainContactFirstName, addMainContactLastName, email, phone) {
  this.BandName = bandName; // What's the name of the band?
  this.BandMainContactFirstName = addMainContactFirstName; // What's the band's main contacts first name?
  this.BandMainContactLastName = addMainContactLastName; // "                                " last name?
  this.BandEmail = email; // what's the band's email? (not the main contact, though it may be the same)
  this.BandPhone = phone; // what's the main contact's phone number?
};

function Show(showDate) {
  this.DoorIncomeTotal = 0; // how much total income from ticket sales/door sales?
  this.BarIncomeTotal = 0; // how much total income from the Bar
  this.ShowDate = showDate; // what is the date the show will happen?
  this.BandList = []; // this is the list of bands that will be on the show
  this.ShowType; // is it a guaranteed payout, or a split between the house and bands?
  this.BandSplit = []; // An array representing the split for each band.
  this.showIncomeTotal = 0; // this is the sum of all income the show made (Bar and Door)
  this.totalNumberOfBandsInShow = this.BandList.length;
}

var settledShowList = []; // this is the list of shows that have been settled, each item in the array should be a Show object.
var bands = []; // This is the overall list of bands that have been entered.

var addBand = function (addBandName, addMainContactFirstName, addMainContactLastName, addEmail, addPhone) {
  var newBand = new Band(addBandName, addMainContactFirstName, addMainContactLastName, addEmail, addPhone);
  return bands.push(newBand);
}; // this function will add new bands to the bands list

var addShow = function (date) {
  var newShow = new Show(date)
  return settledShowList.push(newShow);
}; // this function will add new shows to the settled show list

Show.prototype.NewShow = function () {
  // this will update a show that's been created
  return console.log("New Show prototype worked.");

};



var addBandToShow = function (band, date) {

}

var totalNumberOfBandsInAddressBook = 0;
var totalNumberOfShows = 0;

//UI Logic
$("Document").ready(function () {
  $("form#band-contact").submit(function (event) {
    event.preventDefault();
    var bandNameInput = $("input#new-band").val();
    var firstNameInput = $("input#contact-firstName").val();
    var lastNameInput = $("input#contact-lastName").val();
    var emailInput = $("input#contact-email").val();
    var phoneInput = $("input#contact-phone").val();
    addBand(bandNameInput, firstNameInput, lastNameInput, emailInput, phoneInput);

    showBands();

  });

  var showBands = function () { // this function will add the bands to the DOM
    $("#all-bands").empty();
    var totalNumberOfBandsInAddressBook = 0;

    bands.forEach(function (band) {
      $("#all-bands").append(
        '<div class="band-list">' + "<div class='row'>" + "<div class='col.md-2'>" +
        "<input type='checkbox' class='BandContactCheckbox' id='" +
        totalNumberOfBandsInAddressBook + "'></input></div>" +
        '<div class="col-md-10"><b>' + band.BandName + '</b><br>' +
        band.BandMainContactFirstName + ' ' +
        band.BandMainContactLastName + ', ' +
        band.BandEmail + ', ' +
        band.BandPhone +
        '</div>' + '</div>' + '</div>'
      );
      totalNumberOfBandsInAddressBook++;
    });
  }

  $('form#all-bands-form').click(function (event) { // this function will display the bands in the "Bands to Add" section dynamically with the checkboxes turned on or off
    $('span#bandListForShow').empty()
    var bandID;
    $("input:checkbox[class=BandContactCheckbox]:checked").each(function (index) {
      bandID = parseInt($(this).attr('id'));
      $('span#bandListForShow').append('<li>' + bands[bandID].BandName + " <label for='new-band'> - Amount: </label > <input type='number' class='bandSettleAmount' id='" + bandID + "'>" + '</li>');
    });
  });

  $("form#show-info").submit(function (event) { // this function will add a show to the array and DOM
    event.preventDefault();
    var showDateInput = $("input#show-date").val();
    var showType = $("input#show-type").val();

    addShow(showDateInput);

    $("input:checkbox[class=BandContactCheckbox]:checked").each(function () { // this function adds the bands to the Show object
      settledShowList[totalNumberOfShows].BandList.push(parseInt($(this).attr('id')));
    });

    $("input.bandSettleAmount").each(function () {
      settledShowList[totalNumberOfShows].BandSplit.push($(this).val());
    });

    settledShowList[totalNumberOfShows].ShowType = showType;



    displayShows();
    totalNumberOfShows++;  
  });

  var displayShows = function () {
    $("#all-shows").empty();
    settledShowList.forEach(function (show) {
      $("#all-shows").append(
        '<div>' + '<span id="all-shows">' +
        '<br>' + show.ShowDate + '</br><br>' +
        forEach(show.BandList){bands[$(this])} + ' ' +
        show.ShowType + ', ' +
        show.BandSplit + ', ' +
        show.showIncomeTotal +
        '</span>' +
        '</div>'
      );
    });
  };
});