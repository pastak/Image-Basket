function onClickHandler(info, tab){
  if(info.menuItemId === "saveBasket"){
    var imageUrl = info.srcUrl;
    var title = window.prompt('set this image\'s title');
    if(title){
      chrome.storage.sync.get('images', function(items){
        var newItems = items;
        newItems.images = newItems.images || [];
        newItems.images.push({
          url: imageUrl,
          title: title
        });
        chrome.storage.sync.set(newItems, function(){
          var notificationId = 'IB_'+Date.now();
          chrome.notifications.create(notificationId, {
            type: 'basic',
            title: 'Success saving',
            message: '',
            imageUrl: imageUrl
          }, function(){
            setTimeout(function(){
              chrome.notifications.clear(notificationId, function(){});
            }, 1000);
          });
        });
      });
    }
  }
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Save To Basket",
    "id": "saveBasket",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(onClickHandler);
