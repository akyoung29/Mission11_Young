import { Book } from '../types/Book';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({selectedCategories }: {selectedCategories: string[] }) {
    const [book, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try{
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-5000">Error: {error}</p>;

    return(
        <>
            <br />
            {book.map((b) => (
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className='list-unstyled'>
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> {b.price}</li>
                        </ul>
                        <button
                            className="btn btn-success"
                            onClick={()=> 
                                navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)
                            }
                        >
                            Buy
                        </button>
                    </div>
                </div>
            ))}

            <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
            }}
            />

            <br />
            <label>
                Sort by Title:
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
