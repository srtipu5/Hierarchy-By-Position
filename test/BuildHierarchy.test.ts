import DatabaseClient from "../src/Provider/DatabaseClient";
import { buildHierarchy } from "../src/Action/BuildHierarchy";
import { EmployeeHierarchy } from "../src/Type/EmployeeHierarchy";

describe("BuildHierarchy Action Test", () => {
  beforeAll(async () => {
    await DatabaseClient.connect();
  });

  it("should return array of employee or null", async () => {
    const response = await buildHierarchy(1);
    if (response === null) {
      expect(response).toBeNull();
    } else {
      expect(Array.isArray(response)).toBe(true);
      
      const validateEmployeeHierarchy = (employee: EmployeeHierarchy) => {
        expect(employee).toHaveProperty('id', expect.any(Number));
        expect(employee).toHaveProperty('name', expect.any(String));
        expect(employee).toHaveProperty('positionId', expect.any(Number));
        expect(employee).toHaveProperty('positionName', expect.any(String));
        
        if (employee.child !== null) {
          expect(Array.isArray(employee.child)).toBe(true);
          employee.child.forEach(validateEmployeeHierarchy);
        }
      };
      
      response.forEach(validateEmployeeHierarchy);
    }
  });

  afterAll(() => {
    DatabaseClient.close();
  });
});
