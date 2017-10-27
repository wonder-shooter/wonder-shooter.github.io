"use strict";

import $ from 'jquery';
import 'bootstrap';
import 'jquery.easing';


function main(){
  // 点数表示
  var
    $tableObj = $("#scorestable"),
    $tableObjHead = $("#scorestable thead tr"),
    $tableObjBody = $("#scorestable tbody"),
    count = 3,
    scoreArray = [];
  // Table
  $.getJSON("/assets/js/score.json" , function(data) {
    for( var i=0; i < data.length; i++) {


      if( i === 0) {
        for( var n=0; n < count; n++) {
          var name = data[n].name;
          var arrayOfStrings = name.split('#');
          $tableObjHead.append($('<th>').attr('class',arrayOfStrings[0]).text(arrayOfStrings[0]));
        }
      }

      var name = data[i].name;
      var arrayOfStrings = name.split('#');
      var color = arrayOfStrings[0];
      var rowId = 'row' + arrayOfStrings[1];
      if( i%count === 0){
        $tableObjBody.append($('<tr>').attr('id', rowId));
        $('tr#' + rowId).append($('<td>').attr('scope','row').text(arrayOfStrings[1]));
      }
      $('tr#' + rowId).append($('<td>').attr('class', 'white').text(data[i].score));
    }
    // Top10表示
    data.sort(function(a,b){
      if(a.score > b.score) return -1;
      if(a.score < b.score) return 1;
      return 0;
    });
    for( var i=1; i <= 10; i++) {
      var name = data[i].name;
      var arrayOfStrings = name.split('#');
      var color = arrayOfStrings[0];
      $('#top10 thead').append($('<tr>').attr('id', 'rank' + i));
      $('tr#rank' + i).append($('<td>').text(i));
      $('tr#rank' + i).append($('<td>').attr('class', color).text(data[i].name));
      $('#rank' + i).append($('<td>').attr('class', 'white').text(data[i].score));
    }
  });
}

function newsAge(){
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
}

// ページのロードが終わった後の処理
$(window).on('load',function(){
  $('#js-loader').delay(300).fadeOut(400);
});

$(function(){
  setTimeout(function(){
    $('#js-loader').delay(300).fadeOut(400);
  }, 5000);
  main();
  newsAge();
});
