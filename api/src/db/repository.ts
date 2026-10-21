import pg from "pg";
import type { BirthdayMessage } from "../types.js";

export interface BirthdayRepository {
  list(): Promise<BirthdayMessage[]>;
  getById(id: string): Promise<BirthdayMessage | null>;
}

// to_char returns the date as a plain "YYYY-MM-DD" string, so pg never
// builds a JS Date and there is no timezone shift.
const COLUMNS = "id, name, to_char(birthday, 'YYYY-MM-DD') AS birthday";

export function createPgRepository(pool: pg.Pool): BirthdayRepository {
  return {
    async list() {
      const { rows } = await pool.query<BirthdayMessage>(
        `SELECT ${COLUMNS} FROM birthday ORDER BY name, id`
      );
      return rows;
    },
    async getById(id) {
      const { rows } = await pool.query<BirthdayMessage>(
        `SELECT ${COLUMNS} FROM birthday WHERE id = $1`,
        [id]
      );
      return rows[0] ?? null; // rows[0] is possibly undefined under strict indexing
    },
  };
}