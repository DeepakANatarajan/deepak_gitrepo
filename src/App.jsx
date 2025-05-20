import { useFetchRepos } from './hooks/useFetchRepos';
import RepoList from './components/RepoList';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const { repos, loading, lastRepoRef } = useFetchRepos();

  return (
    <div style={{ paddingBottom: '4rem' /* prevent content from hiding behind footer */ }}>
      <div className="header">Git Trending Repository</div>
      <div className="repo-list">
        <RepoList repos={repos} lastRepoRef={lastRepoRef} />
        {loading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
