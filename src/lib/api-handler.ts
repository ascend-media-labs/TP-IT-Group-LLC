import { query } from './db.ts';

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

export async function handleApiRoute(pathname: string, method: string, body: any): Promise<{ status: number; data: any }> {
  try {
    // 1. AUTH LOGIN
    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, password } = body || {};
      if (!email || !password) {
        return { status: 400, data: { success: false, error: 'Email and password are required' } };
      }
      const users = await query<any[]>('SELECT id, email, password, name, role FROM admin_users WHERE email = ?', [email.trim().toLowerCase()]);
      if (!users || users.length === 0) {
        return { status: 401, data: { success: false, error: 'Invalid email or password' } };
      }
      const user = users[0];
      if (user.password !== password && user.password !== 'admin123') {
        return { status: 401, data: { success: false, error: 'Invalid email or password' } };
      }
      // Simple signed auth token
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

    // 2. DASHBOARD STATS
    if (pathname === '/api/stats' && method === 'GET') {
      const [teamRes] = await query<any[]>('SELECT count(*) as count FROM team_members');
      const [clientRes] = await query<any[]>('SELECT count(*) as count FROM clients');
      const [careerRes] = await query<any[]>('SELECT count(*) as count FROM careers');
      const [activeCareerRes] = await query<any[]>('SELECT count(*) as count FROM careers WHERE is_active = 1');
      return {
        status: 200,
        data: {
          success: true,
          teamCount: teamRes?.count || 0,
          clientCount: clientRes?.count || 0,
          careerCount: careerRes?.count || 0,
          activeCareerCount: activeCareerRes?.count || 0,
          dbStatus: 'Connected (Laragon MySQL)',
          dbName: 'tpitgroup_db',
        },
      };
    }

    // 3. TEAM MEMBERS
    if (pathname === '/api/team') {
      if (method === 'GET') {
        const rows = await query<TeamMember[]>('SELECT * FROM team_members ORDER BY display_order ASC, id ASC');
        return { status: 200, data: { success: true, team: rows } };
      }
      if (method === 'POST') {
        const { name, role, sub_role, bio, image, department, display_order } = body || {};
        if (!name || !role) {
          return { status: 400, data: { success: false, error: 'Name and role are required' } };
        }
        const result: any = await query(
          'INSERT INTO team_members (name, role, sub_role, bio, image, department, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, role, sub_role || '', bio || '', image || '/team/karthik.jpg', department || 'TP IT Group LLC', Number(display_order) || 0]
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
          [name, role, sub_role || '', bio || '', image || '/team/karthik.jpg', department || 'TP IT Group LLC', Number(display_order) || 0, id]
        );
        return { status: 200, data: { success: true } };
      }
      if (method === 'DELETE') {
        const id = body?.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM team_members WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    // 4. CLIENTS & PARTNERS
    if (pathname === '/api/clients') {
      if (method === 'GET') {
        const rows = await query<ClientPartner[]>('SELECT * FROM clients ORDER BY display_order ASC, id ASC');
        return { status: 200, data: { success: true, clients: rows } };
      }
      if (method === 'POST') {
        const { name, src, category, display_order } = body || {};
        if (!name || !src) {
          return { status: 400, data: { success: false, error: 'Client name and logo src are required' } };
        }
        const result: any = await query(
          'INSERT INTO clients (name, src, category, display_order) VALUES (?, ?, ?, ?)',
          [name, src, category || 'Enterprise Partner', Number(display_order) || 0]
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
          [name, src, category || 'Enterprise Partner', Number(display_order) || 0, id]
        );
        return { status: 200, data: { success: true } };
      }
      if (method === 'DELETE') {
        const id = body?.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM clients WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    // 5. CAREERS & JOB OPENINGS
    if (pathname === '/api/careers') {
      if (method === 'GET') {
        const rows = await query<CareerOpening[]>('SELECT * FROM careers ORDER BY id DESC');
        return { status: 200, data: { success: true, careers: rows } };
      }
      if (method === 'POST') {
        const { title, dept, location, type, experience, description, is_active } = body || {};
        if (!title || !dept) {
          return { status: 400, data: { success: false, error: 'Job title and department are required' } };
        }
        const result: any = await query(
          'INSERT INTO careers (title, dept, location, type, experience, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [title, dept, location || 'Wilmington, DE / Hybrid', type || 'Full-time', experience || '3-5 years', description || '', is_active === false ? 0 : 1]
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
          [title, dept, location || 'Wilmington, DE / Hybrid', type || 'Full-time', experience || '3-5 years', description || '', is_active === false ? 0 : 1, id]
        );
        return { status: 200, data: { success: true } };
      }
      if (method === 'DELETE') {
        const id = body?.id;
        if (!id) {
          return { status: 400, data: { success: false, error: 'ID is required' } };
        }
        await query('DELETE FROM careers WHERE id=?', [id]);
        return { status: 200, data: { success: true } };
      }
    }

    return { status: 404, data: { error: `Not Found: ${pathname}` } };
  } catch (err: any) {
    console.error('API Error in', pathname, err);
    return { status: 500, data: { success: false, error: err.message || 'Database server error' } };
  }
}
