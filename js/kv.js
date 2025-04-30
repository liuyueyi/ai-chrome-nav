
function cacheGetToolsData() {
    return new Promise((resolve) => {
        chrome.storage.local.get('toolsData', (result) => {
            let ans = result['toolsData']
            ans = ans ? JSON.parse(ans) : []
            console.warn('返回的内容是:', JSON.stringify(ans))
            resolve(ans);
        });
    });
}

function cacheSaveToolsData(data) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ toolsData: JSON.stringify(data) }, () => {
            resolve()
        })
    })
}