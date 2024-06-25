import { Link } from "react-router-dom";

export default function ({ title, image, content, tags, published, slug, category }) {
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
            <Link to={`/show/${slug}`}>Show</Link>
        </div>
    )
}