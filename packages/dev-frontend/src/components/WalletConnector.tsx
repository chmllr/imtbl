import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "./Icon";

type WalletConnectorProps = React.PropsWithChildren<{
  loader?: React.ReactNode;
}>;

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
    return (
        <ConnectKitButton.Custom>
            {connectKit =>
                connectKit.isConnected ? (
                    children
                ) : (
                    <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ display: "flex", maxWidth: "70%", flexDirection: "column" }}>
                            <h1 style={{ textAlign: "center", fontFamily: "Impact, sans-serif" }}>
                                IMTBL <span style={{ opacity: 0.5 }}>V2</span>
                            </h1>
                            <Box sx={{ textAlign: "center" }}>
                                A fully <b>immutable</b>{" "}
                                <a
                                    style={{ textDecoration: "none", color: "#28c081" }}
                                    href="https://liquity.org"
                                >
                                    Liquity
                                </a>{" "}
                                frontend running on the{" "}
                                <a
                                    style={{ textDecoration: "none", color: "#28c081" }}
                                    href="https://internetcomputer.org"
                                >
                                    Internet Computer
                                </a>
                                .
                                <div
                                    style={{
                                        marginTop: "2em",
                                        fontSize: "small",
                                        width: "100%",
                                        textAlign: "center"
                                    }}
                                >
                                    <a
                                        style={{ textDecoration: "none", color: "#28c081" }}
                                        href="https://taggr.link/#/journal/imtbl"
                                    >
                                        Blog
                                    </a>
                                    &nbsp;&bull;&nbsp;
                                    <a
                                        style={{ textDecoration: "none", color: "#28c081" }}
                                        href="https://github.com/chmllr/imtbl"
                                    >
                                        Code
                                    </a>
                                    &nbsp;&bull;&nbsp;
                                    <a
                                        style={{ textDecoration: "none", color: "#28c081" }}
                                        href="https://dashboard.internetcomputer.org/canister/vgbso-kaaaa-aaaap-ablqq-cai"
                                    >
                                        Hash
                                    </a>
                                    &nbsp;&bull;&nbsp;
                                    <a
                                        style={{ textDecoration: "none", color: "#28c081" }}
                                        href="https://vgbso-kaaaa-aaaap-ablqq-cai.icp0.io"
                                    >
                                        Direct Link
                                    </a>
                                    &nbsp;&bull;&nbsp;
                                    <a
                                        style={{ textDecoration: "none", color: "#28c081" }}
                                        href="https://vfu7d-vyaaa-aaaap-aajiq-cai.icp0.io"
                                    >
                                        V1
                                    </a>
                                </div>
                                {Number(new Date()) < 1698796800000 && (
                                    <div
                                        style={{
                                            background: "orange",
                                            color: "black",
                                            padding: "1em",
                                            borderRadius: "5px",
                                            marginTop: "2em"
                                        }}
                                    >
                                        This is a new frontend version V2 (changes described{" "}
                                        <a
                                            href="https://taggr.link/journal/imtbl"
                                            style={{ color: "black" }}
                                        >
                                            here
                                        </a>
                                        ).
                                        <br />
                                        To keep using the previous version, click{" "}
                                        <a
                                            href="https://vfu7d-vyaaa-aaaap-aajiq-cai.icp0.io"
                                            style={{ color: "black" }}
                                        >
                                            here
                                        </a>
                                        .
                                    </div>
                                )}
                                <Button
                                    onClick={connectKit.show}
                                    style={{
                                        marginTop: "3em",
                                        marginBottom: "4em",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}
                                >
                                    <Icon name="plug" size="lg" />
                                    <Box sx={{ ml: 2 }}>Connect wallet</Box>
                                </Button>
                                <a
                                    style={{
                                        marginTop: "4em",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}
                                    href="https://internetcomputer.org"
                                >
                                    <img
                                        alt="Built on the Internet Computer"
                                        max-width="80%"
                                        src="ic.svg"
                                    />
                                </a>
                            </Box>
                        </div>
                    </Flex>
                )
            }
        </ConnectKitButton.Custom>
    );
};
