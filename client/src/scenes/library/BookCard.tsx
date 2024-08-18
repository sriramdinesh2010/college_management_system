import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  coverImage,
  description,
}) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={`${title} cover`} className="book-cover" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-description">{description}</p>
      </div>
    </div>
  );
};

export default BookCard;
