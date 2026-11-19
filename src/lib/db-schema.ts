import mysql from 'mysql2/promise';

export interface ColumnDefinition {
  name: string;
  definition: string; // e.g. "VARCHAR(150) NOT NULL DEFAULT 'val'"
  isPrimary?: boolean;
}

export interface TableSchema {
  name: string;
  columns: ColumnDefinition[];
  seedData?: any[];
  uniqueCheckColumn?: string;
}

// ======================================================================
// DECLARATIVE TABLE SCHEMAS REGISTRY
// Any table defined here will be automatically created in Laragon MySQL.
// If new columns are added, they are automatically migrated via ALTER TABLE.
// ======================================================================
export const TABLE_SCHEMAS: Record<string, TableSchema> = {
  admin_users: {
    name: 'admin_users',
    uniqueCheckColumn: 'email',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'email', definition: 'VARCHAR(191) NOT NULL UNIQUE' },
      { name: 'password', definition: 'VARCHAR(255) NOT NULL' },
      { name: 'name', definition: "VARCHAR(100) NOT NULL DEFAULT 'Administrator'" },
      { name: 'role', definition: "VARCHAR(50) NOT NULL DEFAULT 'Super Admin'" },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
    ],
    seedData: [
      { email: 'admin@tpitgroup.com', password: 'admin123', name: 'TP IT Admin', role: 'Super Admin' },
    ],
  },

  team_members: {
    name: 'team_members',
    uniqueCheckColumn: 'name',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'name', definition: 'VARCHAR(150) NOT NULL' },
      { name: 'role', definition: 'VARCHAR(150) NOT NULL' },
      { name: 'sub_role', definition: 'TEXT NULL' },
      { name: 'bio', definition: 'TEXT NULL' },
      { name: 'image', definition: 'VARCHAR(255) NULL' },
      { name: 'department', definition: 'VARCHAR(100) NULL' },
      { name: 'display_order', definition: 'INT NOT NULL DEFAULT 0' },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ],
    seedData: [
      {
        name: 'Karthik Pushpa',
        role: 'CEO & Founder',
        sub_role: '15+ Years in Enterprise IT Strategy, Cloud Transformations & Digital Transformation',
        bio: "Karthik guides TP IT Group's enterprise strategy, bringing business priorities together with cloud modernization and digital transformation.",
        image: '/team/karthik.jpg',
        department: 'TP IT Group LLC',
        display_order: 1,
      },
      {
        name: 'Gayathri Devi',
        role: 'Director of Operations',
        sub_role: 'Ensures seamless project delivery and client satisfaction.',
        bio: 'Gayathri brings structure to project operations, keeping delivery teams and client expectations aligned.',
        image: '/team/gayathri.jpg',
        department: 'Project & Operations',
        display_order: 2,
      },
      {
        name: 'Lakshmi Bhargavi',
        role: 'CTO',
        sub_role: 'Cloud architecture expert with deep AWS, GCP and Azure expertise.',
        bio: 'Lakshmi shapes the technical direction of cloud solutions across AWS, Google Cloud and Azure.',
        image: '/team/lakshmi.jpg',
        department: 'Cloud & Deep-Tech',
        display_order: 3,
      },
      {
        name: 'Sai Deepa',
        role: 'VP of Engineering',
        sub_role: 'Leads our development teams across custom apps and ERP solutions.',
        bio: 'Sai leads engineering across custom applications and ERP solutions, connecting technical teams with project goals.',
        image: '/team/sai-deepa.jpg',
        department: 'Engineering & Apps',
        display_order: 4,
      },
      {
        name: 'E S VIJAYAN',
        role: 'Director of Business Development',
        sub_role: 'Ensures seamless project delivery, Business Growth and client satisfaction.',
        bio: 'Vijayan connects business growth with client needs, helping shape conversations into focused project opportunities.',
        image: '/team/vijayan.jpg',
        department: 'Business & Growth',
        display_order: 5,
      },
    ],
  },

  clients: {
    name: 'clients',
    uniqueCheckColumn: 'name',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'name', definition: 'VARCHAR(150) NOT NULL' },
      { name: 'src', definition: 'VARCHAR(255) NOT NULL' },
      { name: 'category', definition: "VARCHAR(100) NOT NULL DEFAULT 'Enterprise Partner'" },
      { name: 'display_order', definition: 'INT NOT NULL DEFAULT 0' },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
    ],
    seedData: [
      { name: 'USAA', src: '/logos/usaa.jpg', category: 'Fortune 500', display_order: 1 },
      { name: 'Progressive', src: '/logos/progressive.jpg', category: 'Fortune 500', display_order: 2 },
      { name: 'Liberty Mutual', src: '/logos/liberty_mutual.jpg', category: 'Fortune 500', display_order: 3 },
      { name: 'United IT Solutions', src: '/logos/united_it.jpg', category: 'Enterprise Partner', display_order: 4 },
      { name: 'Navy Federal', src: '/logos/navy_federal.jpg', category: 'Financial Services', display_order: 5 },
      { name: 'Miles IT', src: '/logos/miles_it.jpg', category: 'Technology Partner', display_order: 6 },
      { name: 'CVS Health', src: '/logos/cvs_health.jpg', category: 'Healthcare & Retail', display_order: 7 },
      { name: 'Calvi Electric', src: '/logos/calvi_electric.jpg', category: 'Engineering & Industrial', display_order: 8 },
      { name: 'Albertsons', src: '/logos/albertsons.jpg', category: 'Retail & Supply Chain', display_order: 9 },
      { name: 'Chase', src: '/logos/chase.svg', category: 'Banking & Finance', display_order: 10 },
      { name: 'State Farm', src: '/logos/state_farm.jpg', category: 'Insurance & Financial', display_order: 11 },
      { name: 'GEICO', src: '/logos/geico.jpg', category: 'Insurance Services', display_order: 12 },
      { name: 'AAA', src: '/logos/aaa.jpg', category: 'Automotive & Travel', display_order: 13 },
      { name: 'PenFed', src: '/logos/penfed.jpg', category: 'Credit Union & Finance', display_order: 14 },
      { name: 'Capital One', src: '/logos/capital_one.jpg', category: 'Financial Technology', display_order: 15 },
      { name: 'Mizuho', src: '/logos/mizuho.jpg', category: 'Global Investment Banking', display_order: 16 },
      { name: 'Synechron', src: '/logos/synechron.jpg', category: 'Digital Transformation', display_order: 17 },
      { name: 'Persistent', src: '/logos/persistent.jpg', category: 'Digital Engineering', display_order: 18 },
      { name: 'Pennymac', src: '/logos/pennymac.jpg', category: 'Mortgage & Lending', display_order: 19 },
      { name: 'Signify Health', src: '/logos/signify_health.jpg', category: 'Healthcare Solutions', display_order: 20 },
    ],
  },

  careers: {
    name: 'careers',
    uniqueCheckColumn: 'title',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'title', definition: 'VARCHAR(200) NOT NULL' },
      { name: 'dept', definition: 'VARCHAR(100) NOT NULL' },
      { name: 'location', definition: 'VARCHAR(150) NOT NULL' },
      { name: 'type', definition: "VARCHAR(50) NOT NULL DEFAULT 'Full-time'" },
      { name: 'experience', definition: "VARCHAR(50) NOT NULL DEFAULT '3-5 years'" },
      { name: 'description', definition: 'TEXT NULL' },
      { name: 'is_active', definition: 'TINYINT(1) NOT NULL DEFAULT 1' },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ],
    seedData: [
      {
        title: 'Cloud Infrastructure Architect',
        dept: 'Cloud Operations',
        location: 'Wilmington, DE / Hybrid',
        type: 'Full-time',
        experience: '5-8 years',
        description: 'Lead enterprise cloud migrations across AWS, Azure, and Google Cloud with strong focus on Kubernetes, Terraform, and zero-trust network infrastructure.',
        is_active: 1,
      },
      {
        title: 'Senior SAP S/4HANA Consultant',
        dept: 'Enterprise Solutions',
        location: 'Toronto, ON / Hybrid',
        type: 'Full-time',
        experience: '6+ years',
        description: 'Architect and implement large-scale SAP S/4HANA transformations, modules integration (FI/CO, MM, SD), and enterprise process modernization.',
        is_active: 1,
      },
      {
        title: 'Full-Stack React & Node Engineer',
        dept: 'Engineering',
        location: 'Hyderabad, India / Remote',
        type: 'Full-time',
        experience: '3-5 years',
        description: 'Build scalable enterprise web applications, real-time dashboards, and microservices using TypeScript, React, Tailwind, and Node.js.',
        is_active: 1,
      },
      {
        title: 'FinTech Data Solutions Engineer',
        dept: 'FinLabs',
        location: 'New York, NY / Hybrid',
        type: 'Full-time',
        experience: '4-6 years',
        description: 'Design high-throughput financial data pipelines, risk analytics dashboards, and regulatory reporting integrations for Fortune 500 banks.',
        is_active: 1,
      },
      {
        title: 'AI & Automation Workflow Specialist',
        dept: 'Digital Experience',
        location: 'Remote (Global)',
        type: 'Full-time',
        experience: '2-4 years',
        description: 'Implement intelligent process automation, LLM workflows, custom AI agents, and RPA solutions to optimize operational efficiency.',
        is_active: 1,
      },
      {
        title: 'IT Talent & Workforce Specialist',
        dept: 'Management',
        location: 'Wilmington, DE / On-site',
        type: 'Full-time',
        experience: '3-5 years',
        description: 'Manage high-volume technical talent acquisition, client staffing engagements, contract-to-hire pipelines, and global candidate relationships.',
        is_active: 1,
      },
    ],
  },

  contact_messages: {
    name: 'contact_messages',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'name', definition: 'VARCHAR(150) NOT NULL' },
      { name: 'email', definition: 'VARCHAR(191) NOT NULL' },
      { name: 'phone', definition: 'VARCHAR(50) NULL' },
      { name: 'subject', definition: 'VARCHAR(200) NULL' },
      { name: 'message', definition: 'TEXT NOT NULL' },
      { name: 'is_read', definition: 'TINYINT(1) NOT NULL DEFAULT 0' },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
    ],
  },

  blogs: {
    name: 'blogs',
    uniqueCheckColumn: 'slug',
    columns: [
      { name: 'id', definition: 'INT AUTO_INCREMENT PRIMARY KEY', isPrimary: true },
      { name: 'title', definition: 'VARCHAR(255) NOT NULL' },
      { name: 'slug', definition: 'VARCHAR(191) NOT NULL UNIQUE' },
      { name: 'category', definition: "VARCHAR(100) NOT NULL DEFAULT 'Technology'" },
      { name: 'summary', definition: 'TEXT NULL' },
      { name: 'content', definition: 'LONGTEXT NULL' },
      { name: 'author', definition: "VARCHAR(100) DEFAULT 'TP IT Editorial'" },
      { name: 'read_time', definition: "VARCHAR(50) DEFAULT '5 min read'" },
      { name: 'image', definition: 'VARCHAR(255) NULL' },
      { name: 'is_published', definition: 'TINYINT(1) NOT NULL DEFAULT 1' },
      { name: 'created_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ],
  },
};

// ======================================================================
// AUTOMATIC DATABASE & TABLE/COLUMN AUTO-MIGRATOR
// ======================================================================
let migrationInProgress = false;
let migrationCompleted = false;

export async function ensureDatabaseAndSchema(force: boolean = false): Promise<{ success: boolean; log: string[] }> {
  if (migrationCompleted && !force) {
    return { success: true, log: ['Schema already synchronized'] };
  }
  if (migrationInProgress) {
    return { success: true, log: ['Migration already in progress'] };
  }

  migrationInProgress = true;
  const logs: string[] = [];

  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'tpitgroup_db';

  let initialConn: mysql.Connection | null = null;
  let dbConn: mysql.Connection | null = null;

  try {
    // 1. Ensure database exists
    initialConn = await mysql.createConnection({ host, port, user, password });
    await initialConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    logs.push(`[Database] Ensured database '${database}' exists in Laragon MySQL`);
    await initialConn.end();
    initialConn = null;

    // 2. Connect to the database
    dbConn = await mysql.createConnection({ host, port, user, password, database });

    // 3. Inspect and migrate each table in schema
    for (const [key, schema] of Object.entries(TABLE_SCHEMAS)) {
      const tableName = schema.name;

      // Check if table exists
      const [existingTableRows] = await dbConn.query<any[]>(`SHOW TABLES LIKE ?`, [tableName]);
      const tableExists = existingTableRows && existingTableRows.length > 0;

      if (!tableExists) {
        // Table does not exist: CREATE TABLE
        const colDefinitions = schema.columns.map((col) => `\`${col.name}\` ${col.definition}`).join(',\n  ');
        const createSql = `
          CREATE TABLE IF NOT EXISTS \`${tableName}\` (
            ${colDefinitions}
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await dbConn.query(createSql);
        logs.push(`[Auto-Table] Created table '${tableName}' with ${schema.columns.length} columns`);

        // Seed default rows if provided
        if (schema.seedData && schema.seedData.length > 0) {
          for (const row of schema.seedData) {
            const cols = Object.keys(row);
            const placeholders = cols.map(() => '?').join(', ');
            const values = Object.values(row);
            const insertSql = `INSERT INTO \`${tableName}\` (\`${cols.join('`, `')}\`) VALUES (${placeholders})`;
            await dbConn.query(insertSql, values);
          }
          logs.push(`[Auto-Seed] Seeded ${schema.seedData.length} records into '${tableName}'`);
        }
      } else {
        // Table exists: Check for missing columns (Auto-Column Migration)
        const [existingCols] = await dbConn.query<any[]>(`SHOW COLUMNS FROM \`${tableName}\``);
        const existingColNames = new Set(existingCols.map((c: any) => c.Field.toLowerCase()));

        for (const col of schema.columns) {
          if (!existingColNames.has(col.name.toLowerCase())) {
            // Missing column: execute ALTER TABLE ADD COLUMN
            const alterSql = `ALTER TABLE \`${tableName}\` ADD COLUMN \`${col.name}\` ${col.definition}`;
            await dbConn.query(alterSql);
            logs.push(`[Auto-Column] Added missing column '${col.name}' to '${tableName}'`);
          }
        }

        // If table is completely empty and has seedData, populate it
        const [countRes] = await dbConn.query<any[]>(`SELECT count(*) as count FROM \`${tableName}\``);
        if (countRes && countRes[0]?.count === 0 && schema.seedData && schema.seedData.length > 0) {
          for (const row of schema.seedData) {
            const cols = Object.keys(row);
            const placeholders = cols.map(() => '?').join(', ');
            const values = Object.values(row);
            const insertSql = `INSERT INTO \`${tableName}\` (\`${cols.join('`, `')}\`) VALUES (${placeholders})`;
            await dbConn.query(insertSql, values);
          }
          logs.push(`[Auto-Seed] Populated empty table '${tableName}' with initial records`);
        }
      }
    }

    migrationCompleted = true;
    console.log('[MySQL Auto-Migration] Schema synchronization successful.');
    return { success: true, log: logs };
  } catch (err: any) {
    console.error('[MySQL Auto-Migration Error]', err);
    logs.push(`[Error] ${err.message}`);
    return { success: false, log: logs };
  } finally {
    migrationInProgress = false;
    if (initialConn) {
      try { await initialConn.end(); } catch {}
    }
    if (dbConn) {
      try { await dbConn.end(); } catch {}
    }
  }
}

// Helper to create any dynamic table in the future
export async function createDynamicTable(
  tableName: string,
  columns: { name: string; type: string; nullable?: boolean; defaultValue?: string }[]
): Promise<{ success: boolean; message: string }> {
  try {
    await ensureDatabaseAndSchema();
    const colsSql = columns
      .map((c) => `\`${c.name}\` ${c.type} ${c.nullable ? 'NULL' : 'NOT NULL'} ${c.defaultValue ? `DEFAULT ${c.defaultValue}` : ''}`)
      .join(', ');

    const sql = `
      CREATE TABLE IF NOT EXISTS \`${tableName}\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        ${colsSql},
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    const pool = (await import('./db.ts')).getDbPool();
    await pool.query(sql);
    return { success: true, message: `Table '${tableName}' created successfully` };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
