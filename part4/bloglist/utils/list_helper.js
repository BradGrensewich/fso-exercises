const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, curr) => {
        return sum + curr
    }
    return blogs.map(b => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, curr) => {
        return curr.likes > max.likes ? curr : max 
    }
    return blogs.reduce(reducer, blogs[0])
}

module.exports = {
  dummy, totalLikes, favoriteBlog
};
