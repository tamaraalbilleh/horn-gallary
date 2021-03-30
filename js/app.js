'use strict';
// variables //
let all = [];
let keys = [];
let keyArray = [];
let dataArray=[];
let button1 = $('#page1');
let button2 = $('#page2');
// importing the data from page-1.json file //

button1.click(function (){
  // emptyList();
  $('main').empty();

  $.ajax ('./data/page-1.json').then (data =>{
    dataArray = data;
    dataArray.forEach(item => {
      let card = new Card (item.title, item.image_url, item.description, item.keyword, item.horns);
      
      card.mustacheRender();
      card.handlerFilter ();
      // card.renderCards();


    });


    selection();
    // emptyList();

  });
});
button2.click(function () {
  // emptyList();
  $('main').empty();

  $.ajax ('./data/page-2.json').then (data =>{
    dataArray = data;
    dataArray.forEach(item => {
      let card = new Card (item.title, item.image_url, item.description, item.keyword, item.horns);
      card.handlerFilter ();
      card.mustacheRender();
    });


    selection();
    // emptyList();
  });
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

// lab 02 // ------------------------------------------------------------------------------
// the prototype for rendering the default view with all the cards //
// Card.prototype.renderCards = function (){
//   let templateCloneElement =$('#photo-template').first ().clone(); // cloning the template //
//   $('main').append (templateCloneElement); // appending the cloned item into the parent node //

//   templateCloneElement.find ('h2').text (this.title);
//   templateCloneElement.find ('img').attr ('src',this.img); // to show imgs //
//   templateCloneElement.find ('p').text (this.description);
//   templateCloneElement.attr ('class',this.key);
//   $('#photo-template').removeAttr('id');
// };

// -------------------------------------------------------------------------------------------



// making the drop down list rendering function and invoking it //
let selection = function () {
  keyArray=[];


  keys.forEach(item=>{
    if (! keyArray.includes (item)){
      keyArray.push (item);
    }
  });

  keyArray.forEach(val=> {
    let optionCloneElement =$('option').first().clone();
    $('#filter').append(optionCloneElement);
    optionCloneElement.val(val);
    optionCloneElement.text(val);
  });

};




// when an item is selected from the drop down list //
let handlerSelection = function (){
  $('#filter').change(function(){
    if ($('section').attr ('class')!== $(this).val ()){
      $(`section`).fadeOut (500);
      $(`.${$(this).val()}`).fadeIn (1000);
    }
    if ($(this).val () === 'default'){
      $(`section`).fadeIn (1000);
    }
    if ($(this).val () === 'narwhal'){ // these four variations were because they didn't work with the above 2 if statements //
      $(`section`).fadeOut (500);
      $('.narwhal').fadeIn (1000);
    }
    if ($(this).val () === 'rhino'){
      $(`section`).fadeOut (500);
      $('.rhino').fadeIn (1000);
    }
    if ($(this).val () === 'horn'){
      $(`section`).fadeOut (500);
      $('.horn').fadeIn (1000);
    }
    if ($(this).val () === 'jackalope'){
      $(`section`).fadeOut (500);
      $('.jackalope').fadeIn (1000);
    }
  });
};
handlerSelection();



// lab 03 // ------------------------------------------------------------------------------

Card.prototype.mustacheRender = function () {
  let template = $('#cloneTemplate').html ();

  let dataRender = Mustache.render (template,this);
  $('main').append (dataRender);
};
// let list = [];
// let emptyList = function (){

//   let parent = document.querySelector('select');
//   keys.forEach (val =>{
//     let child = document.querySelector(`.${val}`);
//     if (parent.contains(child)) {
//       console.log ('contains');
//     }else {
//       child.remove();
//     }
//   });



// };


$( '#page1' ).trigger( 'click' );

Card.prototype.handlerFilter= function (){
  
  $('#sort').change (function (){
    if ($(this).val() === 'title'){
      all.sort (function (a,b){
        if ( a.title.toUpperCase() < b.title.toUpperCase() ){
          console.log ('hi from inside');
          return 1;

        }
        if ( a.title.toUpperCase() > b.title.toUpperCase() ){
          return -1;
        }
        else {
          return 0;
        }
      });

      console.log ('inside',all);
    }else if ($(this).val() === 'horn'){
      all.sort (function (a,b){
        if (a.horns<b.horns){
          return -1;
        }
        if (a.horns>b.horns){
          return 1;
        }
        else {
          return 0;
        }
      });
      // console.log ('from horns',all);

      return all;

    }
  });

};

