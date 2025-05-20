import { useState, useEffect, useRef, useCallback } from 'react';

const BASE_URL = 'https://api.github.com/search/repositories';
const PER_PAGE = 30;

const getDateTenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 10);
  return date.toISOString().split('T')[0];
};

export const useFetchRepos = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastRepoRef = useCallback(
    node => {
      if (loading || !hasMore) return; //  stop if no more pages or still loading

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log('Reached end, loading more...');
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const sinceDate = getDateTenDaysAgo();
      const url = `${BASE_URL}?q=created:>${sinceDate}&sort=stars&order=desc&page=${page}&per_page=${PER_PAGE}`;

      console.log('Fetching:', url);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          setRepos(prev => [...prev, ...data.items]);
          setHasMore(data.items.length === PER_PAGE); // no more pages if fewer results
        }

        if (data.message) {
          console.error('GitHub API error:', data.message);
          setHasMore(false);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page]);

  return { repos, loading, lastRepoRef };
};
