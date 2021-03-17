
import { useEffect, useState } from 'react';
import axios from "axios";
import queryString from "query-string";
const baseURL = "http://js-post-api.herokuapp.com/api/posts?";

export default function useContent(searchTerm) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async ({ searchTerm, ...payload }) => {
      //TODO: call api
      const paramString = queryString.stringify({
        title: searchTerm,
        // _page : 0,
        // _limit : 10,
      });
      axios
        .get(`${baseURL}${paramString}`, {})
        .then(({ data }) => setContent(data))
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
    fetchData({ searchTerm });
    return () => {

    }
  }, [searchTerm]);

  return { content, isLoading };
}