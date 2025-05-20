import { FaStar, FaUser } from 'react-icons/fa';

export default function RepoItem({ repo }) {
  return (
    <div className="repo-item">
      <div className="repo-left">
        <img src={repo.owner.avatar_url} alt="avatar" className="avatar" />
        <div className="repo-details">
          <span className="repo-name">{repo.name}</span>
          <span className="repo-desc">{repo.description}</span>
          <span className="repo-owner"><FaUser /><span> </span>{repo.owner.login}</span>
        </div>
      </div>
      <div className="repo-stars">
        <FaStar /> {repo.stargazers_count > 1000  ? `${(repo.stargazers_count / 1000).toFixed(1)}k`  : repo.stargazers_count}
      </div>
    </div>
  );
}
