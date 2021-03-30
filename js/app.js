'use strict';
// variables //
let all = [];
let keys = [];
let keyArray = [];
// importing the data from page-1.json file //
$.ajax ('./data/page-1.json').then (data =>{
  let dataArray = data;
  dataArray.forEach(item => {
    let card = new Card (item.title, item.image_url, item.description, item.keyword, item.horns);
    card.renderCards();
  });
  $('section:nth-of-type(1)').remove(); // removing the template //



  selection();
});

// constructor function //
function Card (title,img,description,key,horns){
  this.title = title;
  this.img = img;
  this.description = description;
  this.key = key;
  this.horns= horns;
  all.push (this);
  keys.push (this.key);
}
// the prototype for rendering the default view with all the cards //
Card.prototype.renderCards = function (){
  let templateCloneElement =$('#photo-template').first ().clone(); // cloning the template //
  $('main').append (templateCloneElement); // appending the cloned item into the parent node //

  templateCloneElement.find ('h2').text (this.title);
  templateCloneElement.find ('img').attr ('src',this.img); // to show imgs //
  templateCloneElement.find ('p').text (this.description);
  templateCloneElement.attr ('class',this.key);
  $('#photo-template').removeAttr('id');
};





// making the drop down list rendering function and invoking it //
let selection = function () {
  console.log (keys);
  keys.forEach(item=>{
    if (! keyArray.includes (item)){
      keyArray.push (item);
    }
  });
  console.log ('list', keyArray);

  keyArray.forEach(val=> {
    let optionCloneElement =$('option').first().clone();
    $('select').append(optionCloneElement);
    optionCloneElement.val(val);
    optionCloneElement.text(val);
  });

};




// when an item is selected from the drop down list //
let handlerSelection = function (){
  $('select').change(function(){
    if ($('section').attr ('class')!== $(this).val ()){
      $(`section`).fadeOut (500);
      $(`.${$(this).val ()}`).fadeIn (1000);
    }
    if ($(this).val () === 'default'){
      $(`section`).fadeIn (1000);
    }
    if ($(this).val () === 'narwhal'){
      $(`section`).fadeOut (500);
      $('.narwhal').fadeIn (1000);
    }
  });
};
handlerSelection();
