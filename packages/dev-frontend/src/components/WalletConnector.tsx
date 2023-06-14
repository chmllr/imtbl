import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Link } from "../Link";
import { Icon } from "./Icon";

type WalletConnectorProps = {
  loader?: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
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
            <Link href="https://taggr.link/#/journal/imtbl">Blog</Link>
        &nbsp;&bull;&nbsp;
        <Link href="https://github.com/chmllr/imtbl">Code</Link>
        &nbsp;&bull;&nbsp;
        <Link href="https://dashboard.internetcomputer.org/canister/vfu7d-vyaaa-aaaap-aajiq-cai">Canister</Link>
        &nbsp;&bull;&nbsp;
        <Link href="https://vfu7d-vyaaa-aaaap-aajiq-cai.icp0.io">Direct IC Link</Link>
        </div>
        </Box>
        </div>
        </Flex>
        <ConnectKitButton.Custom>
            {connectKit =>
                connectKit.isConnected ? (
                    children
                ) : (
                    <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                        <Button onClick={connectKit.show}>
                            <Icon name="plug" size="lg" />
                            <Box sx={{ ml: 2 }}>Connect wallet</Box>
                </Button>
                </Flex>
            )
            }
        </ConnectKitButton.Custom>
            <Link style={{ marginTop: "4em", marginLeft: "auto", marginRight: "auto"}} href="https://internetcomputer.org">
            <img alt="Built on the Internet Computer" width="100%" src="ic.svg" />
        </Link>
        </>
);
};
