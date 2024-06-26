import axios from "../utils/axiosClient";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from '../components/Card'

export default function () {

    const { slug } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`/posts/${slug}`)
            .then(res => {
                setPost(res.data)
            });
    }, [slug])

    const navigate = useNavigate();

    const deletePost = async slug => {
        await axios.delete(`/posts/${slug}`);
        navigate('/index');
    }

    return (<>
        <Link to="/index" relative="path">Indietro</Link>
        {post && <Card
            slug={post.slug}
            title={post.title}
            content={post.content}
            tags={post?.tags ?? []}
            category={post.category}
            published={post.published}
            onDelete={deletePost}
        />}
    </>)
}