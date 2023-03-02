"use client";

import React, { FC } from "react";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";

import styles from "./page.module.css";
import { PROJECT_ID, useWagmi } from "@providers/wagmi";
import Center from "@components/shared/Center";
import WagmiProvider from "@providers/wagmi";
import { useSignMessage } from "wagmi";

const WcUi: FC = () => {
  const { chains, wagmiClient } = useWagmi();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Hello World!",
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <main className={styles.main}>
        <Center>
          <Web3Button balance="show" />

          <button
            disabled={isLoading}
            className={styles.button}
            onClick={() => signMessage()}
          >
            {isLoading ? "Signing..." : "Sign Message"}
          </button>

          {isSuccess && <div>Signature: {data}</div>}
          {isError && <div>Error signing message</div>}
        </Center>
      </main>

      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </>
  );
};

const WcPage: FC = () => {
  return (
    <WagmiProvider>
      <WcUi />
    </WagmiProvider>
  );
};

export default WcPage;
