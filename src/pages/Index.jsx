import { useEffect, useState } from "react";
import axios from "../utils/axiosClient"
import { Link } from "react-router-dom";

export default function () {
    const [posts, setPosts] = useState([]);

    const fetchPost = async () => {
        await axios.get(`/posts`)
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
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/show/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}