import { useContentfulAboutCluey } from "@/queries";
import styled from "styled-components";
import { Row, Column } from "@/shared-components";
import { AboutNavigation } from "@/components";
import { SubtitleBase } from "@/theme/index";
import { theme } from "@/theme/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const Subtitle = styled(SubtitleBase)`
  margin: 8px 0;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.16px;
`

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  margin: 0px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  letter-spacing: -0.14px;
  line-height: 1.36;
  text-align: center;
`

const ClueyTeam = ({ teamMembers }) => {
  return (
    <Container>
      <AboutNavigation />
      <Row flexWrap={"wrap"} gap={"40px"}>
        {teamMembers &&
          teamMembers.length > 0 &&
          teamMembers.map((key, index) => (
            <Column
              width={"140px"}
              align="center"
              key={index}
              margin={"10px 0 0"}
            >
              <img
                src={key.avatar.url}
                style={{ borderRadius: 12, objectFit: "contain" }}
                height="141px"
                width="141px"
              />

              <Subtitle>
                {key.name}
              </Subtitle>
              <Text>
                {key.title}
              </Text>
            </Column>
          ))}
      </Row>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await useContentfulAboutCluey();
  return {
    props: {
      teamMembers: res.teamMembersCollection.items,
      meta: {
        title:
          "Team | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}

export default ClueyTeam;
