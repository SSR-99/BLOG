const blogs = [
  {
    id: 1,
    title: "Building a Responsive Blog Website",
    category: "Web",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    content: "Responsive design ensures your blog looks good on all devices."
  },
  {
    id: 2,
    title: "Improving UI with JavaScript",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    content: "JavaScript enhances interactivity and user experience."
  }
];

const blogList = document.getElementById("blogList");
const blogDetails = document.getElementById("blogDetails");
const detailTitle = document.getElementById("detailTitle");
const detailImage = document.getElementById("detailImage");
const detailContent = document.getElementById("detailContent");
const commentsDiv = document.getElementById("comments");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");

let currentBlogId = null;

/* DARK MODE */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

/* BLOG LOGIC */
function renderBlogs(data) {
  blogList.innerHTML = "";
  data.forEach(blog => {
    blogList.innerHTML += `
      <div class="blog-card fade-up">
        <img src="${blog.image}">
        <div class="blog-content">
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <button onclick="openBlog(${blog.id})">Read More</button>
        </div>
      </div>
    `;
  });
  observeAnimations();
}

function openBlog(id) {
  const blog = blogs.find(b => b.id === id);
  currentBlogId = id;
  blogList.classList.add("hidden");
  blogDetails.classList.remove("hidden");
  detailTitle.innerText = blog.title;
  detailImage.src = blog.image;
  detailContent.innerText = blog.content;
}

function goBack() {
  blogDetails.classList.add("hidden");
  blogList.classList.remove("hidden");
}

function filterBlogs() {
  let filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(b => b.category === categoryFilter.value);
  }
  renderBlogs(filtered);
}

searchInput.addEventListener("input", filterBlogs);
categoryFilter.addEventListener("change", filterBlogs);

/* SCROLL ANIMATION */
function observeAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  });
  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
}

renderBlogs(blogs);
