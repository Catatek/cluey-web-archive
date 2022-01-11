import styled from "styled-components";
import { AboutNavigation } from "@/components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const UpcomingFeatures = () => {
  return (
    <Container>
      <AboutNavigation />
    </Container>
  );
};

export default UpcomingFeatures;
