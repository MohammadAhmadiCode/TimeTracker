import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

import Page from "../components/page";
import { Context } from "../components/context";

const Summary = () => {
  const { state, dispatch } = useContext(Context);
  const canvasRef = useRef(null);

  // strings.setLanguage(state.language);

  const getLabels = (entries) => {
    let titles = [];
    entries.map((entry) => titles.push(...entry.titles));
    return [...new Set(titles)];
  };

  const getDatasets = (entries) => {
    const labels = getLabels(entries);
    let datasets = [];
    labels.map((label) => {
      const labeledEntries = [
        ...entries.filter((entry) => entry.titles.includes(label)),
      ];
      let totalTime = 0;
      labeledEntries.map((entry) => {
        totalTime += entry.end - entry.start;
      });
      datasets.push(totalTime / 1000 / 60 / 60);
    });
    return datasets;
  };

  const getTotalTime = (entries) => {
    let totalTime = 0;
    entries.map((entry) => {
      totalTime += entry.end - entry.start;
    });
    totalTime = totalTime / 1000 / 60 / 60;
    return Math.round(totalTime * 100) / 100;
  };

  useEffect(() => {
    if (state.log.length <= 0) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: getLabels(state.log),
        datasets: [
          {
            label: "# of Hours",
            data: getDatasets(state.log),
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Page titles="Summary">
      <Grid>
        <Main className={state.log.length <= 0 ? "empty" : ""} tabIndex="1">
          {state.log.length > 0 ? (
            <>
              <Title>Summary</Title>
              <p>Total number of hours spent across all titles.</p>
              <TotalTime>{getTotalTime(state.log)} hours</TotalTime>
              <p>The number of hours you've spent per-titles.</p>
              <CanvasWrapper>
                <canvas ref={canvasRef} />
              </CanvasWrapper>
            </>
          ) : (
            <Nothing>Your log is empty.</Nothing>
          )}
        </Main>
      </Grid>
    </Page>
  );
};

export default Summary;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  width: 100%;
  height: 100vh;
`;

const Main = styled.main`
  grid-area: 1/2;

  &.empty {
    grid-area: 1/2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 6em;
  margin-bottom: 2rem;
`;

const CanvasWrapper = styled.div`
  background-color: white;
  padding: 0.25rem;
  margin-bottom: 2rem;
`;

const TotalTime = styled.div`
  font-size: 4em;
  font-weight: 900;
  margin-bottom: 3rem;
`;

const Nothing = styled.div`
  font-weight: 100;
  font-size: 2.5em;
  text-align: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -15px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.two};
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.4em;
  }
`;
