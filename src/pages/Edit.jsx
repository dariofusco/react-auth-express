import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Form from "../components/Form";


export default function () {

    const { slug } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const { data: post } = await axios.get(`/posts/${slug}`);
        console.log(post);
        setDataToEdit({
            title: post.title,
            slug: post.slug,
            image: "",
            content: post.content,
            published: post.published,
            tags: post.tags.map(tag => tag.id),
            categoryId: post.categoryId
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug]);

    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const url = `/tags`;
        const { data: array } = await axios.get(url);
        setTags(array);
        console.log(array);
    }

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const url = `/categories`;
        const { data: array } = await axios.get(url);
        setCategories(array);
        console.log(array);
    }

    useEffect(() => {
        fetchTags();
        fetchCategories();
    }, [])

    const updatePost = async formData => {
        const post = await axios.put(`/posts/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (post.status < 400) {
            navigate(`/posts/${post.data.slug}`)
        }
    }

    return (
        <>
            <Link to="../" relative="path">Annulla</Link>
            <Form
                tags={tags}
                categories={categories}
                initialData={dataToEdit}
                onSubmit={updatePost}
            />
        </>
    )

}