export interface EmployeeHierarchy {
    id: number;
    name: string;
    positionId: number;
    positionName: string;
    child: EmployeeHierarchy[] | null;
  }