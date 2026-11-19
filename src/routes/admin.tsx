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
  Menu,
  Upload,
  Image as ImageIcon,
  Camera,
  Loader2,
  MessageSquare,
  Phone,
  Clock,
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

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: number | boolean;
  created_at: string;
}

interface Stats {
  teamCount: number;
  clientCount: number;
  careerCount: number;
  activeCareerCount: number;
  contactCount?: number;
  unreadContactCount?: number;
  dbStatus: string;
  dbName: string;
  tables?: string[];
  tableCounts?: Record<string, number>;
}

export function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'clients' | 'careers' | 'enquiries'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [syncingSchema, setSyncingSchema] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Live Search & Filtering states
  const [teamSearch, setTeamSearch] = useState('');
  const [teamDeptFilter, setTeamDeptFilter] = useState('all');

  const [clientSearch, setClientSearch] = useState('');
  const [clientCatFilter, setClientCatFilter] = useState('all');

  const [careerSearch, setCareerSearch] = useState('');
  const [careerStatusFilter, setCareerStatusFilter] = useState('all');

  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

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
      const [sRes, tRes, cRes, jRes, mRes] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/team').then((r) => r.json()),
        fetch('/api/clients').then((r) => r.json()),
        fetch('/api/careers').then((r) => r.json()),
        fetch('/api/contact').then((r) => r.json()),
      ]);

      if (sRes.success) setStats(sRes);
      if (tRes.success) setTeam(tRes.team || []);
      if (cRes.success) setClients(cRes.clients || []);
      if (jRes.success) setCareers(jRes.careers || []);
      if (mRes.success) setMessages(mRes.messages || []);
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

  // Auto-Sync Database Schema (Tables & Columns)
  const handleSyncSchema = async () => {
    setSyncingSchema(true);
    try {
      const res = await fetch('/api/schema/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showNotice('success', 'Laragon MySQL tables & columns verified and synchronized!');
        fetchAllData();
      } else {
        showNotice('error', data.error || 'Failed to synchronize schema');
      }
    } catch {
      showNotice('error', 'Network error during schema sync');
    } finally {
      setSyncingSchema(false);
    }
  };

  // Filtered Team Members
  const filteredTeam = team.filter((m) => {
    const matchesSearch =
      !teamSearch.trim() ||
      m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      m.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
      (m.department && m.department.toLowerCase().includes(teamSearch.toLowerCase())) ||
      (m.sub_role && m.sub_role.toLowerCase().includes(teamSearch.toLowerCase()));
    const matchesDept = teamDeptFilter === 'all' || m.department === teamDeptFilter;
    return matchesSearch && matchesDept;
  });

  // Filtered Clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      !clientSearch.trim() ||
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(clientSearch.toLowerCase()));
    const matchesCat = clientCatFilter === 'all' || c.category === clientCatFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Careers
  const filteredCareers = careers.filter((j) => {
    const matchesSearch =
      !careerSearch.trim() ||
      j.title.toLowerCase().includes(careerSearch.toLowerCase()) ||
      j.dept.toLowerCase().includes(careerSearch.toLowerCase()) ||
      j.location.toLowerCase().includes(careerSearch.toLowerCase()) ||
      (j.description && j.description.toLowerCase().includes(careerSearch.toLowerCase()));
    const matchesStatus =
      careerStatusFilter === 'all' ||
      (careerStatusFilter === 'active' && Boolean(j.is_active)) ||
      (careerStatusFilter === 'inactive' && !Boolean(j.is_active));
    return matchesSearch && matchesStatus;
  });

  // Filtered Contact Messages / Enquiries
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      !messageSearch.trim() ||
      m.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (m.phone && m.phone.includes(messageSearch)) ||
      (m.subject && m.subject.toLowerCase().includes(messageSearch.toLowerCase())) ||
      (m.message && m.message.toLowerCase().includes(messageSearch.toLowerCase()));

    const matchesStatus =
      messageFilter === 'all' ||
      (messageFilter === 'unread' && !m.is_read) ||
      (messageFilter === 'read' && Boolean(m.is_read));

    return matchesSearch && matchesStatus;
  });

  const handleToggleRead = async (msg: ContactMessage) => {
    const newRead = !msg.is_read;
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, is_read: newRead }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: newRead ? 1 : 0 } : m))
        );
        if (viewingMessage?.id === msg.id) {
          setViewingMessage({ ...viewingMessage, is_read: newRead ? 1 : 0 });
        }
        showNotice('success', `Marked as ${newRead ? 'read' : 'unread'}`);
      }
    } catch {
      showNotice('error', 'Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: number, name: string) => {
    if (!window.confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (viewingMessage?.id === id) setViewingMessage(null);
        showNotice('success', 'Enquiry deleted from Laragon MySQL');
      }
    } catch {
      showNotice('error', 'Failed to delete message');
    }
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
    setUploadingImage(false);
  };

  // Upload image from user's machine to server
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: 'team' | 'logos' = 'team') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotice('error', 'Image size exceeds 5MB limit. Please upload a smaller photo.');
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            data: base64Data,
            folder,
          }),
        });
        const data = await res.json();
        if (data.success && data.url) {
          if (folder === 'team') {
            setFormData((prev: any) => ({ ...prev, image: data.url }));
          } else {
            setFormData((prev: any) => ({ ...prev, src: data.url }));
          }
          showNotice('success', 'Photo uploaded and preview updated!');
        } else {
          showNotice('error', data.error || 'Failed to upload photo');
        }
        setUploadingImage(false);
      };
      reader.onerror = () => {
        showNotice('error', 'Failed to read file from local disk');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showNotice('error', 'Upload error: ' + err.message);
      setUploadingImage(false);
    }
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
      <div className="admin-root min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-center items-center px-4 relative overflow-hidden bg-dot-pattern selection:bg-[#d7192a]/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,25,42,0.08),transparent_70%)]" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center gap-2 group">
              <span className="font-black text-2xl tracking-tight text-slate-900 group-hover:text-[#d7192a] transition-colors">
                TP <span className="text-[#d7192a]">iT</span> GROUP
              </span>
            </Link>
            <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Admin Console</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              Sign in with your email and password to manage website data.
            </p>
          </div>

          {/* Login Card */}
          <div className="admin-card rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            {loginError && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800">
                <AlertCircle className="size-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@tpitgroup.com"
                    className="admin-input w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-hidden transition font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 size-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="admin-input w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#d7192a] focus:ring-1 focus:ring-[#d7192a] focus:outline-hidden transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Database indicator pill */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Laragon MySQL: <code className="text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">tpitgroup_db</code>
                </span>
                <span className="text-slate-500 font-mono">Port 3306</span>
              </div>

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 h-11 rounded-xl bg-gradient-to-r from-[#d7192a] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                {loginLoading ? 'Authenticating with MySQL...' : 'Sign In to Dashboard'}
              </Button>
            </form>

            {/* Quick Demo Credentials Pill */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
              <span className="font-semibold text-slate-500">Demo Login:</span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@tpitgroup.com');
                  setLoginPassword('admin123');
                }}
                className="font-mono text-[#d7192a] font-bold hover:underline cursor-pointer"
              >
                admin@tpitgroup.com / admin123
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition font-medium">
              ← Return to TP IT Group Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD (LEFT SIDEBAR + RIGHT DATA)
  // -------------------------------------------------------------
  return (
    <div className="admin-root min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row font-sans">
      {/* Top Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs sm:text-sm shadow-xl backdrop-blur-md transition-all ${
            notification.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="size-4.5 text-emerald-600" />
          ) : (
            <AlertCircle className="size-4.5 text-red-600" />
          )}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* LEFT SIDEBAR NAVIGATION                                   */}
      {/* ========================================================= */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 no-scrollbar overflow-hidden select-none transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand & Header */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-[#d7192a] transition-colors">
              TP <span className="text-[#d7192a]">iT</span> GROUP
            </span>
            <span className="rounded-md bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-[#d7192a] uppercase">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Database Connection Status Card */}
        <div className="mx-4 mt-4 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70">
          <div className="flex items-center justify-between text-xs text-emerald-900 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Laragon MySQL
            </span>
            <span className="text-[10px] bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded font-mono text-emerald-800 font-bold">Live</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-800 font-bold truncate">
            <span>tpitgroup_db</span>
            <span className="text-slate-500 font-normal">:3306</span>
          </div>
        </div>

        {/* Navigation Menu (Clean, No Scrollbar) */}
        <div className="flex-1 px-3 py-4 no-scrollbar overflow-y-auto">
          <div className="px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2.5">
            Main Management
          </div>
          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('overview');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="size-4.5" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('team');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="size-4.5" />
                <span>Our Team</span>
              </div>
              <span
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                  activeTab === 'team' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {team.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('clients');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="size-4.5" />
                <span>Clients & Partners</span>
              </div>
              <span
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                  activeTab === 'clients' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {clients.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('careers');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="size-4.5" />
                <span>Careers / Jobs</span>
              </div>
              <span
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                  activeTab === 'careers' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {careers.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('enquiries');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'bg-[#d7192a] text-white shadow-md shadow-red-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="size-4.5" />
                <span>Client Enquiries</span>
              </div>
              <span
                className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                  activeTab === 'enquiries'
                    ? 'bg-white/20 text-white'
                    : messages.some((m) => !m.is_read)
                    ? 'bg-red-100 text-[#d7192a]'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {messages.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Admin User Profile & Logout at Bottom of Sidebar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#d7192a] shrink-0">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-900 truncate">{user?.name || 'TP IT Admin'}</div>
              <div className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@tpitgroup.com'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 h-8 rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold shadow-xs"
            >
              <Link to="/" target="_blank">
                Website <ExternalLink className="size-3 ml-1" />
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg text-slate-500 hover:text-[#d7192a] hover:bg-red-50 text-xs font-semibold cursor-pointer"
              title="Logout"
            >
              <LogOut className="size-3.5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* RIGHT SIDE DATA AREA                                      */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] min-h-screen">
        {/* Top Header Bar for Right Side */}
        <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer shadow-xs"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'team' && 'Our Team Leadership'}
                {activeTab === 'clients' && 'Clients & Enterprise Partners'}
                {activeTab === 'careers' && 'Career Openings & Jobs'}
                {activeTab === 'enquiries' && 'Client Enquiries & Consultation Leads'}
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {activeTab === 'overview' && 'Real-time database metrics and system activity'}
                {activeTab === 'team' && 'Manage executive team members stored in Laragon MySQL'}
                {activeTab === 'clients' && 'Manage partner logos and affiliations displayed on /clients'}
                {activeTab === 'careers' && 'Manage live job postings displayed on /careers'}
                {activeTab === 'enquiries' && 'Direct consultation enquiries submitted through the /contact page, stored in Laragon MySQL'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={handleSyncSchema}
              disabled={syncingSchema}
              variant="outline"
              size="sm"
              className="admin-card-inner h-9 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs gap-1.5 font-bold cursor-pointer shadow-xs"
              title="Automatically verify and sync all Laragon MySQL tables and columns"
            >
              <Database className={`size-3.5 ${syncingSchema ? 'animate-spin text-emerald-600' : 'text-emerald-700'}`} />
              <span className="hidden sm:inline">{syncingSchema ? 'Syncing...' : 'Sync Schema'}</span>
            </Button>

            <Button
              onClick={fetchAllData}
              disabled={loadingData}
              variant="outline"
              size="sm"
              className="admin-card-inner h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs gap-1.5 font-bold cursor-pointer shadow-xs"
            >
              <RefreshCw className={`size-3.5 ${loadingData ? 'animate-spin text-red-500' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Refresh DB</span>
            </Button>

            {activeTab === 'team' && (
              <Button
                onClick={() => openModal('team')}
                className="h-9 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md shadow-red-500/20 cursor-pointer"
              >
                <Plus className="size-3.5" /> <span className="hidden sm:inline">Add Team Member</span><span className="sm:hidden">Add</span>
              </Button>
            )}

            {activeTab === 'clients' && (
              <Button
                onClick={() => openModal('client')}
                className="h-9 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md shadow-red-500/20 cursor-pointer"
              >
                <Plus className="size-3.5" /> <span className="hidden sm:inline">Add Client Partner</span><span className="sm:hidden">Add</span>
              </Button>
            )}

            {activeTab === 'careers' && (
              <Button
                onClick={() => openModal('career')}
                className="h-9 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-md shadow-red-500/20 cursor-pointer"
              >
                <Plus className="size-3.5" /> <span className="hidden sm:inline">Post Job Opening</span><span className="sm:hidden">Add</span>
              </Button>
            )}
          </div>
        </header>

        {/* Main Body Content on Right Side */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full">

        {/* -------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              <div
                onClick={() => setActiveTab('team')}
                className="admin-card cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-300 hover:shadow-md transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Our Team Members</span>
                  <div className="size-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#d7192a] group-hover:scale-110 transition-transform">
                    <Users className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-black text-slate-900 tracking-tight">{team.length}</div>
                <p className="mt-1 text-xs font-medium text-slate-500">Executive leaders & founders</p>
              </div>

              <div
                onClick={() => setActiveTab('clients')}
                className="admin-card cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Clients</span>
                  <div className="size-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Building2 className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-black text-slate-900 tracking-tight">{clients.length}</div>
                <p className="mt-1 text-xs font-medium text-slate-500">Fortune 500 & partner network</p>
              </div>

              <div
                onClick={() => setActiveTab('careers')}
                className="admin-card cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-300 hover:shadow-md transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Career Openings</span>
                  <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Briefcase className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-black text-slate-900 tracking-tight">{careers.length}</div>
                <p className="mt-1 text-xs font-medium text-slate-500">Active job listings in USA, IN, CA</p>
              </div>

              <div
                onClick={() => setActiveTab('enquiries')}
                className="admin-card cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-purple-300 hover:shadow-md transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Enquiries</span>
                  <div className="size-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <MessageSquare className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">{messages.length}</span>
                  {messages.some((m) => !m.is_read) && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#d7192a]">
                      {messages.filter((m) => !m.is_read).length} new
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">Direct consultation leads from /contact</p>
              </div>

              <div className="admin-card rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Database Engine</span>
                  <div className="size-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Database className="size-4.5" />
                  </div>
                </div>
                <div className="mt-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Laragon MySQL
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-mono font-bold">DB: tpitgroup_db</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    {stats?.tables?.length || 7} Tables Synced
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="admin-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Quick Management Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => openModal('team')}
                  className="admin-card-inner flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-red-300 hover:bg-slate-100 transition group text-left cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#d7192a] transition">Add Team Leader</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">Insert new executive into MySQL</p>
                  </div>
                  <Plus className="size-5 text-[#d7192a]" />
                </button>

                <button
                  onClick={() => openModal('client')}
                  className="admin-card-inner flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-slate-100 transition group text-left cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">Add Client Partner</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">Add enterprise logo to /clients</p>
                  </div>
                  <Plus className="size-5 text-blue-600" />
                </button>

                <button
                  onClick={() => openModal('career')}
                  className="admin-card-inner flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-slate-100 transition group text-left cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition">Post Job Opening</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">Create new role on /careers</p>
                  </div>
                  <Plus className="size-5 text-emerald-600" />
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Our Team Leadership</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage executive team members stored in Laragon MySQL</p>
              </div>
            </div>

            {/* Filter & Live Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search team by name, role, department..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#d7192a] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={teamDeptFilter}
                  onChange={(e) => setTeamDeptFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-none font-medium"
                >
                  <option value="all">All Departments</option>
                  <option value="TP IT Group LLC">TP IT Group LLC</option>
                  <option value="Cloud & Deep-Tech">Cloud & Deep-Tech</option>
                  <option value="Engineering & Apps">Engineering & Apps</option>
                  <option value="Project & Operations">Project & Operations</option>
                  <option value="Business & Growth">Business & Growth</option>
                </select>
                <span className="text-[11px] text-slate-500 font-bold shrink-0 bg-slate-100 px-2 py-1 rounded-md">
                  {filteredTeam.length} of {team.length}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="admin-card overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Member</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Department</th>
                    <th className="px-5 py-3.5">Sub Role Description</th>
                    <th className="px-5 py-3.5 text-center">Order</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTeam.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-3">
                        <img
                          src={member.image || '/team/karthik.jpg'}
                          alt={member.name}
                          className="size-9 rounded-full object-cover border border-slate-200 shadow-xs"
                        />
                        <span className="text-sm font-bold text-slate-900">{member.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[#d7192a] font-bold">{member.role}</td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">{member.department || 'TP IT Group LLC'}</td>
                      <td className="px-5 py-3.5 text-slate-600 max-w-xs truncate">{member.sub_role || '—'}</td>
                      <td className="px-5 py-3.5 text-center font-mono text-slate-700 font-bold">{member.display_order ?? 0}</td>
                      <td className="px-5 py-3.5 text-right space-x-2">
                        <Button
                          onClick={() => openModal('team', member)}
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          onClick={() => handleDelete('team', member.id, member.name)}
                          variant="ghost"
                          size="icon"
                          className="size-8 text-slate-500 hover:text-[#d7192a] hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredTeam.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500 font-medium">
                        No team members match your search criteria.
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Clients & Enterprise Partners</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage all partner logos and categories in Laragon MySQL</p>
              </div>
            </div>

            {/* Filter & Live Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients by name, category..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#d7192a] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={clientCatFilter}
                  onChange={(e) => setClientCatFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-none font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="Fortune 500">Fortune 500</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Enterprise Partner">Enterprise Partner</option>
                  <option value="Technology Partner">Technology Partner</option>
                  <option value="Healthcare & Retail">Healthcare & Retail</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                </select>
                <span className="text-[11px] text-slate-500 font-bold shrink-0 bg-slate-100 px-2 py-1 rounded-md">
                  {filteredClients.length} of {clients.length}
                </span>
              </div>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredClients.map((c) => (
                <div
                  key={c.id}
                  className="admin-card rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition group relative shadow-xs"
                >
                  <div className="h-16 flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                    <img
                      src={c.src}
                      alt={c.name}
                      className="max-h-11 max-w-[85%] object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        if (img.nextElementSibling) {
                          (img.nextElementSibling as HTMLElement).style.display = 'block';
                        }
                      }}
                    />
                    <span className="hidden text-xs font-black text-slate-900 text-center tracking-tight px-1">
                      {c.name}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{c.category || 'Enterprise Partner'}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium">Order: {c.display_order ?? 0}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal('client', c)}
                        className="p-1 text-slate-400 hover:text-slate-800 transition cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('clients', c.id, c.name)}
                        className="p-1 text-slate-400 hover:text-[#d7192a] transition cursor-pointer"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Career Openings & Jobs</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage live job listings displayed on /careers</p>
              </div>
            </div>

            {/* Filter & Live Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  value={careerSearch}
                  onChange={(e) => setCareerSearch(e.target.value)}
                  placeholder="Search jobs by title, skills, location..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#d7192a] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={careerStatusFilter}
                  onChange={(e) => setCareerStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-none font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <span className="text-[11px] text-slate-500 font-bold shrink-0 bg-slate-100 px-2 py-1 rounded-md">
                  {filteredCareers.length} of {careers.length}
                </span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredCareers.map((job) => (
                <div
                  key={job.id}
                  className="admin-card rounded-2xl border border-slate-200 bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 hover:shadow-md transition shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-[#d7192a]">
                        {job.dept}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">{job.type}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-600">{job.location}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          job.is_active ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                    <p className="text-xs text-slate-600 max-w-2xl line-clamp-2">{job.description || 'No description'}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <Button
                      onClick={() => openModal('career', job)}
                      variant="outline"
                      size="sm"
                      className="admin-card-inner h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs gap-1 font-semibold cursor-pointer shadow-xs"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete('careers', job.id, job.title)}
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-xl text-slate-500 hover:text-[#d7192a] hover:bg-red-50 text-xs gap-1 font-semibold cursor-pointer"
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
              {filteredCareers.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-xs">
                  No job openings match your search criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 5: CLIENT ENQUIRIES & CONTACT MESSAGES */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Client Enquiries &amp; Leads</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct consultation enquiries submitted through the /contact page, stored in Laragon MySQL
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={fetchAllData}
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs gap-1.5 font-bold shadow-xs cursor-pointer"
                >
                  <RefreshCw className="size-3.5" /> Refresh Leads
                </Button>
              </div>
            </div>

            {/* Filter & Live Search Bar */}
            <div className="admin-card p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  placeholder="Search by client name, email, phone, requirements..."
                  className="admin-input w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white font-medium"
                />
              </div>

              <div className="flex items-center gap-2">
                {(['all', 'unread', 'read'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMessageFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                      messageFilter === filter
                        ? 'bg-[#d7192a] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'all' && `All (${messages.length})`}
                    {filter === 'unread' && `New (${messages.filter((m) => !m.is_read).length})`}
                    {filter === 'read' && `Read (${messages.filter((m) => m.is_read).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries Cards List */}
            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`admin-card p-5 rounded-2xl border transition-all ${
                    !msg.is_read
                      ? 'border-red-200 bg-red-50/20 shadow-sm'
                      : 'border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                        !msg.is_read
                          ? 'bg-red-100 text-[#d7192a]'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        <MessageSquare className="size-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{msg.name}</h4>
                          {!msg.is_read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d7192a] text-white uppercase tracking-wider">
                              New Lead
                            </span>
                          )}
                          <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                            {msg.subject || 'General Consultation'}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-slate-600 font-medium">
                          <a
                            href={`mailto:${msg.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-[#d7192a] transition font-semibold"
                          >
                            <Mail className="size-3.5 text-slate-400" />
                            <span>{msg.email}</span>
                          </a>
                          {msg.phone && (
                            <a
                              href={`tel:${msg.phone}`}
                              className="inline-flex items-center gap-1.5 hover:text-[#d7192a] transition"
                            >
                              <Phone className="size-3.5 text-slate-400" />
                              <span>{msg.phone}</span>
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="size-3" />
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>

                        {/* Message Preview */}
                        <p className="mt-2 text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100 font-normal">
                          {msg.message}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 md:self-start">
                      <Button
                        onClick={() => handleToggleRead(msg)}
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer shadow-xs"
                      >
                        {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg border-slate-200 bg-white text-slate-700 hover:text-[#d7192a] hover:bg-red-50 text-xs font-semibold shadow-xs"
                      >
                        <a href={`mailto:${msg.email}?subject=Regarding your enquiry at TP IT Group LLC&body=Dear ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for contacting TP IT Group LLC regarding "${encodeURIComponent(msg.subject || 'our services')}".%0D%0A%0D%0A`}>
                          Reply
                        </a>
                      </Button>
                      <Button
                        onClick={() => handleDeleteMessage(msg.id, msg.name)}
                        variant="ghost"
                        size="sm"
                        className="h-8 rounded-lg text-slate-400 hover:text-[#d7192a] hover:bg-red-50 cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="p-12 text-center text-xs text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <MessageSquare className="size-8 mx-auto mb-2 text-slate-300" />
                  No enquiries match your search criteria.
                </div>
              )}
            </div>
          </div>
        )}
        </main>
      </div>

      {/* -------------------------------------------------------- */}
      {/* ADD / EDIT MODAL */}
      {/* -------------------------------------------------------- */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="admin-card relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingItem ? 'Edit' : 'Add'}{' '}
                  {modalType === 'team' ? 'Team Member' : modalType === 'client' ? 'Client Partner' : 'Job Opening'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {modalType === 'team'
                    ? 'Configure executive profile details, role, and profile photo for /team'
                    : modalType === 'client'
                    ? 'Configure partner credentials and logo for /clients'
                    : 'Configure position requirements and visibility for /careers'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-5 text-xs">
              {/* TEAM FORM */}
              {modalType === 'team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN: Identity & Photo */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="e.g. Karthik Pushpa"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Role / Job Title *</label>
                      <input
                        required
                        type="text"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="e.g. CEO & Founder"
                      />
                    </div>

                    {/* PROFILE PHOTO UPLOAD / SELECTION SECTION */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 space-y-3">
                      <label className="block font-bold text-slate-800 text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Camera className="size-3.5 text-[#d7192a]" /> Profile Photo / Avatar
                        </span>
                        <span className="text-[11px] font-normal text-slate-500">
                          PNG, JPG, WebP up to 5MB
                        </span>
                      </label>

                      {/* Preview + File Upload Input */}
                      <div className="flex items-center gap-3.5">
                        <div className="relative size-16 shrink-0 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs">
                          <img
                            src={formData.image || '/team/karthik.jpg'}
                            alt="Profile Preview"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/team/karthik.jpg';
                            }}
                          />
                          {uploadingImage && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Loader2 className="size-5 text-white animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-xs transition active:scale-98">
                            {uploadingImage ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="size-3.5" />
                                <span>Upload Photo from Device</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={(e) => handleFileUpload(e, 'team')}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-slate-500">
                            Upload image directly, or choose from presets below
                          </p>
                        </div>
                      </div>

                      {/* Quick Avatar Presets */}
                      <div>
                        <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                          Or select standard avatar:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { name: 'Karthik', src: '/team/karthik.jpg' },
                            { name: 'Gayathri', src: '/team/gayathri.jpg' },
                            { name: 'Lakshmi', src: '/team/lakshmi.jpg' },
                            { name: 'Sai Deepa', src: '/team/sai-deepa.jpg' },
                            { name: 'Vijayan', src: '/team/vijayan.jpg' },
                          ].map((av) => (
                            <button
                              key={av.src}
                              type="button"
                              onClick={() => setFormData({ ...formData, image: av.src })}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-medium transition cursor-pointer ${
                                formData.image === av.src
                                  ? 'border-[#d7192a] bg-red-50 text-[#d7192a] font-bold ring-1 ring-[#d7192a]'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <img src={av.src} alt={av.name} className="size-4 rounded-full object-cover" />
                              <span>{av.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Image URL text fallback */}
                      <div>
                        <input
                          type="text"
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-[11px] text-slate-700 font-mono placeholder:text-slate-400"
                          placeholder="Image URL or path (e.g. /team/myphoto.jpg)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Details & Bio */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="e.g. TP IT Group LLC, Cloud & Deep-Tech"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Sub Role Description</label>
                      <input
                        type="text"
                        value={formData.sub_role || ''}
                        onChange={(e) => setFormData({ ...formData, sub_role: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="15+ Years in Enterprise IT Strategy..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Bio / Summary</label>
                      <textarea
                        rows={4}
                        value={formData.bio || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs leading-relaxed"
                        placeholder="Brief executive profile summary..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.display_order ?? 1}
                        onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CLIENT FORM */}
              {modalType === 'client' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN: Client Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="e.g. USAA, Progressive, Chase"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="Fortune 500, Financial Services, etc."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.display_order ?? 1}
                        onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                      />
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Logo Uploader */}
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 space-y-3">
                      <label className="block font-bold text-slate-800 text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="size-3.5 text-[#d7192a]" /> Partner Company Logo
                        </span>
                        <span className="text-[11px] font-normal text-slate-500">
                          PNG, JPG, SVG, WebP up to 5MB
                        </span>
                      </label>

                      <div className="flex items-center gap-3.5">
                        <div className="relative h-16 w-28 shrink-0 rounded-xl border border-slate-200 bg-white p-2 shadow-xs flex items-center justify-center">
                          <img
                            src={formData.src || '/logos/usaa.jpg'}
                            alt="Logo Preview"
                            className="max-h-12 max-w-full object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/logos/usaa.jpg';
                            }}
                          />
                          {uploadingImage && (
                            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                              <Loader2 className="size-4 text-white animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-xs transition active:scale-98">
                            {uploadingImage ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="size-3.5" />
                                <span>Upload Logo from Device</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={(e) => handleFileUpload(e, 'logos')}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-slate-500">
                            Upload logo file directly, or enter path below
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Logo Asset Path</label>
                        <input
                          required
                          type="text"
                          value={formData.src || ''}
                          onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-700 font-mono placeholder:text-slate-400"
                          placeholder="Logo path (e.g. /logos/mycompany.png)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CAREER FORM */}
              {modalType === 'career' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN: Job Overview */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
                      <input
                        required
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                        placeholder="e.g. Senior SAP S/4HANA Consultant"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Department *</label>
                        <input
                          required
                          type="text"
                          value={formData.dept || ''}
                          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                          placeholder="Engineering, FinLabs..."
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Location *</label>
                        <input
                          required
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                          placeholder="Wilmington, DE / Hybrid"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Employment Type</label>
                        <select
                          value={formData.type || 'Full-time'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 font-medium text-xs"
                        >
                          <option value="Full-time" className="bg-white text-slate-900">Full-time</option>
                          <option value="Contract" className="bg-white text-slate-900">Contract</option>
                          <option value="Part-time" className="bg-white text-slate-900">Part-time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Experience</label>
                        <input
                          type="text"
                          value={formData.experience || ''}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder:text-slate-400 font-medium text-xs"
                          placeholder="3-5 years"
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Description & Status */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Role Description</label>
                      <textarea
                        rows={5}
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="admin-input w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 font-medium text-xs leading-relaxed"
                        placeholder="Key responsibilities and qualifications..."
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={Boolean(formData.is_active)}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                        className="size-4 rounded border-slate-300 text-[#d7192a]"
                      />
                      <label htmlFor="is_active" className="font-bold text-slate-700 cursor-pointer text-xs">
                        Listing is Active (Visible on /careers)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={closeModal}
                  variant="outline"
                  className="admin-card-inner h-9 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs cursor-pointer shadow-md shadow-red-500/20 px-5"
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
