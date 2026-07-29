import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostTemplate from '@/components/BlogPostTemplate.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import { blogPosts } from '@/data/blogPosts.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <NotFoundPage
        title="404"
        heading="That article isn't here."
        message="The piece you're looking for doesn't exist or has moved. The rest of our writing is still worth a look."
      />
    );
  }

  return <BlogPostTemplate post={post} />;
};

export default BlogPostPage;
