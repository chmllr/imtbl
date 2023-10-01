import React from "react";
import { Text, Flex, Box, Heading, Button } from "theme-ui";

import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

import { COIN, GT } from "../strings";
import { useLiquity } from "../hooks/LiquityContext";
import { shortenAddress } from "../utils/shortenAddress";

import { Icon } from "./Icon";
import { ConnectKitButton } from "connectkit";

const select = ({ accountBalance, lusdBalance, lqtyBalance }: LiquityStoreState) => ({
    accountBalance,
    lusdBalance,
    lqtyBalance
});

export const UserAccount: React.FC = () => {
    const { account } = useLiquity();
    const { accountBalance, lusdBalance: realLusdBalance, lqtyBalance } = useLiquitySelector(select);

    const lusdBalance = realLusdBalance;

    return (
        <Flex>
            <ConnectKitButton.Custom>
                {connectKit => (
                    <Button
                        variant="outline"
                        sx={{ alignItems: "center", p: 2, mr: 3 }}
                        onClick={connectKit.show}
                    >
                        <Icon name="user-circle" size="lg" />
                        <Text as="span" sx={{ ml: 2, fontSize: 1 }}>
                            {shortenAddress(account)}
                        </Text>
                    </Button>
                )}
            </ConnectKitButton.Custom>

            <Box
                sx={{
                    display: ["none", "flex"],
                    alignItems: "center"
                }}
            >
                <Icon name="wallet" size="lg" />

                {([
                    ["ETH", accountBalance],
                    [COIN, Decimal.from(lusdBalance || 0)],
                    [GT, Decimal.from(lqtyBalance)]
                ] as const).map(([currency, balance], i) => (
                    <Flex key={i} sx={{ ml: 3, flexDirection: "column" }}>
                        <Heading sx={{ fontSize: 1 }}>{currency}</Heading>
                        <Text sx={{ fontSize: 1 }}>{balance.prettify()}</Text>
                    </Flex>
                ))}
            </Box>
        </Flex>
    );
};
