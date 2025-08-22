document.addEventListener('DOMContentLoaded', function () {
  // Dark mode toggle with persistence
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = function () {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.removeItem('theme');
      }
    };

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.onclick = () =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }

  // Comments: load and render from localStorage
  function loadComments(section) {
    const commentList = document.getElementById(`comments-${section}`);
    if (!commentList) return;
    const comments = JSON.parse(localStorage.getItem(`comments-${section}`) || '[]');
    commentList.innerHTML = '';
    comments.forEach(({ name, message }) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `<span class="name">${name}</span>: <span class="msg">${message}</span>`;
      commentList.appendChild(commentDiv);
    });
  }

  // Initialize comments on all comment lists
  document.querySelectorAll('.comment-list').forEach((list) => {
    const id = list.id;
    if (!id) return;
    const section = id.replace('comments-', '');
    loadComments(section);
  });

  // Comment form submit handling
  document.querySelectorAll('.comment-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const section = form.dataset.section;
      const name = form.name.value.trim();
      const message = form.message.value.trim();

      if (!name || !message) {
        alert('Please enter both name and comment.');
        return;
      }

      let comments = JSON.parse(localStorage.getItem(`comments-${section}`) || '[]');
      comments.push({ name, message });
      localStorage.setItem(`comments-${section}`, JSON.stringify(comments));

      form.reset();
      loadComments(section);
    });
  });

  // Share button event (simple alert here)
  document.querySelectorAll('.share-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      alert('Share link copied!');
    });
  });

  // Search feature (optional - implement if search bar is used)
  const searchInput = document.getElementById('search-bar');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.blog-card, .more-card').forEach((card) => {
        const text = card.textContent.toLowerCase();
        const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
        card.style.display = text.includes(query) || tags.includes(query) ? '' : 'none';
      });
    });
  }
});
