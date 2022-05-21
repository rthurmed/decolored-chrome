window.onload = () => {
  const activator = document.getElementById("activator")
  const strengthRange = document.getElementById("strength-range")

  chrome.storage.sync.get("activated", ({ activated }) => {
    activator.checked = activated
  })

  chrome.storage.sync.get("strength", ({ strength }) => {
    strengthRange.value = strength * 100
  })

  activator.oninput = async (e) => {
    const activated = e.target.checked
    chrome.storage.sync.set({ activated })
    await updateValue()
  }
  
  strengthRange.oninput = async (e) => {
    const strength = e.target.value / 100
    chrome.storage.sync.set({ strength })
    await updateValue()
  }

  async function updateValue() {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageFilter
    })
  }
  
  function setPageFilter() {
    chrome.storage.sync.get("activated", ({ activated }) => {
      if (!activated) {
        document.body.style.filter = ''
      } else {
        chrome.storage.sync.get("strength", ({ strength }) => {
          document.body.style.filter = `grayscale(${strength})`
        })
      }
    })
  }
}
