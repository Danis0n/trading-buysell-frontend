import {useMemo} from "react";

export const useSortedAdverts = (adverts, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort) {
            return [...adverts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return adverts;
    }, [sort, adverts])

    return sortedPosts;
}

export const useAdverts = (adverts, sort, query) => {
    const sortedAdverts = useSortedAdverts(adverts, sort);

    const sortedAndSearchedAdverts = useMemo(() => {
        return sortedAdverts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedAdverts])

    return sortedAndSearchedAdverts;
}
