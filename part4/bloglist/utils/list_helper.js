const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, curr) => {
    return sum + curr;
  };
  return blogs.map((b) => b.likes).reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, curr) => {
    return curr.likes > max.likes ? curr : max;
  };
  return blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });
  const formatted = Object.entries(authors).map((a) => {
    return { author: a[0], blogs: a[1] };
  });
  const reducer = (max, curr) => {
    return curr.blogs > max.blogs ? curr : max;
  };

  return formatted.reduce(reducer, formatted[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
