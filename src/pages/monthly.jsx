import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";

function Weekly() {
  const [params] = useSearchParams();
  const token = params.get("token") || localStorage.getItem("token");

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      if (accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://tank-war.mascom.vn/api/auth/gateway/auto-login?token=${token}`
        );

        const data = await res.json();

        if (data?.data?.errorCode === "000000") {
          localStorage.setItem("access_token", data.data.access_token);
          setAccessToken(data.data.access_token);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          console.log("Auto login success");
        } else {
          console.error("Auto login failed", data);
        }
      } catch (err) {
        console.error("Auto login error", err);
      }

      setLoading(false);
    };

    autoLogin();
  }, [token]);

  const handleClickBuy = async () => {
    if (!accessToken) {
      alert("You are not logged in");
      return;
    }

    const body = {
      packageId: "p_15",
      client: "WEB",
    };

    try {
      const res = await fetch(
        "https://tank-war.mascom.vn/api/package/packages/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
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

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          <div className="col-md-12">
            <button
              onClick={handleClickBuy}
              disabled={!accessToken}
              className="text-decoration-none text-dark border-0 bg-transparent w-100"
            >
              <div className="card text-center h-100">
                <img
                  src="/Weekly.png"
                  className="card-img-top img-fluid"
                  alt="Weekly"
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {accessToken ? "SUBSCRIBE NOW" : "LOGIN REQUIRED"}
                  </h5>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weekly;