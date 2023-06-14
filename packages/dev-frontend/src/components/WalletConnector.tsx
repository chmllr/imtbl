import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "./Icon";

type WalletConnectorProps = {
  loader?: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
    return (
        <ConnectKitButton.Custom>
            {connectKit =>
                connectKit.isConnected ? (
                    children
                ) : (
                    <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                        <div style={{display: "flex", maxWidth: "70%", flexDirection: "column" }}>
                            <h1 style={{textAlign: "center", fontFamily: "Impact, sans-serif"}}>IMTBL</h1>
                            <Box sx={{textAlign: "center"}}>
                A fully <b>immutable</b> <a style={{textDecoration: 'none', color: "#28c081"}} href="https://liquity.org">Liquity</a> frontend running on the <a style={{textDecoration: 'none', color: "#28c081"}} href="https://internetcomputer.org">Internet Computer</a>.
                                <div style={{marginTop: "2em", fontSize: "small", width: "100%", textAlign: "center" }}>
                                    <a style={{textDecoration: 'none', color: "#28c081"}} href="https://taggr.link/#/journal/imtbl">Blog</a>
                                    &nbsp;&bull;&nbsp;
                                    <a style={{textDecoration: 'none', color: "#28c081"}} href="https://github.com/chmllr/imtbl">Code</a>
                                    &nbsp;&bull;&nbsp;
                                    <a style={{textDecoration: 'none', color: "#28c081"}} href="https://dashboard.internetcomputer.org/canister/vfu7d-vyaaa-aaaap-aajiq-cai">Canister</a>
                                    &nbsp;&bull;&nbsp;
                                    <a style={{textDecoration: 'none', color: "#28c081"}} href="https://vfu7d-vyaaa-aaaap-aajiq-cai.icp0.io">Direct IC Link</a>
                                </div>
                                <Button onClick={connectKit.show}
                                    style={{marginTop: "4em", marginBottom: "4em",  marginLeft: "auto", marginRight: "auto"}}>
                                    <Icon name="plug" size="lg" />
                                    <Box sx={{ ml: 2 }}>Connect wallet</Box>
                                </Button>
                                <a style={{ marginTop: "4em", marginLeft: "auto", marginRight: "auto"}} href="https://internetcomputer.org">
                                    <img alt="Built on the Internet Computer" width="70%" src="ic.svg" />
                                </a>
                            </Box>
                        </div>
                </Flex>
            )}
        </ConnectKitButton.Custom>
    );
};
