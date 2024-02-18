// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let category = document
    .querySelector("#wayfinding-breadcrumbs_feature_div ul")
    .getElementsByTagName("li");

  sendResponse({
    result: "success",
    image: document.querySelector("[data-a-image-name]").src,
    productTitle: document.querySelector("#productTitle").outerText,
    by: document.querySelector("#bylineInfo").outerText,
    categorie: category[category.length - 1].outerText,
    url: window.location.href,
    searchBox: document.getElementById("twotabsearchtextbox").value
  });
});

chrome.runtime.sendMessage({
    searchBox: document.getElementById('twotabsearchtextbox').value
});
