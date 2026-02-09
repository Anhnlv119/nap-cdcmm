import { Link } from "react-router-dom";
import Header from "./Header";
import { useSearchParams } from "react-router-dom";
import DAILY from "./daily";
import WEEKLY from "./weekly";
import MONTHLY from "./monthly";

export default function LandingAll() {
   const [params] = useSearchParams();

  const type = params.get("type") || "ALL";
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
  }

  switch (type) {
    case 'DAILY':
      return <DAILY />
    case 'WEEKLY':
      return <WEEKLY />
    case 'MONTHLY':
      return <MONTHLY />
    case 'ALL':
    default:
    return (
        <div className="container">
        <Header />
        <div className="container mt-5">
      <div className="row justify-content-center g-4">

        <div className="col-md-12">
          <Link to="/?token=&lang=&def=&type=DAILY" className="text-decoration-none text-dark">
            <div className="card text-center h-100">
              <img
                src="/Daily.png"
                className="card-img-top img-fluid" 
                alt="Daily"
              />
              <div className="card-body">
                <h5 className="card-title">DAILY</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-12">
          <Link to="/?token=&lang=&def=&type=WEEKLY" className="text-decoration-none text-dark">
            <div className="card text-center h-100">
              <img
                src="/Weekly.png"
                className="card-img-top img-fluid"
                alt="Weekly"
              />
              <div className="card-body">
                <h5 className="card-title">WEEKLY</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-12">
          <Link to="/?token=&lang=&def=&type=MONTHLY" className="text-decoration-none text-dark">
            <div className="card text-center h-100">
              <img
                src="/Monthly.png"
                className="card-img-top img-fluid"
                alt="Monthly"
              />
              <div className="card-body">
                <h5 className="card-title">MONTHLY</h5>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
        </div>
    );
};  }
