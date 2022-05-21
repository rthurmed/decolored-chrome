// Initialize values

let activated = true
let strength = 1.0

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    activated,
    strength
  })
})
