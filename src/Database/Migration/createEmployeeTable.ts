import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm";

export class CreateEmployeeTable1632254622277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "employee",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar" },
                { name: "positionId", type: "int" },
                { name: "positionName", type: "varchar" },
                { name: "parentId", type: "int", isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
            
            ]
        }));

        // Adding foreign key constraint for parent relationship
        await queryRunner.createForeignKey("employee", new TableForeignKey({
            columnNames: ["parentId"],
            referencedColumnNames: ["id"],
            referencedTableName: "employee",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint first
        const employeeTable = await queryRunner.getTable("employee");
        const foreignKey = employeeTable?.foreignKeys.find(fk => fk.columnNames.indexOf("parentId") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("employee", foreignKey);
        }

        // Drop the employee table
        await queryRunner.dropTable("employee");
    }

}
