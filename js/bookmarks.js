// 书签模态框相关元素
const bookmarksModal = document.getElementById('bookmarks-modal');
const bookmarksContainer = document.getElementById('bookmarks-container');
const bookmarksBtn = document.getElementById('bookmarks-btn');
const refreshBookmarksBtn = document.getElementById('refresh-bookmarks');
const importAllBookmarksBtn = document.getElementById('import-all-bookmarks');

// 打开书签模态框
bookmarksBtn.addEventListener('click', () => {
  bookmarksModal.style.display = 'flex';
  loadBookmarks();
});

// 关闭模态框
bookmarksModal.querySelector('.close-btn').addEventListener('click', () => {
  bookmarksModal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
  if (e.target === bookmarksModal) {
    bookmarksModal.style.display = 'none';
  }
});

// 刷新书签列表
refreshBookmarksBtn.addEventListener('click', loadBookmarks);

// 导入所有书签
importAllBookmarksBtn.addEventListener('click', () => {
  const bookmarkItems = document.querySelectorAll('.bookmark-item');
  bookmarkItems.forEach(item => {
    const title = item.querySelector('.bookmark-title').textContent;
    const url = item.querySelector('.bookmark-url').textContent;
    const icon = item.querySelector('.bookmark-icon').src;
    importBookmark(title, url, icon);
  });
  showToast('所有书签已导入');
});

// 加载书签列表
async function loadBookmarks() {
  try {
    const bookmarks = await chrome.bookmarks.getTree();
    console.log('本地缓存的书签列表信息:', bookmarks);
    const bookmarksTree = document.getElementById('bookmarks-tree');
    bookmarksTree.innerHTML = '';
    bookmarksContainer.innerHTML = '';
    renderBookmarkTree(bookmarks[0], bookmarksTree);
  } catch (error) {
    console.error('获取书签失败:', error);
    bookmarksContainer.innerHTML = '<div class="error-message">获取书签失败，请确保已授予书签访问权限</div>';
  }
}

// 渲染书签树
function renderBookmarkTree(bookmark, container) {
  if (bookmark.children) {
    console.log('现在渲染的文件夹:', bookmark);
    const treeItem = document.createElement('div');
    treeItem.className = 'bookmarks-tree-item';
    if (bookmark.title) { // 只为有标题的文件夹创建头部
      const folderHeader = document.createElement('div');
      const showThisDiv = bookmark.id == '1' 
      folderHeader.className = `folder-header ${showThisDiv ? ' active': ''}`;
      folderHeader.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="folder-icon">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>${bookmark.title}</span>
      `;
      if (showThisDiv) {
        // 当前文件夹为选中状态时，展示右边的书签内容
        displayBookmarks(bookmark);
      }

      folderHeader.addEventListener('click', () => {
        // 更新当前选中的文件夹
        document.querySelectorAll('.folder-header').forEach(header => header.classList.remove('active'));
        folderHeader.classList.add('active');
        // 显示当前文件夹的书签
        displayBookmarks(bookmark);
      });

      treeItem.appendChild(folderHeader);
    }

    if (bookmark.children.length > 0) {
      const folderContent = document.createElement('div');
      folderContent.className = 'folder-content';
      bookmark.children.forEach(child => renderBookmarkTree(child, folderContent));
      treeItem.appendChild(folderContent);
    }

    container.appendChild(treeItem);
  }
}

// 显示当前文件夹的书签
function displayBookmarks(bookmark) {
  bookmarksContainer.innerHTML = '';
  if (bookmark.children) {
    bookmark.children.forEach(child => {
      if (child.url) {
        const bookmarkElement = createBookmarkElement(bookmark.title, child);
        bookmarksContainer.appendChild(bookmarkElement);
      } else {
        // 表示这里展示的是书签文件夹
        bookmarksContainer.appendChild(createBookmarkFold(child));
      }
    });
  }
}

// 创建文件夹
function createBookmarkFold(bookmark) {
  const div = document.createElement('div');
  div.className = 'bookmark-item';

  const icon = document.createElement('div');
  icon.className = 'bookmark-icon';
  icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
      </svg>
    `;

  const actions = document.createElement('div');
  actions.className = 'bookmark-actions';
  actions.innerHTML = `
      <button class="import-folder-btn">导入</button>
    `;

  const info = document.createElement('div');
  info.className = 'bookmark-info';
  info.innerHTML = `
      <div class="bookmark-title">${bookmark.title}</div>
    `;

  div.appendChild(icon);
  div.appendChild(info);
  div.appendChild(actions);

  console.log('现在显示的书签文件夹:', bookmark);

  // 导入按钮点击事件
  actions.querySelector('.import-folder-btn').addEventListener('click', async () => {
    // 导入这个
    if (await batchImportBookMark(bookmark)) {
      toast.success('书签已全部导入');
    } else {
      toast.error('已存在，无需重复导入哦~');
    }
  });

  return div;
}

// 构建网页对应的图标
function buildIconUrl(url) {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

// 创建书签元素
function createBookmarkElement(folder, bookmark) {
  const div = document.createElement('div');
  div.className = 'bookmark-item';

  const icon = document.createElement('img');
  icon.className = 'bookmark-icon';
  // 从URL中提取域名
  icon.src = buildIconUrl(bookmark.url);
  icon.onerror = () => icon.src = 'public/placeholder-logo.svg';

  const info = document.createElement('div');
  info.className = 'bookmark-info';
  info.innerHTML = `
    <div class="bookmark-title">${bookmark.title}</div>
    <div class="bookmark-url">${bookmark.url}</div>
  `;

  const actions = document.createElement('div');
  actions.className = 'bookmark-actions';
  actions.innerHTML = `
    <button class="import-btn">导入</button>
  `;

  div.appendChild(icon);
  div.appendChild(info);
  div.appendChild(actions);

  // 导入按钮点击事件
  actions.querySelector('.import-btn').addEventListener('click', async () => {
    console.log('现在导入的书签:', bookmark);
    if (await importBookmark(folder, bookmark.title, bookmark.url, icon.src)) {
      toast.success('书签已导入');
    } else {
      toast.error('已存在，无需重复导入哦~');
    }
  });

  return div;
}

// 导入书签为导航卡片
async function importBookmark(category, title, url, icon) {
  const card = {
    id: Date.now().toString(),
    title: title,
    description: '',
    url: url,
    icon: icon,
    type: 'bookmark',
    category: '书签-' + category,
    views: 0,
    likes: 0,
  };

  // 调用现有的添加卡片方法
  return await addCard(card);
}

async function batchImportBookMark(bookmark) {
  // 导入当前这个文件夹下的所有书签
  const toInsert = [];
  bookmark.children.forEach(child => {
    if (child.url) {
      toInsert.push({
        title: child.title,
        description: '',
        url: child.url,
        icon: buildIconUrl(child.url),
        type: 'bookmark',
        category: '书签-' + bookmark.title,
        views: 0,
        likes: 0,
      })
    }
  })
  console.log('批量导入的书签:', toInsert);
  return await batchAddCard(toInsert);
}