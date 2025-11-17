// التحقق من الجلسة
if (localStorage.getItem("isAdmin") !== "true") {
  window.location.href = "login/login.html";
}
// ===== Sidebar toggle =====
const bars = document.querySelector('header .fa-bars');
const sidebar = document.querySelector('.sidebar');

bars.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// ===== Section switching =====
const sections = document.querySelectorAll('main section');
const menuItems = document.querySelectorAll('.sidebar li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const target = item.getAttribute('data-section');
        sections.forEach(sec => {
            sec.classList.toggle('active-section', sec.id === target);
        });

        if (sidebar.classList.contains('active')) sidebar.classList.remove('active');
    });
});

// ===== Modals =====
const addProjectBtn = document.getElementById('addProjectBtn');
const modalProject = document.getElementById('modalProject');
const addBlogBtn = document.getElementById('addBlogBtn');
const modalBlog = document.getElementById('modalBlog');
const closeButtons = document.querySelectorAll('.closeModal');

addProjectBtn.addEventListener('click', () => modalProject.classList.add('active'));
addBlogBtn.addEventListener('click', () => modalBlog.classList.add('active'));
closeButtons.forEach(btn => btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('active');
}));

// ===== PROJECTS =====
const projectsContainer = document.getElementById('projectsContainer');
const saveProject = document.getElementById('saveProject');

saveProject.addEventListener('click', () => {
    const title = document.getElementById('projectTitle').value.trim();
    const desc = document.getElementById('projectDesc').value.trim();
    const preview = document.getElementById('projectPreview').value.trim();
    const source = document.getElementById('projectSource').value.trim();
    const imageInput = document.getElementById('projectImage');
    const file = imageInput.files[0];

    if (!title || !desc) return alert('Please fill required fields');

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result || "../images/feature1.jpg";

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${imgSrc}" alt="${title}">
            <h3>${title}</h3>
            <p>${desc}</p>
            <div class="buttons">
                <button title="Preview" onclick="window.open('${preview}','_blank')"><i class="fa-solid fa-eye"></i></button>
                <button title="Source Code" onclick="window.open('${source}','_blank')"><i class="fa-solid fa-code"></i></button>
                <button class="deleteProject" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        projectsContainer.appendChild(card);

        // حذف البطاقة
        card.querySelector('.deleteProject').addEventListener('click', () => {
            card.remove();
        });

        // إغلاق المودال وتنظيف الحقول
        modalProject.classList.remove('active');
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDesc').value = '';
        document.getElementById('projectPreview').value = '';
        document.getElementById('projectSource').value = '';
        imageInput.value = '';
    };

    if (file) reader.readAsDataURL(file);
    else reader.onload({ target: { result: "../images/feature1.jpg" } });
});

// ===== BLOGS =====
const blogsContainer = document.getElementById('blogsContainer');
const saveBlog = document.getElementById('saveBlog');

saveBlog.addEventListener('click', () => {
    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    const category = document.getElementById('blogCategory').value.trim();
    const blogImage = document.querySelector('#modalBlog input[type="file"]');
    const file = blogImage.files[0];

    if (!title || !content) return alert('Please fill required fields');

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            ${imgSrc ? `<img src="${imgSrc}" alt="${title}">` : ''}
            <h3>${title}</h3>
            <p>${content}</p>
            <p><b>Category:</b> ${category}</p>
            <div class="buttons">
                <button title="Edit"><i class="fa-solid fa-pen"></i></button>
                <button class="deleteBlog" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        blogsContainer.appendChild(card);

        // حذف البطاقة
        card.querySelector('.deleteBlog').addEventListener('click', () => {
            card.remove();
        });

        modalBlog.classList.remove('active');
        document.getElementById('blogTitle').value = '';
        document.getElementById('blogContent').value = '';
        blogImage.value = '';
    };

    if (file) reader.readAsDataURL(file);
    else reader.onload({ target: { result: "" } });
});

// ===== MESSAGES =====
const messageRows = document.querySelectorAll('#messages table tbody tr');

messageRows.forEach(row => {
    const readBtn = row.querySelector('button[title="Read"]');
    const deleteBtn = row.querySelector('button[title="Delete"]');

    readBtn.addEventListener('click', () => {
        const name = row.children[0].innerText;
        const email = row.children[1].innerText;
        const message = row.children[2].innerText;

        const popup = document.createElement('div');
        popup.classList.add('modal', 'active');
        popup.innerHTML = `
            <div class="modal-content">
                <h3>Message from ${name}</h3>
                <p><b>Email:</b> ${email}</p>
                <p>${message}</p>
                <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:15px;">
                    <button id="replyBtn" style="background:#1E2039;color:white;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;">Reply</button>
                    <button id="closePopup" style="background:#ccc;color:#333;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        popup.querySelector('#closePopup').addEventListener('click', () => popup.remove());
        popup.querySelector('#replyBtn').addEventListener('click', () => {
            window.open(`mailto:${email}?subject=Reply from Admin`, '_blank');
        });
    });

    deleteBtn.addEventListener('click', () => {
        row.remove();
    });
});
