import { EmployeeModel } from "../Database/Model/Employee";
import { EmployeeHierarchy } from "../Type/EmployeeHierarchy";

export const buildHierarchy = async (id: number): Promise<EmployeeHierarchy[] | null> => {
  const employees: EmployeeModel[] = await EmployeeModel.find();

  const employeeMap = new Map<number, EmployeeHierarchy>();
  employees.forEach((emp) => {
    employeeMap.set(emp.id, {
      id: emp.id,
      name: emp.name,
      positionId: emp.positionId,
      positionName: emp.positionName,
      child: []
    });
  });

  const hierarchy: EmployeeHierarchy[] = [];

  employees.forEach((emp) => {
    if (emp.id === id) {
      hierarchy.push(employeeMap.get(emp.id)!);
    } else {
      const parent = employeeMap.get(emp.parentId!);
      if (parent) {
        parent.child!.push(employeeMap.get(emp.id)!);
      }
    }
  });

  // Function to remove empty child arrays and replace them with null
  const removeEmptyChild = (node: EmployeeHierarchy) => {
    if (node.child && node.child.length === 0) {
      node.child = null;
    } else if (node.child) {
      node.child.forEach(removeEmptyChild);
    }
  };

  hierarchy.forEach(removeEmptyChild);

  return hierarchy.length > 0 ? hierarchy[0].child : null;
};
