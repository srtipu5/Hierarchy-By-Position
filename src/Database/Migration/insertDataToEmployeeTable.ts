import { MigrationInterface, QueryRunner } from "typeorm";
import { employees } from "../../Util/Employees";

export class InsertEmployeeData1623000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        for (const employee of employees) {
            const { id, name, positionId, positionName, parentId } = employee;
            await queryRunner.query(`
                INSERT INTO employee (id, name, "positionId", "positionName", "parentId")
                VALUES (${id}, '${name}', ${positionId}, '${positionName}', ${parentId ? parentId : 'NULL'});
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        const employeeIds = employees.map(employee => employee.id);

        for (const id of employeeIds) {
            await queryRunner.query(`
                DELETE FROM employee WHERE id = ${id};
            `);
        }
    }
}
