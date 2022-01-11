export const tagData = (tagName) => {
  let data = {};
  switch (tagName) {
    case "Civic Alliance Member":
      data = {
        white: true,
        toolTip:
          "Members are committed to increasing civic engagement by empowering U.S employees with resources and workplace policies to participate civically and work towards higher voter turnout.",
      };
      break;
    case "RE100 Member":
      data = {
        white: true,
        toolTip:
          "Members are committed to driving transition to 100% renewable electricity and must meet joining and technical criteria.",
      };
      break;
    case "Best Place to Work for LGBTQ Equality":
      data = {
        white: false,
        toolTip:
          "Recognized by the Human Rights Campaign (HRC) as a company that has taken concrete steps to establish and implement comprehensive policies, benefits and practices that ensure greater equity for LGBTQ workers and their families.",
      };
      break;
    case "Employee Ownership":
      data = {
        white: false,
        toolTip:
          "These Companies offer an employee stock ownership plan (ESOP) as a method to provide the company’s workforce with an ownership interest in the company.",
      };
      break;
    default:
      data = {};
      break;
  }
  return data;
};
