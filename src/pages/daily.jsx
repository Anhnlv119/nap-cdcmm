import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";

function Daily() {
  const [params] = useSearchParams();
  const token = params.get("token") || localStorage.getItem("token");
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token || access_token) return;

    console.log("Trying to login")

    const autoLogin = async () => {
      try {
        const res = await fetch(
          `https://tank-war.mascom.vn/api/auth/gateway/auto-login?token=${token}`,
          { method: "GET" }
        );

        const data = await res.json();
        console.log("Data: ", data);
        console.log("Data.data: ", data.data)
        console.log("data.data.status ", data.data.status)
        console.log("data.success", data.success)

        if (data.data.status === "success") {
          localStorage.setItem("access_token", data.data.access_token);
          console.log("Auto login success");

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } else {
          console.error("Auto login failed", data);
        }
      } catch (err) {
        console.error("Auto login error", err);
      }
    };

    autoLogin();
  }, [token, access_token]);

  const handleClickBuy = async () => {
    if (!access_token) {
      alert("You are not logged in");
      return;
    }

    const body = {
      packageId: "p_16",
      client: "WEB"
    };

    try {
      const res = await fetch(
        "https://tank-war.mascom.vn/api/package/packages/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Buy package failed");
      }

      alert("Buy package success!");

      setTimeout(() => {
        window.location.href =
          "mytel://webgamemyid?ref=http%3A%2F%2Ftelco-gw.mascom.vn%2Fgateway-service%2Fv1%2Fgame%2Fsuper-app%2Flogin%3Fgame-code%3DTANKS";
      }, 500);
    } catch (err) {
      alert("Fail buy package: " + err.message);
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
