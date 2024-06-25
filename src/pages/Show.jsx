import axios from "../utils/axiosClient";
import { useParams } from "react-router-dom";
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
        {post && <Card
            slug={post.slug}
            title={post.title}
            content={post.content}
            tags={post?.tags ?? []}
            published={post.published}
        />}
    </>)
}