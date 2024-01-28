import { query } from '../../database';

class RolesRepository {
  async findRoleIdByName(roleName: string): Promise<{id: string}> {
    const [row] = await query(`
      SELECT id
      FROM roles
      WHERE roles.name = $1
      `, [roleName]);

    return row as {id: string};
  }

  async createNewRole({
    roleName,
    description,
  }: {roleName: string; description: string }){
    const [row] = await query(`
      INSERT INTO roles
      ("name", description)
      VALUES('$1', '$2');
    `, [roleName, description]);

    return row as {id: string};
  }

  async editRoleById({
    roleId,
    roleName,
    description,
  }: {roleId: string, roleName?: string; description?: string }){
    const [row] = await query(`
      UPDATE roles
      SET "name"='$2', description='$3', updated_at=CURRENT_TIMESTAMP, deleted_at=NULL
      WHERE id='$1';
    `, [roleId, roleName, description]);

    return row as {id: string};
  }

  async deleteRoleById({
    roleId,
  }: {roleId: string, roleName: string; description: string }){
    const [row] = await query(`
      UPDATE roles
      SET deleted_at=CURRENT_TIMESTAMP
      WHERE id='$1;
    `, [roleId]);

    return row as {id: string};
  }

}

export default new RolesRepository();
