import { useState, useEffect } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Users,
  Building2,
  Briefcase,
  Lock,
  Mail,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Database,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  RefreshCw,
  LayoutDashboard,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

// Types
interface TeamMember {
  id: number;
  name: string;
  role: string;
  sub_role?: string;
  bio?: string;
  image?: string;
  department?: string;
  display_order?: number;
}

interface ClientPartner {
  id: number;
  name: string;
  src: string;
  category?: string;
  display_order?: number;
}

interface CareerOpening {
  id: number;
  title: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  description?: string;
  is_active: number | boolean;
}

interface Stats {
  teamCount: number;
  clientCount: number;
  careerCount: number;
  activeCareerCount: number;
  dbStatus: string;
  dbName: string;
}

export function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'clients' | 'careers'>('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@tpitgroup.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<ClientPartner[]>([]);
  const [careers, setCareers] = useState<CareerOpening[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals state
  const [modalType, setModalType] = useState<'team' | 'client' | 'career' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Check stored session
  useEffect(() => {
    const savedToken = localStorage.getItem('tpit_admin_token');
    const savedUser = localStorage.getItem('tpit_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser({ email: 'admin@tpitgroup.com', name: 'Administrator' });
      }
    }
  }, []);

  // Fetch data on login or tab change
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [sRes, tRes, cRes, jRes] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/team').then((r) => r.json()),
        fetch('/api/clients').then((r) => r.json()),
        fetch('/api/careers').then((r) => r.json()),
      ]);

      if (sRes.success) setStats(sRes);
      if (tRes.success) setTeam(tRes.team || []);
      if (cRes.success) setClients(cRes.clients || []);
      if (jRes.success) setCareers(jRes.careers || []);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('tpit_admin_token', data.token);
        localStorage.setItem('tpit_admin_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        showNotice('success', `Welcome back, ${data.user.name || 'Admin'}! Connected to Laragon MySQL.`);
      } else {
        setLoginError(data.error || 'Invalid email or password');
      }
    } catch (err: any) {
      setLoginError('Could not reach the server. Make sure Laragon MySQL is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('tpit_admin_token');
    localStorage.removeItem('tpit_admin_user');
    setToken(null);
    setUser(null);
  };

  // Open Modal Helper
  const openModal = (type: 'team' | 'client' | 'career', item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    if (item) {
      setFormData({ ...item });
    } else {
      if (type === 'team') {
        setFormData({
          name: '',
          role: '',
          sub_role: '',
          bio: '',
          image: '/team/karthik.jpg',
          department: 'TP IT Group LLC',
          display_order: (team.length + 1),
        });
      } else if (type === 'client') {
        setFormData({
          name: '',
          src: '/logos/usaa.png',
          category: 'Enterprise Partner',
          display_order: (clients.length + 1),
        });
      } else if (type === 'career') {
        setFormData({
          title: '',
          dept: 'Engineering',
          location: 'Wilmington, DE / Hybrid',
          type: 'Full-time',
          experience: '3-5 years',
          description: '',
          is_active: 1,
        });
      }
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  // Save Modal
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType) return;

    const endpoint = `/api/${modalType === 'career' ? 'careers' : modalType}`;
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        showNotice('success', `${editingItem ? 'Updated' : 'Added'} successfully in Laragon MySQL!`);
        closeModal();
        fetchAllData();
      } else {
        showNotice('error', data.error || 'Failed to save');
      }
    } catch (err: any) {
      showNotice('error', 'Network error while saving to MySQL');
    }
  };

  // Delete Item
  const handleDelete = async (type: 'team' | 'clients' | 'careers', id: number, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}" from MySQL?`)) return;

    try {
      const res = await fetch(`/api/${type}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        showNotice('success', `Deleted "${label}" from Laragon MySQL.`);
        fetchAllData();
      } else {
        showNotice('error', data.error || 'Failed to delete');
      }
    } catch {
      showNotice('error', 'Failed to delete record');
    }
  };

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden bg-dot-pattern selection:bg-[#d7192a]/30">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,25,42,0.12),transparent_70%)]" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center gap-2 group">
              <span className="font-black text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors">
                TP <span className="text-[#d7192a]">iT</span> GROUP
              </span>
            </Link>
            <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Admin Console</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Sign in with your email and password to manage website data.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-7 shadow-2xl backdrop-blur-xl">
            {loginError && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200">
                <AlertCircle className="size-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@tpitgroup.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 size-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Database indicator pill */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Laragon MySQL: <code className="text-slate-300 font-mono">tpitgroup_db</code>
                </span>
                <span className="text-slate-500">Port 3306</span>
              </div>

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 h-11 rounded-xl bg-gradient-to-r from-[#d7192a] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-900/40 transition-all"
              >
                {loginLoading ? 'Authenticating with MySQL...' : 'Sign In to Dashboard'}
              </Button>
            </form>

            {/* Quick Demo Credentials Pill */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Demo Login:</span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@tpitgroup.com');
                  setLoginPassword('admin123');
                }}
                className="font-mono text-[#d7192a] hover:underline"
              >
                admin@tpitgroup.com / admin123
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition">
              ← Return to TP IT Group Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs sm:text-sm shadow-2xl backdrop-blur-md transition-all ${
            notification.type === 'success'
              ? 'border-emerald-500/50 bg-emerald-950/90 text-emerald-200'
              : 'border-red-500/50 bg-red-950/90 text-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="size-4.5 text-emerald-400" />
          ) : (
            <AlertCircle className="size-4.5 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-1.5 group">
              <span className="font-black text-lg tracking-tight text-white group-hover:text-red-400 transition-colors">
                TP <span className="text-[#d7192a]">iT</span> GROUP
              </span>
              <span className="rounded-md bg-[#d7192a]/20 border border-[#d7192a]/40 px-2 py-0.5 text-[10px] font-bold text-red-300 uppercase">
                Admin
              </span>
            </Link>

            {/* DB Status Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-xs text-slate-300">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Laragon MySQL:</span>
              <code className="text-emerald-400 font-mono font-bold">tpitgroup_db</code>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white text-xs gap-1.5"
            >
              <Link to="/" target="_blank">
                Live Website <ExternalLink className="size-3.5" />
              </Link>
            </Button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="size-4 text-[#d7192a]" />
              <span>{user?.name || 'Admin'}</span>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-xs gap-1.5"
            >
              <LogOut className="size-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-4">
          <nav className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-900/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <LayoutDashboard className="size-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === 'team'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-900/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Users className="size-4" /> Our Team ({team.length})
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === 'clients'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-900/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="size-4" /> Clients ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === 'careers'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-900/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Briefcase className="size-4" /> Careers ({careers.length})
            </button>
          </nav>

          <Button
            onClick={fetchAllData}
            disabled={loadingData}
            variant="outline"
            size="sm"
            className="h-9 rounded-xl border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loadingData ? 'animate-spin text-red-400' : ''}`} />
            Refresh DB
          </Button>
        </div>

        {/* -------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div
                onClick={() => setActiveTab('team')}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-red-500/50 hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Our Team Members</span>
                  <div className="size-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#d7192a] group-hover:scale-110 transition-transform">
                    <Users className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-white">{team.length}</div>
                <p className="mt-1 text-xs text-slate-500">Executive leaders & founders</p>
              </div>

              <div
                onClick={() => setActiveTab('clients')}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-red-500/50 hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Enterprise Clients</span>
                  <div className="size-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Building2 className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-white">{clients.length}</div>
                <p className="mt-1 text-xs text-slate-500">Fortune 500 & partner network</p>
              </div>

              <div
                onClick={() => setActiveTab('careers')}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-red-500/50 hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Career Openings</span>
                  <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Briefcase className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-white">{careers.length}</div>
                <p className="mt-1 text-xs text-slate-500">Active job listings across USA, India, Canada</p>
              </div>

              <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300">Database Engine</span>
                  <div className="size-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Database className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-lg font-bold text-white flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Laragon MySQL
                </div>
                <p className="mt-1 text-xs text-emerald-400 font-mono">DB: tpitgroup_db</p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Management Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => openModal('team')}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-red-500/50 hover:bg-slate-800 transition group text-left"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition">Add Team Leader</h4>
                    <p className="text-xs text-slate-400 mt-1">Insert new executive into MySQL</p>
                  </div>
                  <Plus className="size-5 text-[#d7192a]" />
                </button>

                <button
                  onClick={() => openModal('client')}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-800 transition group text-left"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition">Add Client Partner</h4>
                    <p className="text-xs text-slate-400 mt-1">Add enterprise logo to /clients</p>
                  </div>
                  <Plus className="size-5 text-blue-400" />
                </button>

                <button
                  onClick={() => openModal('career')}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-emerald-500/50 hover:bg-slate-800 transition group text-left"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">Post Job Opening</h4>
                    <p className="text-xs text-slate-400 mt-1">Create new role on /careers</p>
                  </div>
                  <Plus className="size-5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 2: OUR TEAM MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Our Team Leadership</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage executive team members stored in Laragon MySQL</p>
              </div>
              <Button
                onClick={() => openModal('team')}
                className="h-10 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md"
              >
                <Plus className="size-4" /> Add Team Member
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-850 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Member</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Department</th>
                    <th className="px-5 py-3.5">Sub Role Description</th>
                    <th className="px-5 py-3.5 text-center">Order</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {team.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-5 py-3.5 font-bold text-white flex items-center gap-3">
                        <img
                          src={member.image || '/team/karthik.jpg'}
                          alt={member.name}
                          className="size-9 rounded-full object-cover border border-slate-700"
                        />
                        <span>{member.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-red-400 font-semibold">{member.role}</td>
                      <td className="px-5 py-3.5 text-slate-300">{member.department || 'TP IT Group LLC'}</td>
                      <td className="px-5 py-3.5 text-slate-400 max-w-xs truncate">{member.sub_role || '—'}</td>
                      <td className="px-5 py-3.5 text-center font-mono text-slate-400">{member.display_order ?? 0}</td>
                      <td className="px-5 py-3.5 text-right space-x-2">
                        <Button
                          onClick={() => openModal('team', member)}
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          onClick={() => handleDelete('team', member.id, member.name)}
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {team.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        No team members in database. Click "Add Team Member" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 3: CLIENTS MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Clients & Enterprise Partners</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage all partner logos and categories in Laragon MySQL</p>
              </div>
              <Button
                onClick={() => openModal('client')}
                className="h-10 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md"
              >
                <Plus className="size-4" /> Add Client Partner
              </Button>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col justify-between hover:border-slate-700 transition group relative"
                >
                  <div className="h-16 flex items-center justify-center p-2 rounded-xl bg-white/95">
                    <img src={c.src} alt={c.name} className="max-h-10 max-w-[85%] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{c.category || 'Enterprise Partner'}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Order: {c.display_order ?? 0}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal('client', c)}
                        className="p-1 hover:text-white transition"
                        title="Edit"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('clients', c.id, c.name)}
                        className="p-1 hover:text-red-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 4: CAREERS MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Career Openings & Jobs</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage live job listings displayed on /careers</p>
              </div>
              <Button
                onClick={() => openModal('career')}
                className="h-10 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md"
              >
                <Plus className="size-4" /> Post Job Opening
              </Button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {careers.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-300">
                        {job.dept}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{job.type}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{job.location}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          job.is_active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{job.title}</h3>
                    <p className="text-xs text-slate-400 max-w-2xl line-clamp-2">{job.description || 'No description'}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                    <Button
                      onClick={() => openModal('career', job)}
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-xl border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs gap-1"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete('careers', job.id, job.title)}
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-xs gap-1"
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------- */}
      {/* ADD / EDIT MODAL */}
      {/* -------------------------------------------------------- */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold">
                {editingItem ? 'Edit' : 'Add'}{' '}
                {modalType === 'team' ? 'Team Member' : modalType === 'client' ? 'Client Partner' : 'Job Opening'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 mt-4 text-xs">
              {/* TEAM FORM */}
              {modalType === 'team' && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="e.g. Karthik Pushpa"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Role / Job Title</label>
                    <input
                      required
                      type="text"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="e.g. CEO & Founder"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Department</label>
                    <input
                      type="text"
                      value={formData.department || ''}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="e.g. TP IT Group LLC, Cloud & Deep-Tech"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Sub Role Description</label>
                    <input
                      type="text"
                      value={formData.sub_role || ''}
                      onChange={(e) => setFormData({ ...formData, sub_role: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="15+ Years in Enterprise IT Strategy..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="Brief executive profile summary..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order ?? 1}
                      onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {/* CLIENT FORM */}
              {modalType === 'client' && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Client Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="e.g. USAA, Progressive, Chase"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Logo Image Path / URL</label>
                    <input
                      required
                      type="text"
                      value={formData.src || ''}
                      onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="/logos/usaa.png"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="Fortune 500, Financial Services, etc."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order ?? 1}
                      onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {/* CAREER FORM */}
              {modalType === 'career' && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Job Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="e.g. Senior SAP S/4HANA Consultant"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Department</label>
                      <input
                        required
                        type="text"
                        value={formData.dept || ''}
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                        placeholder="Engineering, FinLabs..."
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Location</label>
                      <input
                        required
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                        placeholder="Wilmington, DE / Hybrid"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Type</label>
                      <select
                        value={formData.type || 'Full-time'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Experience</label>
                      <input
                        type="text"
                        value={formData.experience || ''}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                        placeholder="3-5 years"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-white"
                      placeholder="Key responsibilities and qualifications..."
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={Boolean(formData.is_active)}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                      className="size-4 rounded border-slate-700 text-[#d7192a]"
                    />
                    <label htmlFor="is_active" className="font-semibold text-slate-300">
                      Listing is Active (Visible on /careers)
                    </label>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={closeModal}
                  variant="outline"
                  className="h-9 rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs"
                >
                  Save to Laragon MySQL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
