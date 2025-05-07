const HOST = "https://story.hhui.top"

initDevId();

async function get(path, params) {
    if (!path.startsWith("/")) {
        path = '/' + path;
    }

    // 将params转换为url格式的请求参数
    let queryString = '';
    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value);
            }
        });
        queryString = searchParams.toString();
        if (queryString) {
            path += '?' + queryString;
        }
    }

    const res = await fetch(`${HOST}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'nav-id': await syncGetDevId()
        }
    })
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    if (data.status.code !== 200) {
        throw new Error(data.status.msg);
    }
    return data['result']
}

async function postJson(path, params) {
    if (!path.startsWith("/")) {
        path = '/' + path;
    }

      // 执行卡片计数相关的更新逻辑
      const response = await fetch(`${HOST}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'nav-id': await syncGetDevId(), // fixme 这里需要调整一下 admin超级用户
        },
        body: JSON.stringify(params)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.status.code !== 200) {
        throw new Error(data.status.msg);
    }
    return data['result'];
}