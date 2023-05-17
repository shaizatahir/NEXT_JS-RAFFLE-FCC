import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
    enableWeb3();
    console.log("Hi");
    console.log(isWeb3Enabled);
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  });
  return (
    <div className="bg-bg-light mt-0 pt-0">
      <div className="m-8 pt-10 flex justify-between bg-bg-light">
        <h2 className="text-2xl font-medium text-tx-black">Raffle</h2>
        {account ? (
          <div>
            Connected to {account.slice(0, 6)}...{account.slice(0, 4)}
          </div>
        ) : (
          <button
            className="rounded px-8 py-4 bg-bt-brown text-white"
            onClick={async () => {
              await enableWeb3();
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
              }
            }}
            disabled={isWeb3EnableLoading}
          >
            Connect
          </button>
        )}
      </div >
      
    </div>
  );
}
