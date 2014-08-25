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
          chrome.notifications.create('IB_'+Date.now(), {
            type: 'image',
            title: 'Success saving',
            message: 'congraturation!!',
            iconUrl: '../img/icon128.png',
            imageUrl: imageUrl
          }, function(notificationId){
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
