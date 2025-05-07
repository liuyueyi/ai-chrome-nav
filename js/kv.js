
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

// 添加到导航
async function addCard(data) {
    let toolsData = await cacheGetToolsData()
    let oldLen = toolsData.length
    // 首先根据url进行去重
    toolsData = toolsData.filter(item => item.url !== data.url)
    if (toolsData.length === oldLen) {
        if (!data.id) {
            data.id = Date.now().toString()
        }

        // 说明没有重复的，直接添加
        toolsData.push(data)
        await cacheSaveToolsData(toolsData)
        return true
    }
    return false
}

// 批量添加到导航中
async function batchAddCard(dataList) {
    let toolsData = await cacheGetToolsData()
    // 如果已经存在，就不添加了
    let hasNew = false;
    const basicId = Date.now().toString()
    let cnt = 1;
    dataList.forEach(data => {
        if (!data.id) {
            data.id = `${basicId}${cnt}`;
            cnt += 1;
        }
        if (!data.views) {
            data.views = 0;
        }
        if (!data.likes) {
            data.likes = 0;
        }
        if (!toolsData.find(item => item.url === data.url)) {
            hasNew = true;
            toolsData.push(data)
        }
    })
    if (hasNew) {
        await cacheSaveToolsData(toolsData)
        return true 
    }
    return false
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