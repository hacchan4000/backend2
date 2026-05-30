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
  pgm.createTable('applications',{
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)', onDelete: 'CASCADE',},
    job_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'jobs(id)', onDelete: 'CASCADE',},
    status:{  type: 'TEXT', notNull: true},
    created_at:{ type: 'TIMESTAMP', notNull: true, default:pgm.func('current_timestamp')}
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('applications');
};
