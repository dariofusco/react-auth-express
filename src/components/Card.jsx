import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

export default function ({ title, image, content, tags, published, slug, category, onDelete }) {

    const deletePost = async () => {
        await onDelete(slug);
    }

    return (
        <div className={`card ${published ? 'published' : ''}`}>
            {image &&
                <img src={image} alt="" />
            }
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="badge">
                {tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                ))}
            </div>
            <h3>{category}</h3>
            <button onClick={deletePost}><FaTrashAlt /></button>
        </div>
    )
}