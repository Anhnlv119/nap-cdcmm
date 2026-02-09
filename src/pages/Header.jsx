import { NavLink, useSearchParams } from "react-router-dom";

function Header() {
  const [params] = useSearchParams();
const token = params.get("token") || localStorage.getItem("token");
  const type = params.get("type");

  const buildUrl = (t) =>
    `/landing?type=${t}${token ? `&token=${token}` : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink
          to={buildUrl("ALL")}
                className={`nav-link ${type === "ALL" || !type ? "active" : ""}`}
        >
          ALL
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to={buildUrl("DAILY")}
                className={`nav-link ${type === "DAILY" ? "active" : ""}`}
              >
                DAILY
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={buildUrl("WEEKLY")}
                className={`nav-link ${type === "WEEKLY" ? "active" : ""}`}
              >
                WEEKLY
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={buildUrl("MONTHLY")}
                className={`nav-link ${type === "MONTHLY" ? "active" : ""}`}
              >
                MONTHLY
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
