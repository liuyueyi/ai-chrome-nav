// 初始化粒子背景
document.addEventListener('DOMContentLoaded', function () {
    //   initParticles();
    initDevId();
    loadSharedTools();

    // 为logo添加点击事件，点击后返回首页
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer'; // 添加手型光标样式
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});


async function fetchTotals() {
    // 获取全部信息，包含分类 + 所有工具
    try {
        return await get('/api/nav/all', null)
    } catch (error) {
        toast.error('获取导航卡片数据失败:' + error);
        // 返回空数组作为默认值
        return {
            categoryList: [],
            itemList: {
                list: []
            }
        };
    }
}

// 获取共享导航数据
async function fetchSharedTools(category, search, page) {
    try {
        const params = {
            key: search && search!== '' ? search : null,
            category: category && category !== 'all' ? category : null,
            page: page ? page : 1
        }
        return await get('/api/nav/list', params)
    } catch (error) {
        toast.error('获取导航卡片数据失败:' + error);
        // 返回空数组作为默认值
        return [];
    }
}

async function execToolClicked(toolId, liked, clicked) {
    return await postJson('/api/nav/update', {
        id: toolId,
        liked: liked,
        clicked: clicked    
    })
}

// 加载共享导航卡片
async function loadSharedTools() {
    const container = document.getElementById('share-tools-container');
    const sharedTools = await fetchTotals();
    console.log('获取到的卡片列表:', sharedTools);

    // 更新左侧边的分类信息
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    const categoryMap = {};
    sharedTools.categoryList.forEach(category => {
        if (!categoryMap[category]) {
            categoryMap[category] = {
                category: category,
                count: 0
            };
        }
    })
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';
    categoryItem.innerHTML = `
        <li class="category-item active">
          <a href="#all" class="category-link">
            全部
          </a>
        </li>
      `;
    categoryList.appendChild(categoryItem);
    Object.values(categoryMap).forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <li class="category-item">
            <a href="#${category.category}" class="category-link">
                ${category.category}
            </a>
            </li>
        `;
        categoryList.appendChild(categoryItem);
    })
    bindCategoryChooseListener();

    sharedTools.itemList.list.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

function bindCategoryChooseListener() {
    // 分类切换
    const categoryLinks = document.querySelectorAll('.category-link');
    console.log('进入这里了!');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // 移除其他分类的active类
            categoryLinks.forEach(l => {
                l.parentElement.classList.remove('active');
            });

            // 添加当前分类的active类
            link.parentElement.classList.add('active');

            // 获取分类ID并过滤工具
            const category = link.getAttribute('href').substring(1);
            filterToolsByCategory(category);
        });
    });
}

function getChooseCategory() {
    return document.querySelector('.category-item .active').querySelector('.category-link').getAttribute('href').substring(1);
}


// 根据分类过滤工具
async function filterToolsByCategory(category) {
    const container = document.getElementById('share-tools-container');
    const tools = await fetchSharedTools(category, null, 1);
    console.log('过滤的卡片列表:', tools);

    container.innerHTML = '';
    if (tools.list.length === 0) {
        container.innerHTML = `<div></div><div class="no-results">没有找到相关的工具</div>`;
        return;
    }
    tools.list.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

async function filterToolsBySearch(query) {
    const container = document.getElementById('share-tools-container');
    const category = getChooseCategory();
    const tools = await fetchSharedTools(category, query, 1);
    console.log('过滤的卡片列表:', tools);

    container.innerHTML = '';
    if (tools.list.length === 0) {
        container.innerHTML = `<div></div><div class="no-results">没有找到相关的工具</div>`;
        return;
    }
    tools.list.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

function bindSearchListener() {
    // Search functionality
    const searchInput = document.querySelector(".search-input")
    searchInput.addEventListener("input", (e) => {
        // 对于检索本地卡片时，根据输入内容进行过滤
        const query = searchInput.value.toLowerCase().trim();
        filterToolsBySearch(query)
    })
}
bindSearchListener();

// 创建导航卡片
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';

    card.innerHTML = `
    <div class="tool-icon">
      <img src="${tool.icon || '/public/placeholder-logo.svg'}" alt="${tool.name}" width="54" height="54" class="tool-icon-img">
    </div>
    <div class="tool-info">
      <h3 class="tool-name">${tool.title}</h3>
      <p class="tool-desc">${tool.desc}</p>
    </div>
        <div class="share-tool-category green">${tool.category}</div>
      <div class="tool-like">
        <button class="btn btn-primary import-btn" data-tool-id="${tool.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
        导入
      </button>
    </div>
     <div class="tool-footer">
        <div class="tool-stats">
        <div class="stat click-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span>${tool.clickCnt || 0}</span>
        </div>
        <div class="stat like-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
            <span>${tool.likeCnt || 0}</span>
        </div>
        </div>
        <div class="tool-actions">
            <a class="to_website" data-link-tool-id="${tool.id}" data-tool-url="${tool.url}" href="${tool.url}" target="_blank">
            访问网站
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </a>
        </div>
    </div>
  `;


    // 添加导入按钮点击事件
    const importBtn = card.querySelector('.import-btn');
    importBtn.addEventListener('click', (e) => {
        e.preventDefault();
        importTool(tool);
    });

    // 绑定点击事件
    card.querySelector('.to_website').addEventListener('click', async () => {
        // 增加点击次数
        console.log('点击了卡片:', tool);
        const ans = await execToolClicked(tool.id, null, 1);
        if (ans) {
            // 更新点击次数
            card.querySelector('.click-stat span').textContent = (tool.clickCnt || 0) + 1;
        }
    });
    return card;
}


async function importTool(tool) {
    openImportToolModal(tool);
}


// ------------------------------------------------------------------------------------
// 下面是导入工具的逻辑

let TOTAL_CATEGORY = [];
// 从本地存储获取工具数据，如果不存在则使用默认数据
function initCategory() {
    getToolsCategory().then(tools => {
        TOTAL_CATEGORY = tools;
    });
}
initCategory();
// 当前的分类
function getCategories() {
    return TOTAL_CATEGORY;
}
// 添加导航卡片的模态框HTML
const importToolModal = `
  <div id="import-tool-modal" class="modal">
    <div class="modal-content">
      <h2>导入导航</h2>
      <form id="import-tool-form">
        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" name="title" >
        </div>
        <div class="form-group">
          <label for="description">描述</label>
          <textarea id="description" name="description" ></textarea>
        </div>
        <div class="form-group">
          <label for="url">网址</label>
          <input type="url" id="url" name="url" >
        </div>
        <div class="form-group">
            <label for="icon">图标</label>
            <input type="text" id="icon" name="icon" required>
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" name="category" data-custom="allow">
            ${getCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" id="close-import-tool-modal-btn">取消</button>
          <button type="submit" class="btn btn-primary" id="submit-import-btn">确认导入</button>
        </div>
      </form>
    </div>
  </div>
`;

// 将模态框添加到body
document.body.insertAdjacentHTML('beforeend', importToolModal);

// 处理分类选择
function handleCategorySelect() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) {
        console.warn('Category select element not found');
        return;
    }
    // 如果已经存在 + 添加新分类，则不需要再加下面的内容
    if (categorySelect.querySelector('option[value="new"]')) {
        return;
    }

    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ 添加新分类';
    categorySelect.appendChild(newOption);
    categorySelect.addEventListener('change', (e) => {
        if (e.target.value === 'new') {
            const newCategory = prompt('请输入新分类名称：');
            if (newCategory) {
                const option = document.createElement('option');
                option.value = newCategory;
                option.textContent = newCategory;
                categorySelect.insertBefore(option, categorySelect.lastChild);
                categorySelect.value = newCategory;
            }
        }
    });
}

// 初始化分类选择事件
handleCategorySelect();

// 关闭导入工具模态框
function closeImportToolModal() {
    document.getElementById('import-tool-modal').classList.remove('active');
}

// 添加关闭按钮事件监听
const closeImportBtn = document.getElementById('close-import-tool-modal-btn');
if (closeImportBtn) {
    closeImportBtn.addEventListener('click', closeImportToolModal);
}

// 处理导入工具表单提交
function handleImportToolSubmit(e, tool) {
    e.preventDefault();
    try {
        cacheGetToolsData().then(localTools => {
            // 检查工具是否已经存在
            if (localTools.some(t => t.url === tool.url)) {
                toast.warning('该工具已经在您的导航中', 1500);
                closeImportToolModal();
                bindImportClickListener(tool); 
                return;
            }

            localTools.push(tool);
            cacheSaveToolsData(localTools).then(() => {
                toast.success('导入成功', 1500);
                closeImportToolModal();
                bindImportClickListener(tool);
            })
        })
    } catch (error) {
        toast.error('导入失败:', error);
    }
}

function bindImportClickListener(tool) {
    document.querySelectorAll('.tool-card').forEach(async element => {
        const target = element.querySelector('a');
        const id = target.dataset.linkToolId;
        console.log('导入的是id:', id, tool.toolId);
        if (id == tool.toolId) {
            // 正好是这个
            const ans = await execToolClicked(tool.toolId, 1, null);
            if (ans) {
                element.querySelector('.like-stat span').textContent = (tool.likeCnt || 0) + 1;
            }
        }
    });
}

// 打开导入工具模态框
function openImportToolModal(tool) {
    const modal = document.getElementById('import-tool-modal');
    const form = document.getElementById('import-tool-form');
    console.log('导入的工具:', tool);

    // 填充表单数据
    form.title.value = tool.title;
    form.description.value = tool.desc;
    form.url.value = tool.url;
    form.icon.value = tool.icon;


    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';
    let hasThisCategory = false;
    getCategories().forEach(c => {
        const option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        categorySelect.appendChild(option);
        if (c === tool.category) {
            hasThisCategory = true;
        }
    });
    if (!hasThisCategory) {
        // 没有当前分组时，默认添加当前分组
        const option = document.createElement('option');
        option.value = tool.category;
        option.textContent = tool.category;
        categorySelect.appendChild(option);
    }
    // 切换为当前推荐的分组
    form.category.value = tool.category;

    // 添加表单提交事件
    form.onsubmit = (e) => handleImportToolSubmit(e, {
        title: form.title.value,
        description: form.description.value,
        url: form.url.value,
        icon: form.icon.value,
        category: form.category.value,
        likes: 0,
        views: 0,
        likeCnt: tool.likeCnt,
        toolId: tool.id,
        id: new Date().getTime().toString()
    });

    modal.classList.add('active');

    // 重新初始化分类选择
    handleCategorySelect();
}


// ------------------------------------------------------------------------------------
