import { Book } from './types/Book';
import { useEffect, useState } from "react";

function BookList() {

    const [book, setBook] = useState<Book[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("https://localhost:5000/api/Book");
            const data = await response.json();
            setBook(data);
        };

        fetchProjects();
    }, []);

    return(
        <div>
            <ul>
                {book.map((b) => (
                    <li key={b.bookID}>
                        <strong>{b.title}</strong><br />
                        <strong>Author:</strong> {b.author} <br />
                        <strong>Publisher:</strong> {b.publisher} <br />
                        <strong>ISBN:</strong> {b.isbn} <br />
                        <strong>Classification:</strong> {b.classification} <br />
                        <strong>Category:</strong> {b.category} <br />
                        <strong>Page Count:</strong> {b.pageCount} <br />
                        <strong>Price:</strong> {b.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
