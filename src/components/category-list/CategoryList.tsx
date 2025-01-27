import { Center, Flex, Loader } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../services/service"
import { Link } from "react-router-dom"
import "./Category.css"


export const CategoryList = () => {

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })

    if(isLoading) return <Center h={300}><Loader color="lime" /></Center> 
    if(isError) return <h1>Server Error</h1>
    return (
        <Flex className="container-sm">
            <Flex align='center' justify='center' wrap='wrap' className="category-list">
                { isSuccess && data.map((item, index) =>(
                    <Link key={index} to={`/category/${item.slug}`} className="category-list-item">{item.name}</Link>
                )) }
            </Flex>
        </Flex>
    )
}


