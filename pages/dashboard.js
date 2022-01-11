import {
  CurrentFootprint,
  ProfileCompletion,
  Portfolio,
} from "@/dashboard-components";
import styled from "styled-components";
import withAuth from "HOC/withAuth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const Dashboard = () => {
  return (
    <Container>
      <CurrentFootprint />
      <ProfileCompletion profileCompletionStatus="Beginner" />
      <Portfolio />
    </Container>
  );
};

export default withAuth(Dashboard);

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title:
          "Dashboard | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}
