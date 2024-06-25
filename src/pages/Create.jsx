import { useEffect, useState } from "react";
import Form from "../components/Form"
import axios from "axios"

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function () {

    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const url = `${apiUrl}/tags`;
        const { data: array } = await axios.get(url);
        setTags(array);
        console.log(array);
    }

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const url = `${apiUrl}/categories`;
        const { data: array } = await axios.get(url);
        setCategories(array);
        console.log(array);
    }

    useEffect(() => {
        fetchTags();
        fetchCategories();
    }, [])

    return (
        <>
            <Form
                tags={tags}
                categories={categories}
                onCreate={() => {
                    fetchPost()
                }}
            />
        </>
    )
}