import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";

function Daily() {
  const [params] = useSearchParams();

  const token = params.get("token") || localStorage.getItem("token");

  const handleClickBuy = async () => {
    if (!token) {
      alert("Cannot buy package: missing token");
      return;
    }

    const body = {
      token: token,
      packageId: "p_16",
    };

    try {
      const res = await fetch("https://YOUR_API_DOMAIN/packages/buy-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Buy package failed");
      }

      console.log("BUY SUCCESS:", data);
      alert("Buy package success!");

      setTimeout(() => {
        window.location.href =
          "mytel://webgamemyid?ref=http%3A%2F%2Ftelco-gw.mascom.vn%2Fgateway-service%2Fv1%2Fgame%2Fsuper-app%2Flogin%3Fgame-code%3DTANKS";
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Fall buy package: " + err.message);
    }
  };
  return (
    <div className="container">
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          <div className="col-md-12">
            <button
              onClick={handleClickBuy}
              className="text-decoration-none text-dark"
            >
              <div className="card text-center h-100">
                <img
                  src="/Daily.png"
                  className="card-img-top img-fluid"
                  alt="Daily"
                />
                <div className="card-body">
                  <h5 className="card-title">SUBSCRIBE NOW</h5>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Daily;
