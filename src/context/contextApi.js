import React,{createContext, useEffect,useState} from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(true);


    useEffect(() => {
        fetchSelectedCategoryData(selectedCategories)
    },[selectedCategories]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({contents}) => {
            setSearchResults(contents)
            setLoading(false)
        })
    }
    return (
        <Context.Provider value={{
            loading, setLoading,
            searchResults, setSearchResults,
            selectedCategories,setSelectedCategories,
            mobileMenu,setMobileMenu,
        }}>
            {props.children}
        </Context.Provider>
    )
}