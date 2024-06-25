import axios from "../utils/axiosClient";
import { useParams, Link } from "react-router-dom";
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

    return (<>
        <Link to="/index" relative="path">Indietro</Link>
        {post && <Card
            slug={post.slug}
            title={post.title}
            content={post.content}
            tags={post?.tags ?? []}
            category={post.category}
            published={post.published}
        />}
    </>)
}