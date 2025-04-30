
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

function getToolsCategory() {
    return new Promise((resolve) => {
        chrome.storage.local.get('toolsData', (result) => {
            let ans = result['toolsData']
            ans = ans ? JSON.parse(ans) : []
            // 根据category进行计数统计
            let res = {}
            ans = ans.forEach(item => {
                res[item.category] = (res[item.category] || 0) + 1;
            })
            // 按照数量进行排序，然后只返回key
            res = Object.keys(res).sort((a, b) => res[b] - res[a])
            console.log('返回的内容是:', JSON.stringify(res))
            resolve(res);
        });
    });
}