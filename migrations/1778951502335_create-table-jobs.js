// data pekerjaan
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('jobs',{
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    category_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'categories(id)', onDelete: 'CASCADE',},
    company_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'companies(id)', onDelete: 'CASCADE',},
    title:{  type: 'TEXT', notNull: true },
    salary:{  type: 'TEXT', notNull: true },
    status:{  type: 'TEXT', notNull: true },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('jobs');
};
