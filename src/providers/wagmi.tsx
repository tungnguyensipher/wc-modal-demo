import React, { useContext, FC, PropsWithChildren } from "react";
import { modalConnectors, walletConnectProvider } from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

export const PROJECT_ID =
  process.env.PROJECT_ID ?? "315b74b1f0120a2e7a52beca6425d6eb";

const useWagmiValue = () => {
  const chains = [mainnet, polygon];

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: PROJECT_ID }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: PROJECT_ID,
      version: "1", // or "2"
      appName: "Wallet Connect Demo",
      chains,
    }),
    provider,
  });

  return { chains, provider, wagmiClient };
};

type WagmiContext = ReturnType<typeof useWagmiValue>;

const wagmiContext = React.createContext<WagmiContext | null>(null);

const WagmiProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useWagmiValue();

  return (
    <wagmiContext.Provider value={value}>
      <WagmiConfig client={value.wagmiClient}>{children}</WagmiConfig>
    </wagmiContext.Provider>
  );
};

export const useWagmi = (): WagmiContext => {
  const wagmiValue = useContext(wagmiContext);
  if (!wagmiValue) {
    throw new Error("useWagmi must be used inside WagmiProvider");
  }

  return wagmiValue;
};

export default WagmiProvider;
