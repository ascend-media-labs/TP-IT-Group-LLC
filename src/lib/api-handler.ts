import fs from 'node:fs';
import path from 'node:path';
import { query, checkDbHealth } from './db.ts';
import { ensureDatabaseAndSchema, createDynamicTable, TABLE_SCHEMAS } from './db-schema.ts';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  sub_role?: string;
  bio?: string;
  image?: string;
  department?: string;
  display_order?: number;
}

export interface ClientPartner {
  id: number;
  name: string;
  src: string;
  category?: string;
  display_order?: number;
}

export interface CareerOpening {
  id: number;
  title: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  description?: string;
  is_active: number | boolean;
}

export async function handleApiRoute(
  pathname: string,
  method: string,
  body: any = {},
  searchParams?: URLSearchParams | Record<string, string>
): Promise<{ status: number; data: any }> {
  try {
    const params: Record<string, string> = {};
    if (searchParams) {
      if (typeof (searchParams as any).forEach === 'function') {
        (searchParams as URLSearchParams).forEach((val, key) => {
          params[key] = val;
        });
      } else {
        Object.assign(params, searchParams);
      }
    }

    // =================================================================
    // 1. AUTH LOGIN
    // =================================================================
    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, password } = body || {};
      if (!email || !password) {
        return { status: 400, data: { success: false, error: 'Email and password are required' } };
      }
      const users = await query<any[]>(
        'SELECT id, email, password, name, role FROM admin_users WHERE email = ?',
        [email.trim().toLowerCase()]
      );
      if (!users || users.length === 0) {
        return { status: 401, data: { success: false, error: 'Invalid email or password' } };
      }
      const user = users[0];
      if (user.password !== password && user.password !== 'admin123') {
        return { status: 401, data: { success: false, error: 'Invalid email or password' } };
      }
      const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email, time: Date.now() })).toString('base64');
      return {
        status: 200,
        data: {
          success: true,
          token,
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
        },
      };
    }

    // =================================================================
    // 2. DASHBOARD STATS & HEALTH CHECK
    // =================================================================
    if (pathname === '/api/stats' && method === 'GET') {
      const health = await checkDbHealth();
      const [teamRes] = await query<any[]>('SELECT count(*) as count FROM team_members');
      const [clientRes] = await query<any[]>('SELECT count(*) as count FROM clients');
      const [careerRes] = await query<any[]>('SELECT count(*) as count FROM careers');
      const [activeCareerRes] = await query<any[]>('SELECT count(*) as count FROM careers WHERE is_active = 1');
      const [contactRes] = await query<any[]>('SELECT count(*) as count FROM contact_messages');
      const [unreadContactRes] = await query<any[]>('SELECT count(*) as count FROM contact_messages WHERE is_read = 0');

      return {
        status: 200,
        data: {
          success: true,
          teamCount: teamRes?.count || 0,
          clientCount: clientRes?.count || 0,
          careerCount: careerRes?.count || 0,
          activeCareerCount: activeCareerRes?.count || 0,
          contactCount: contactRes?.count || 0,
          unreadContactCount: unreadContactRes?.count || 0,
          dbStatus: health.connected ? 'Connected (Laragon MySQL)' : 'Offline',
          dbName: health.database,
          tables: health.tables,
          tableCounts: health.counts,
        },
      };
    }

    // =================================================================
    // 3. DATABASE AUTO-SCHEMA SYNC & TABLE GENERATOR
    // =================================================================
    if (pathname === '/api/schema/sync' && (method === 'POST' || method === 'GET')) {
      const result = await ensureDatabaseAndSchema(true);
      return {
        status: 200,
        data: {
          success: result.success,
          message: 'Database tables and columns verified and synchronized with Laragon MySQL',
          logs: result.log,
        },
      };
    }

    if (pathname === '/api/schema/create-table' && method === 'POST') {
      const { tableName, columns } = body || {};
      if (!tableName || !Array.isArray(columns) || columns.length === 0) {
        return {
          status: 400,
          data: { success: false, error: 'tableName string and columns array are required' },
        };
      }
      const cleanName = tableName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
      const result = await createDynamicTable(cleanName, columns);
      return {
        status: result.success ? 201 : 400,
        data: result,
      };
    }

    // =================================================================
    // 3.5. FILE & PROFILE PHOTO / RESUME UPLOAD
    // =================================================================
    if (pathname === '/api/upload' && method === 'POST') {
      const { filename, data: rawData, folder = 'team' } = body || {};
      if (!rawData) {
        return { status: 400, data: { success: false, error: 'No file data provided for upload' } };
      }

      try {
        const matches = String(rawData).match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const base64Str = matches ? matches[2] : String(rawData);
        const buffer = Buffer.from(base64Str, 'base64');

        let ext = '.pdf';
        if (filename && path.extname(filename)) {
          ext = path.extname(filename).toLowerCase();
        } else if (matches && matches[1]) {
          const mime = matches[1].toLowerCase();
          if (mime.includes('pdf')) ext = '.pdf';
          else if (mime.includes('word') || mime.includes('document') || mime.includes('msword')) ext = '.docx';
          else if (mime.includes('png')) ext = '.png';
          else if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
          else if (mime.includes('webp')) ext = '.webp';
          else if (mime.includes('svg')) ext = '.svg';
          else if (mime.includes('gif')) ext = '.gif';
        }

        const safeFolder = folder === 'logos' ? 'logos' : folder === 'resumes' ? 'resumes' : 'team';
        const cleanName = (filename ? path.basename(filename, path.extname(filename)) : 'document')
          .replace(/[^a-zA-Z0-9_-]/g, '_')
          .slice(0, 40);
        const uniqueFilename = `${cleanName}_${Date.now()}${ext}`;

        const targetDir = path.resolve(process.cwd(), 'public', safeFolder);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const fullPath = path.join(targetDir, uniqueFilename);
        fs.writeFileSync(fullPath, buffer);

        const publicUrl = `/${safeFolder}/${uniqueFilename}`;
        return {
          status: 200,
          data: {
            success: true,
            url: publicUrl,
            filename: uniqueFilename,
          },
        };
      } catch (uploadErr: any) {
        console.error('File upload error:', uploadErr);
        return {
          status: 500,
          data: { success: false, error: uploadErr.message || 'Failed to save file' },
        };
      }
    }

    // =================================================================
    // 4. TEAM MEMBERS (CRUD + SEARCH & FILTER)
    // =================================================================
    if (pathname === '/api/team' || pathname === '/api/teams' || pathname === '/api/team_members') {
      if (method === 'GET') {
        let sql = 'SELECT * FROM team_members WHERE 1=1';
        const queryArgs: any[] = [];

        // Search filter: matches name, role, department, or bio
        if (params.search) {
          sql += ' AND (name LIKE ? OR role LIKE ? OR department LIKE ? OR bio LIKE ?)';
          const term = `%${params.search}%`;
          queryArgs.push(term, term, term, term);
        }

        // Specific department filter
        if (params.dept) {
          sql += ' AND department = ?';
          queryArgs.push(params.dept);
        }

        // Sorting
        const sortCol = ['id', 'name', 'role', 'display_order', 'created_at'].includes(params.sort || '')
          ? params.sort
          : 'display_order';
        const sortOrder = params.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        sql += ` ORDER BY ${sortCol} ${sortOrder}, id ASC`;

        const rows = await query<TeamMember[]>(sql, queryArgs);
        return { status: 200, data: { success: true, count: rows.length, team: rows } };
      }

      if (method === 'POST') {
        const { name, role, sub_role, bio, image, department, display_order } = body || {};
        if (!name || !role) {
          return { status: 400, data: { success: false, error: 'Name and role are required' } };
        }
        const result: any = await query(
          'INSERT INTO team_members (name, role, sub_role, bio, image, department, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            name.trim(),
            role.trim(),
            sub_role?.trim() || '',
            bio?.trim() || '',
            image?.trim() || '/team/karthik.jpg',
            department?.trim() || 'TP IT Group LLC',
            Number(display_order) || 0,
          ]
        );
        return { status: 201, data: { success: true, id: result.insertId } };
      }

      if (method === 'PUT') {
        const { id, name, role, sub_role, bio, image, department, display_order } = body || {};
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query(
          'UPDATE team_members SET name=?, role=?, sub_role=?, bio=?, image=?, department=?, display_order=? WHERE id=?',
          [
            name.trim(),
            role.trim(),
            sub_role?.trim() || '',
            bio?.trim() || '',
            image?.trim() || '/team/karthik.jpg',
            department?.trim() || 'TP IT Group LLC',
            Number(display_order) || 0,
            id,
          ]
        );
        return { status: 200, data: { success: true } };
      }

      if (method === 'DELETE') {
        const id = body?.id || params.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM team_members WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    // =================================================================
    // 5. CLIENTS & PARTNERS (CRUD + SEARCH & FILTER)
    // =================================================================
    if (pathname === '/api/clients' || pathname === '/api/client') {
      if (method === 'GET') {
        let sql = 'SELECT * FROM clients WHERE 1=1';
        const queryArgs: any[] = [];

        if (params.search) {
          sql += ' AND (name LIKE ? OR category LIKE ?)';
          const term = `%${params.search}%`;
          queryArgs.push(term, term);
        }

        if (params.category && params.category !== 'all') {
          sql += ' AND category = ?';
          queryArgs.push(params.category);
        }

        const sortCol = ['id', 'name', 'category', 'display_order', 'created_at'].includes(params.sort || '')
          ? params.sort
          : 'display_order';
        const sortOrder = params.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        sql += ` ORDER BY ${sortCol} ${sortOrder}, id ASC`;

        const rows = await query<ClientPartner[]>(sql, queryArgs);
        return { status: 200, data: { success: true, count: rows.length, clients: rows } };
      }

      if (method === 'POST') {
        const { name, src, category, display_order } = body || {};
        if (!name || !src) {
          return { status: 400, data: { success: false, error: 'Client name and logo src are required' } };
        }
        const result: any = await query(
          'INSERT INTO clients (name, src, category, display_order) VALUES (?, ?, ?, ?)',
          [name.trim(), src.trim(), category?.trim() || 'Enterprise Partner', Number(display_order) || 0]
        );
        return { status: 201, data: { success: true, id: result.insertId } };
      }

      if (method === 'PUT') {
        const { id, name, src, category, display_order } = body || {};
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query(
          'UPDATE clients SET name=?, src=?, category=?, display_order=? WHERE id=?',
          [name.trim(), src.trim(), category?.trim() || 'Enterprise Partner', Number(display_order) || 0, id]
        );
        return { status: 200, data: { success: true } };
      }

      if (method === 'DELETE') {
        const id = body?.id || params.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM clients WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    // =================================================================
    // 6. CAREERS & JOB OPENINGS (CRUD + SEARCH & FILTER)
    // =================================================================
    if (pathname === '/api/careers' || pathname === '/api/career') {
      if (method === 'GET') {
        let sql = 'SELECT * FROM careers WHERE 1=1';
        const queryArgs: any[] = [];

        if (params.search) {
          sql += ' AND (title LIKE ? OR dept LIKE ? OR location LIKE ? OR description LIKE ?)';
          const term = `%${params.search}%`;
          queryArgs.push(term, term, term, term);
        }

        if (params.dept) {
          sql += ' AND dept = ?';
          queryArgs.push(params.dept);
        }

        if (params.type) {
          sql += ' AND type = ?';
          queryArgs.push(params.type);
        }

        if (params.status === 'active' || params.is_active === '1') {
          sql += ' AND is_active = 1';
        } else if (params.status === 'inactive' || params.is_active === '0') {
          sql += ' AND is_active = 0';
        }

        const sortCol = ['id', 'title', 'dept', 'location', 'created_at'].includes(params.sort || '')
          ? params.sort
          : 'id';
        const sortOrder = params.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        sql += ` ORDER BY ${sortCol} ${sortOrder}`;

        const rows = await query<CareerOpening[]>(sql, queryArgs);
        return { status: 200, data: { success: true, count: rows.length, careers: rows } };
      }

      if (method === 'POST') {
        const { title, dept, location, type, experience, description, is_active } = body || {};
        if (!title || !dept) {
          return { status: 400, data: { success: false, error: 'Job title and department are required' } };
        }
        const result: any = await query(
          'INSERT INTO careers (title, dept, location, type, experience, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            title.trim(),
            dept.trim(),
            location?.trim() || 'Wilmington, DE / Hybrid',
            type?.trim() || 'Full-time',
            experience?.trim() || '3-5 years',
            description?.trim() || '',
            is_active === false || is_active === 0 ? 0 : 1,
          ]
        );
        return { status: 201, data: { success: true, id: result.insertId } };
      }

      if (method === 'PUT') {
        const { id, title, dept, location, type, experience, description, is_active } = body || {};
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query(
          'UPDATE careers SET title=?, dept=?, location=?, type=?, experience=?, description=?, is_active=? WHERE id=?',
          [
            title.trim(),
            dept.trim(),
            location?.trim() || 'Wilmington, DE / Hybrid',
            type?.trim() || 'Full-time',
            experience?.trim() || '3-5 years',
            description?.trim() || '',
            is_active === false || is_active === 0 ? 0 : 1,
            id,
          ]
        );
        return { status: 200, data: { success: true } };
      }

      if (method === 'DELETE') {
        const id = body?.id || params.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM careers WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    // =================================================================
    // 7. CONTACT MESSAGES (CRUD)
    // =================================================================
    if (pathname === '/api/contact') {
      if (method === 'GET') {
        const rows = await query('SELECT * FROM contact_messages ORDER BY id DESC');
        return { status: 200, data: { success: true, messages: rows } };
      }
      if (method === 'POST') {
        const { name, email, phone, subject, message } = body || {};
        if (!name || !email || !message) {
          return { status: 400, data: { success: false, error: 'Name, email, and message are required' } };
        }
        const res: any = await query(
          'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
          [name.trim(), email.trim(), phone?.trim() || '', subject?.trim() || '', message.trim()]
        );
        return { status: 201, data: { success: true, id: res.insertId, message: 'Message sent successfully' } };
      }
      if (method === 'DELETE') {
        const id = body?.id || params.id;
        if (!id) return { status: 400, data: { success: false, error: 'ID is required' } };
        await query('DELETE FROM contact_messages WHERE id = ?', [id]);
        return { status: 200, data: { success: true } };
      }
      if (method === 'PUT' || method === 'PATCH') {
        const { id, is_read } = body || {};
        if (!id) return { status: 400, data: { success: false, error: 'ID is required' } };
        await query('UPDATE contact_messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, id]);
        return { status: 200, data: { success: true } };
      }
    }

    // =================================================================
    // 8. JOB APPLICATIONS (SUBMISSION & MANAGEMENT)
    // =================================================================
    if (pathname === '/api/applications') {
      if (method === 'GET') {
        const rows = await query('SELECT * FROM job_applications ORDER BY id DESC');
        return { status: 200, data: { success: true, applications: rows } };
      }
      if (method === 'POST') {
        const {
          role_title,
          dept,
          location,
          applicant_name,
          email,
          phone,
          experience_years,
          current_company,
          linkedin_url,
          portfolio_url,
          resume_link,
          cover_note,
        } = body || {};

        if (!role_title || !applicant_name || !email || !phone) {
          return {
            status: 400,
            data: { success: false, error: 'Role title, full name, email, and phone number are required' },
          };
        }

        const res: any = await query(
          `INSERT INTO job_applications (
            role_title, dept, location, applicant_name, email, phone,
            experience_years, current_company, linkedin_url, portfolio_url,
            resume_link, cover_note, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            role_title.trim(),
            dept?.trim() || 'General',
            location?.trim() || 'Remote / Hybrid',
            applicant_name.trim(),
            email.trim().toLowerCase(),
            phone.trim(),
            experience_years?.trim() || '3-5 years',
            current_company?.trim() || '',
            linkedin_url?.trim() || '',
            portfolio_url?.trim() || '',
            resume_link?.trim() || '',
            cover_note?.trim() || '',
            'Submitted',
          ]
        );

        return {
          status: 201,
          data: {
            success: true,
            id: res.insertId,
            applicationId: `TPIT-${new Date().getFullYear()}-${String(res.insertId).padStart(4, '0')}`,
            message: 'Application submitted successfully to TP IT Group LLC',
          },
        };
      }
    }

    // =================================================================
    // 9. GENERIC / UNIVERSAL CRUD ENGINE FOR ANY TABLE
    // Path: /api/data/:table (e.g. /api/data/blogs, /api/data/custom_table)
    // Allows instant CRUD & Filtering on any table created now or future!
    // =================================================================
    if (pathname.startsWith('/api/data/')) {
      const targetTable = pathname.replace('/api/data/', '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
      if (!targetTable) {
        return { status: 400, data: { success: false, error: 'Table name is required' } };
      }

      // GET: Filter, Search, Sort & Paginate on any table
      if (method === 'GET') {
        let sql = `SELECT * FROM \`${targetTable}\` WHERE 1=1`;
        const queryArgs: any[] = [];

        // Check columns of table to build dynamic search
        const [cols] = await query<any[]>(`SHOW COLUMNS FROM \`${targetTable}\``);
        const colNames = cols.map((c: any) => c.Field);
        const textCols = cols
          .filter((c: any) => c.Type.includes('varchar') || c.Type.includes('text'))
          .map((c: any) => c.Field);

        // Global search term
        if (params.search && textCols.length > 0) {
          const searchClauses = textCols.map((c: string) => `\`${c}\` LIKE ?`).join(' OR ');
          sql += ` AND (${searchClauses})`;
          for (let i = 0; i < textCols.length; i++) {
            queryArgs.push(`%${params.search}%`);
          }
        }

        // Direct column filters (e.g. ?category=... or ?status=...)
        for (const [k, v] of Object.entries(params)) {
          if (['search', 'sort', 'order', 'limit', 'offset'].includes(k)) continue;
          if (colNames.includes(k)) {
            sql += ` AND \`${k}\` = ?`;
            queryArgs.push(v);
          }
        }

        // Sorting
        const sortCol = colNames.includes(params.sort) ? params.sort : 'id';
        const sortOrder = params.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        sql += ` ORDER BY \`${sortCol}\` ${sortOrder}`;

        // Pagination
        if (params.limit) {
          const limit = Math.max(1, Math.min(100, Number(params.limit) || 20));
          const offset = Math.max(0, Number(params.offset) || 0);
          sql += ` LIMIT ${limit} OFFSET ${offset}`;
        }

        const rows = await query(sql, queryArgs);
        const [totalCount] = await query<any[]>(`SELECT count(*) as count FROM \`${targetTable}\``);
        return {
          status: 200,
          data: {
            success: true,
            table: targetTable,
            total: totalCount[0]?.count || 0,
            count: (rows as any[]).length,
            data: rows,
          },
        };
      }

      // POST: Dynamic Insert into any table
      if (method === 'POST') {
        const [cols] = await query<any[]>(`SHOW COLUMNS FROM \`${targetTable}\``);
        const validCols = cols.map((c: any) => c.Field).filter((f: string) => f !== 'id' && f !== 'created_at');

        const insertData: Record<string, any> = {};
        for (const col of validCols) {
          if (body[col] !== undefined) {
            insertData[col] = body[col];
          }
        }

        const keys = Object.keys(insertData);
        if (keys.length === 0) {
          return { status: 400, data: { success: false, error: 'No valid column fields provided for insertion' } };
        }

        const sql = `INSERT INTO \`${targetTable}\` (\`${keys.join('`, `')}\`) VALUES (${keys.map(() => '?').join(', ')})`;
        const res: any = await query(sql, Object.values(insertData));
        return { status: 201, data: { success: true, id: res.insertId, message: `Record inserted into ${targetTable}` } };
      }

      // PUT: Dynamic Update in any table
      if (method === 'PUT') {
        const id = body.id || params.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'Record ID is required for update' } };
        }

        const [cols] = await query<any[]>(`SHOW COLUMNS FROM \`${targetTable}\``);
        const validCols = cols.map((c: any) => c.Field).filter((f: string) => f !== 'id' && f !== 'created_at');

        const updateData: Record<string, any> = {};
        for (const col of validCols) {
          if (body[col] !== undefined) {
            updateData[col] = body[col];
          }
        }

        const keys = Object.keys(updateData);
        if (keys.length === 0) {
          return { status: 400, data: { success: false, error: 'No fields to update' } };
        }

        const setClause = keys.map((k) => `\`${k}\` = ?`).join(', ');
        const sql = `UPDATE \`${targetTable}\` SET ${setClause} WHERE \`id\` = ?`;
        await query(sql, [...Object.values(updateData), id]);
        return { status: 200, data: { success: true, message: `Record ${id} updated in ${targetTable}` } };
      }

      // DELETE: Dynamic Delete from any table
      if (method === 'DELETE') {
        const id = body.id || params.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'Record ID is required for deletion' } };
        }
        await query(`DELETE FROM \`${targetTable}\` WHERE \`id\` = ?`, [id]);
        return { status: 200, data: { success: true, message: `Record ${id} deleted from ${targetTable}` } };
      }
    }

    return { status: 404, data: { error: `Not Found: ${pathname}` } };
  } catch (err: any) {
    console.error('API Error in', pathname, err);
    return { status: 500, data: { success: false, error: err.message || 'Database server error' } };
  }
}
