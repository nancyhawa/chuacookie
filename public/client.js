// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  // setTimeout(function(){
  //   $('#rotating-gallery').css('visibility', 'visible')
  // }, 800)
  
  $('#rotating-gallery').animate({
    opacity: 1
  }, 4000)
  
  $('#contact-form').submit(function(e){
    e.preventDefault();
    var formData = convertFormToJSON('#contact-form')
    $.post('/contact', formData, function(data) {
      if (data.error) {
        $('#email-success').hide()
        return $('#email-error').show();
      }
      
      if (data.info) {
        $('#email-success').show()
        return $('#email-error').hide();
        $('#contact-form').reset();
      }
      
    })
  })
  
  
  $('#quote-form').submit(function(e){
    e.preventDefault();
    var formData = $('#quote-form').serialize();
    $.post('/quote', formData, function(data) {
      if (data.error) {
        $('#quote-success').hide()
        return $('#quote-error').show();
      }
      
      if (data.info) {
        $('#quote-success').show()
        return $('#quote-error').hide();
        $('#quote-form').reset()  
      }
    })
  })
  
  function convertFormToJSON(form){
    var array = $(form).serializeArray();
    var json = {};
    
    $.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
}

});

window.onerror = function(messageOrEvent, source, lineno, colno, error) {
  console.log(messageOrEvent, source, lineno, colno, error)
}