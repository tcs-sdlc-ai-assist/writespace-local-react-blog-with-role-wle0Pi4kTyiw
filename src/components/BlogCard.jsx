import React from 'react';
import PropTypes from 'prop-types';

/**
 * BlogCard component for displaying a blog post preview.
 *
 * @param {object} props
 * @param {string} props.title - Blog post title.
 * @param {string} props.summary - Short summary or excerpt.
 * @param {string} props.author - Author name.
 * @param {string} props.date - Publish date (ISO or formatted).
 * @param {string} [props.coverImage] - Optional cover image URL.
 * @param {string} [props.href] - Optional link to full post.
 * @returns {React.ReactNode}
 */
function BlogCard({ title, summary, author, date, coverImage, href }) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition hover:shadow-lg hover:bg-slate-700">
      {coverImage && (
        <div className="md:w-48 w-full h-48 md:h-auto flex-shrink-0">
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {href ? (
            <a
              href={href}
              className="text-2xl font-bold text-slate-100 hover:text-sky-400 transition"
            >
              {title}
            </a>
          ) : (
            <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
          )}
          <p className="mt-2 text-slate-400">{summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            By <span className="font-medium text-slate-100">{author}</span>
          </span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
  href: PropTypes.string,
};

export default BlogCard;