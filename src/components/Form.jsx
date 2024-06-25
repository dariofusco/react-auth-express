import { useState } from 'react'
import axios from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Form({ tags, categories }) {

    const navigate = useNavigate();

    const defaultPostData = {
        title: "",
        slug: "",
        image: "",
        content: "",
        published: true,
        tags: [],
        categoryId: ""
    }

    const [postData, setPostData] = useState(defaultPostData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const post = await axios.post(`/posts`, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(post);
        if (post.status < 400) {
            navigate(`/show/${post.data.slug}`)
        }

        setPostData(defaultPostData);
    }

    const changePostData = (key, newValue) => {
        setPostData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <>

            <form onSubmit={handleSubmit}>

                <h1>Aggiungi un Post:</h1>

                <div className="form-element">
                    <label><strong>Titolo:</strong></label>
                    <input
                        type="text"
                        value={postData.title}
                        onChange={event => changePostData('title', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Slug:</strong></label>
                    <input
                        type="text"
                        value={postData.slug}
                        onChange={event => changePostData('slug', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Immagine:</strong></label>
                    <input
                        type="text"
                        value={postData.image}
                        onChange={event => changePostData('image', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Contenuto:</strong></label>
                    <input
                        type="text"
                        value={postData.content}
                        onChange={event => changePostData('content', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <ul>
                        <label><strong>Tags:</strong></label>
                        {tags.map(({ id, name }, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={postData.tags.includes(id)}
                                    onChange={() => {
                                        const current = postData.tags
                                        const newTags = current.includes(id) ?
                                            current.filter(element => element !== id) :
                                            [...current, id];
                                        changePostData('tags', newTags)
                                    }}
                                />
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-element">
                    <label><strong>Categoria:</strong></label>
                    <select
                        name="categoryId"
                        value={postData.categoryId}
                        onChange={event => changePostData("categoryId", Number(event.target.value))}
                    >
                        <option>Seleziona una categoria</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-element">
                    <label><strong>Pubblicare:</strong></label>
                    <select
                        name="published"
                        value={postData.published}
                        onChange={event => changePostData("published", event.target.value)}
                    >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <button>Aggiungi</button>

            </form>

        </>
    )
}

export default Form