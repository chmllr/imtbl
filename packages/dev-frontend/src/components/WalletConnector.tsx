import React, { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Button, Text, Flex, Link, Box } from "theme-ui";

import { injectedConnector } from "../connectors/injectedConnector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useAuthorizedConnection } from "../hooks/useAuthorizedConnection";
import { getConfig } from "../config/";

import { RetryDialog } from "./RetryDialog";
import { ConnectionConfirmationDialog } from "./ConnectionConfirmationDialog";
import { MetaMaskIcon, WalletConnectIcon, CoinbaseIcon } from "./Icons";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

interface MaybeHasMetaMask {
  ethereum?: {
    isMetaMask?: boolean;
  };
}

type ConnectionState =
  | { type: "inactive" }
  | {
      type: "activating" | "active" | "rejectedByUser" | "alreadyPending" | "failed";
      connector: AbstractConnector;
    };

type ConnectionAction =
  | { type: "startActivating"; connector: AbstractConnector }
  | { type: "fail"; error: Error }
  | { type: "finishActivating" | "retry" | "cancel" | "deactivate" };

const connectionReducer: React.Reducer<ConnectionState, ConnectionAction> = (state, action) => {
  switch (action.type) {
    case "startActivating":
      return {
        type: "activating",
        connector: action.connector
      };
    case "finishActivating":
      return {
        type: "active",
        connector: state.type === "inactive" ? injectedConnector : state.connector
      };
    case "fail":
      if (state.type !== "inactive") {
        return {
          type: action.error.message.match(/user rejected/i)
            ? "rejectedByUser"
            : action.error.message.match(/already pending/i)
            ? "alreadyPending"
            : "failed",
          connector: state.connector
        };
      }
      break;
    case "retry":
      if (state.type !== "inactive") {
        return {
          type: "activating",
          connector: state.connector
        };
      }
      break;
    case "cancel":
      return {
        type: "inactive"
      };
    case "deactivate":
      return {
        type: "inactive"
      };
  }

  console.warn("Ignoring connectionReducer action:");
  console.log(action);
  console.log("  in state:");
  console.log(state);

  return state;
};

const detectMetaMask = () => (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false;

type WalletConnectorProps = {
  loader?: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children, loader }) => {
  const { activate, deactivate, active, error } = useWeb3React<unknown>();
  const triedAuthorizedConnection = useAuthorizedConnection();
  const [connectionState, dispatch] = useReducer(connectionReducer, { type: "inactive" });
  const isMetaMask = detectMetaMask();

  useEffect(() => {
    if (error) {
      dispatch({ type: "fail", error });
      deactivate();
    }
  }, [error, deactivate]);

  useEffect(() => {
    if (active) {
      dispatch({ type: "finishActivating" });
    } else {
      dispatch({ type: "deactivate" });
    }
  }, [active]);

  if (!triedAuthorizedConnection) {
    return <>{loader}</>;
  }

  if (connectionState.type === "active") {
    return <>{children}</>;
  }

    return (
        <>
            <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <div style={{display: "flex", maxWidth: "70%", flexDirection: "column" }}>
                    <h1 style={{textAlign: "center", fontFamily: "Impact, sans-serif"}}>IMTBL</h1>
                    <Box sx={{textAlign: "center"}}>
                        A fully <b>immutable</b> <Link href="https://liquity.org">Liquity</Link> frontend running on the <Link href="https://internetcomputer.org">Internet Computer</Link>.
                        <br />
                        <br />
                        <div style={{marginTop: "2em", fontSize: "small", width: "100%", textAlign: "center" }}>
                            <Link href="https://taggr.top/#/journal/imtbl">Blog</Link>
                            &nbsp;&bull;&nbsp;
                            <Link href="https://github.com/chmllr/imtbl-be">GitHub</Link>
                            &nbsp;&bull;&nbsp;
                            <Link href="https://dashboard.internetcomputer.org/canister/vfu7d-vyaaa-aaaap-aajiq-cai">Canister Id</Link>
                        </div>
                    </Box>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "auto", marginTop: "4em" }}>
                        <Button
                            onClick={async () => {
                                const config = await getConfig();
                                const params = {
                                    infuraId: config.infuraApiKey,
                                    bridge: "https://bridge.walletconnect.org",
                                    qrcode: true,
                                };
                                const WalletConnect = new WalletConnectConnector(params);
                                activate(WalletConnect);
                            }}><WalletConnectIcon />
                            <Box sx={{ ml: 2 }}>WalletConnect</Box>
                        </Button>
                        &nbsp;
                        <Button
                            onClick={() => {
                                dispatch({ type: "startActivating", connector: injectedConnector });
                                activate(injectedConnector);
                            }}
                        >
                            {isMetaMask ? (
                                <>
                                    <MetaMaskIcon />
                                    <Box sx={{ ml: 2 }}>Connect to MetaMask</Box>
                                </>
                            ) : (
                                <>
                                    <Icon name="plug" size="lg" />
                                    <Box sx={{ ml: 2 }}>Connect wallet</Box>
                                </>
                            )}
                        </Button>
                        &nbsp;
                        <Button
                            onClick={async () => {
                                const config = await getConfig();
                                const CoinbaseWallet = new WalletLinkConnector({
                                    url: `https://mainnet.infura.io/v3/${config.infuraApiKey}`,
                                    appName: "IMTBL",
                                    supportedChainIds: [1, 3, 4, 5, 42]
                                });
                                activate(CoinbaseWallet);
                            }}>
                            <CoinbaseIcon />
                            <Box sx={{ ml: 2 }}>Coinbase</Box>
                        </Button>
                    </div>
                    <Link style={{ marginTop: "4em", marginLeft: "auto", marginRight: "auto"}} href="https://internetcomputer.org">
                        <img alt="Built on the Internet Computer" width="100%" src="ic.svg" />
                    </Link>
                </div>
            </Flex>

            {connectionState.type === "failed" && (
                <Modal>
                    <RetryDialog
                        title={isMetaMask ? "Failed to connect to MetaMask" : "Failed to connect wallet"}
                        onCancel={() => dispatch({ type: "cancel" })}
                        onRetry={() => {
                            dispatch({ type: "retry" });
                            activate(connectionState.connector);
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            You might need to install MetaMask or use a different browser.
                        </Box>
                        <Link sx={{ lineHeight: 3 }} href="https://metamask.io/download.html" target="_blank">
                            Learn more <Icon size="xs" name="external-link-alt" />
                        </Link>
                    </RetryDialog>
                </Modal>
            )}

            {connectionState.type === "activating" && (
                <Modal>
                    <ConnectionConfirmationDialog
                        title={
                            isMetaMask ? "Confirm connection in MetaMask" : "Confirm connection in your wallet"
                        }
                        icon={isMetaMask ? <MetaMaskIcon /> : <Icon name="wallet" size="lg" />}
                        onCancel={() => dispatch({ type: "cancel" })}
                    >
                        <Text sx={{ textAlign: "center" }}>
                            Confirm the request that&apos;s just appeared.
                            {isMetaMask ? (
                                <> If you can&apos;t see a request, open your MetaMask extension via your browser.</>
                            ) : (
                                <> If you can&apos;t see a request, you might have to open your wallet.</>
                            )}
                        </Text>
                    </ConnectionConfirmationDialog>
                </Modal>
            )}

            {connectionState.type === "rejectedByUser" && (
                <Modal>
                    <RetryDialog
                        title="Cancel connection?"
                        onCancel={() => dispatch({ type: "cancel" })}
                        onRetry={() => {
                            dispatch({ type: "retry" });
                            activate(connectionState.connector);
                        }}
                    >
                        <Text>To use Liquity, you need to connect your Ethereum account.</Text>
                    </RetryDialog>
                </Modal>
            )}

            {connectionState.type === "alreadyPending" && (
                <Modal>
                    <RetryDialog
                        title="Connection already requested"
                        onCancel={() => dispatch({ type: "cancel" })}
                        onRetry={() => {
                            dispatch({ type: "retry" });
                            activate(connectionState.connector);
                        }}
                    >
                        <Text>Please check your wallet and accept the connection request before retrying.</Text>
                    </RetryDialog>
                </Modal>
            )}
        </>
    );
};
