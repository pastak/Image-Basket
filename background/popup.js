(function(){
  var formater = function(mode, url, title){
    var formats = {
      url: url,
      markdown: '![' + title + '](' + url + ')',
      html: '<img src="' + url + '" />'
    };
    if(mode in formats){
      return formats[mode];
    }
  }
  var imageClickHandler = function(){
    if($(this).is('.selected')){
      var url = $(this).data('url');
      var title = $(this).data('title');
      var mode  = $('#modeSelector').val();
      var text = formater(mode, url, title);
      $(this).removeClass('selected');
      var textArea = $('<textarea>').prop('value', text).css({width: '1px'});
      $('body').append(textArea);
      textArea.select();
      document.execCommand('copy');
      $(textArea).remove();
      chrome.runtime.sendMessage(chrome.runtime.id, {action: 'copyNotification', imageUrl: url}, function(){
        window.close();
      });
    }else{
      $('#imageList img.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  };
  chrome.storage.sync.get('images', function(items){
    (items.images).forEach(function(item){
      var imageDiv = $('<div>').css({float: 'left',width: '200px'});
      var imageTitle = $('<span>').text(item.title).css({margin: 'auto', width: 'auto'});
      var imageElm = $('<img>').prop('src', item.url).data('url', item.url).data('title', item.title).on('click', imageClickHandler);
      imageDiv.append(imageElm).append('<br />').append(imageTitle);
      $('#imageList').append(imageDiv);
    });
  });
})()
