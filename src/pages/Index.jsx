import { useEffect, useState } from "react";
import axios from "axios"
const apiUrl = import.meta.env.VITE_BASE_API_URL;
import Card from '../components/Card'

export default function () {
    const [posts, setPosts] = useState([]);

    const fetchPost = async () => {
        await axios.get(`${apiUrl}/posts`)
            .then(res => {
                const posts = res.data;
                setPosts(posts);
                console.log(posts);
            })
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <>
            {posts.map(post => (
                <Card
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    slug={post.slug}
                    tags={post.tags.map(tag => tag.name)}
                    category={post?.category?.name ?? ''}
                    published={post.published}
                />
            ))}
        </>
    )
}