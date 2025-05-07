
function cacheGetToolsData() {
    return new Promise((resolve) => {
        chrome.storage.local.get('toolsData', (result) => {
            let ans = result['toolsData']
            ans = ans ? JSON.parse(ans) : []
            // console.warn('返回的内容是:', JSON.stringify(ans))
            // 将ans根据sort进行排序
            ans = ans.sort((a, b) => (b.sort || 0) - (a.sort || 0))
            resolve(ans);
        });
    });
}

function cacheSaveToolsData(data) {
    // 确保data数组中每个元素都有id
    data = data.map(item => {
        if (!item.id) {
            item.id = Date.now().toString();
        }
        if (!item.views) {
            item.views = 0;
        }
        if (!item.likes) {
            item.likes = 0;
        }
        return item;
    })

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
            // console.log('返回的内容是:', JSON.stringify(res))
            resolve(res);
        });
    });
}

let DEV_ID = null;
function initDevId() {
    return new Promise((resolve) => {
        chrome.storage.local.get('devId', (result) => {
            let ans = result['devId']
            if (!ans) {
                // 生成一个随机的16位字符串
                ans = Math.random().toString(36).substr(2, 48);
                chrome.storage.local.set({ devId: ans }, () => {
                    DEV_ID = ans;
                    resolve(ans)
                })
            } else {
                DEV_ID = ans;
                resolve(ans)
            }
        });
    });
}

/**
 * 同步方式获取设备id
 * @returns 
 */
async function syncGetDevId() {
    if (DEV_ID) {
        return DEV_ID;
    }
    await initDevId();
}

/**
 * 获取设备id
 * @returns 
 */
function getDevId() {
    if (DEV_ID) {
        return DEV_ID;
    } else {
        return initDevId();
    }
}