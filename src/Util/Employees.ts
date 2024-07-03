export const employees = [
  { id: 1, name: "Name 1", positionId: 1, positionName: "CTO" },
  {
    id: 2,
    name: "Name 2",
    positionId: 2,
    positionName: "Senior software eng",
    parentId: 1,
  },
  {
    id: 3,
    name: "Name 3",
    positionId: 3,
    positionName: "Software eng",
    parentId: 2,
  },
  {
    id: 4,
    name: "Name 4",
    positionId: 4,
    positionName: "Junior software eng",
    parentId: 3,
  },
  {
    id: 5,
    name: "Name 5",
    positionId: 2,
    positionName: "Senior software eng",
    parentId: 1,
  },
  {
    id: 6,
    name: "Name 6",
    positionId: 3,
    positionName: "Software eng",
    parentId: 5,
  },
];
