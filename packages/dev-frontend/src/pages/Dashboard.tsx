import React from "react";
import { Container } from "theme-ui";

import { Trove } from "../components/Trove/Trove";
import { Stability } from "../components/Stability/Stability";
import { SystemStats } from "../components/SystemStats";
import { ImtblControls } from "../components/ImtblControls";
import { PriceManager } from "../components/PriceManager";
import { Staking } from "../components/Staking/Staking";
import { BondsTable } from "../components/Bonds/BondsTable";

export const Dashboard: React.FC = () => {
  const featuresVisibilityKey = "feature-visibility";
  const params = new URLSearchParams(window.location.search);
  const feature = JSON.parse(
    localStorage.getItem(featuresVisibilityKey) ||
      JSON.stringify({"bonds": true, "trove": true, "sp": true, "staking": true })
  );
  const show = (key:any) => params.get(key) !== "0" && feature[key];
  return (
        <Container variant="columns">
            <Container variant="left">
                {show("trove") && <Trove />}
                {show("sp") && <Stability />}
                {show("staking") && <Staking />}
                {show("bonds") && <BondsTable />}
            </Container>

            <Container variant="right">
                <SystemStats />
                <ImtblControls />
                <PriceManager />
            </Container>
        </Container>
  );
};
