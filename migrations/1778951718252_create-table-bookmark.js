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
  pgm.createTable('bookmarks',{
    id:{ type: 'VARCHAR(50)', primaryKey: true},
    user_id:{ type: 'VARCHAR(50)', notNull: true ,references: 'users(id)', onDelete: 'CASCADE',},
    job_id:{ type: 'TEXT', notNull: true ,references: 'jobs(id)', onDelete: 'CASCADE',},
    created_at:{type: 'TIMESTAMP', default: pgm.func('CURRENT_TIMESTAMP'), notNull: true,}

  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('bookmarks');
};

