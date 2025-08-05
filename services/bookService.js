import Book from '../models/book.js';

const getAllBooks = async () => {
    return await Book.find();
};

const getBookById = async (id) => {
    return await Book.findById(id);
};

const createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

const updateBook = async (id, bookData) => {
    return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

const getBooksByCategory = async (categoryId) => {
    return await Book.find({ category: categoryId }).populate('category');
};

const getBooksByAuthor = async (authorId) => {
    return await Book.find({ author: authorId }).populate('author');
};

const addRate = async (book, rating, count) => {
    const oldRate = book.averageRating;
    book.averageRating = (oldRate * count + rating) / (count + 1);
    await book.save();
};

const isBookExists = async (bookId) => {
    const book = await getBookById(bookId);
    return book !== null;
}

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBooksByCategory,
    getBooksByAuthor,
    addRate,
    isBookExists
};
