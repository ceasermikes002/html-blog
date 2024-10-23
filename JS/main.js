// Extract slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Fetch blog post details
if (slug) {
   // Fetch blog posts from the JSON file
fetch('.data/posts.json') // Ensure this path is correct
.then(response => {
    if (!response.ok) {
        throw new Error("Failed to load posts.json");
    }
    return response.json();
})
.then(data => {
    const blogList = document.getElementById('blog-list');

    // Check if there are posts
    if (data.length === 0) {
        blogList.innerHTML = "<p>No posts available</p>";
        return;
    }

    // Display each blog post on the homepage
    data.forEach(post => {
        const postElement = document.createElement('article');
        postElement.innerHTML = `
            <h2><a href="post.html?slug=${post.slug}">${post.title}</a></h2>
            <p>${post.date} by ${post.author}</p>
            <img src="${post.featuredImage}" alt="${post.title}">
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?slug=${post.slug}">Read More</a>
        `;
        blogList.appendChild(postElement);
    });
})
.catch(error => {
    console.error("Error loading blog posts:", error);
    document.getElementById('blog-list').innerHTML = "<p>Error loading blog posts.</p>";
});

}
