document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('launch')
    checkPageButton.addEventListener('click', function() {

    chrome.tabs.query({'active': true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: 'http://www.julesperryman.com'})
    })

    }, false)
}, false)



document.addEventListener('DOMContentLoaded', function() {
var newTabButton = document.getElementById('newTab')

newTabButton.addEventListener('click',function() {
    chrome.tabs.create({url: ('http://www.julesperryman.com')})
} , false)
}, false)
