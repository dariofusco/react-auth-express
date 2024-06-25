import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_BASE_API_URL;
import Card from '../components/Card'

export default function () {

    const { slug } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`${apiUrl}/posts/${slug}`)
            .then(res => {
                setPost( res.data)
            });
    }, [slug])

    return (<>
        {post && <Card
            slug={post.slug}
            title={post.title}
            content={post.content}
            tags={post?.tags ?? []}
            published={post.published}
        />}
    </>)
}