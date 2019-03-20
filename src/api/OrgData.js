import { OrgSequence, OrgType } from "@/const/index";
const deparments = [
  {
    name: "指挥员",
    orgMajors: ["指挥员"]
  },
  {
    name: "参谋部",
    orgMajors: []
  },
  {
    name: "政治工作部",
    orgMajors: []
  },
  {
    name: "保障部",
    orgMajors: []
  }
];
const deparments1 = [
  {
    name: "指挥员",
    orgMajors: []
  }
];
export const OrgData = [
  {
    orgType: OrgType.Troop,
    orgSequence: OrgSequence.Division,
    deparments
  },
  {
    orgType: OrgType.Troop,
    orgSequence: OrgSequence.Brigade,
    deparments
  },
  {
    orgType: OrgType.Troop,
    orgSequence: OrgSequence.Regiment,
    deparments
  },
  {
    orgType: OrgType.UnitForce,
    orgSequence: OrgSequence.Battalion,
    deparments:deparments1
  },
  {
    orgType: OrgType.UnitForce,
    orgSequence: OrgSequence.Company,
    deparments:deparments1
  }
];

export default OrgData;
