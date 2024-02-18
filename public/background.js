/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ hide: true }, function() {
    console.log("Hide image is on");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: "www.amazon.*" }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});
