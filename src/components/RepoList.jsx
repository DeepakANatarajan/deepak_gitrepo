import RepoItem from './RepoItem';

export default function RepoList({ repos, lastRepoRef }) {
  return (
    <div>
      {repos.map((repo, i) => (
        <div
          key={repo.id}
          ref={i === repos.length - 1 ? lastRepoRef : null} // ✅ No need for hasMore here
        >
          <RepoItem repo={repo} />
        </div>
      ))}
    </div>
  );
}
