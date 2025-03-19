import { Book } from './types/Book';
import { useEffect, useState } from "react";

function BookList() {

    const [book, setBook] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(
                `https://localhost:5000/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}`
            );
            const data = await response.json();
            setBook(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems/pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNum, totalItems]);

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
                    </div>
                </div>
            ))}

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum -1)}>Previous</button>

            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            <label>
                Results per page: 
                <select 
                    value={pageSize} 
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
