import { getSession, logout } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import { LogOut, Package, ShieldCheck, Mail, Hash, Settings, ShoppingBag } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login?from=/profile');

  const infoItems = [
    { icon: Mail,        label: 'Email',   value: session.email       },
    { icon: ShieldCheck, label: 'Role',    value: session.role        },
    { icon: Hash,        label: 'User ID', value: `#${session.id}`   },
    { icon: Settings,    label: 'Status',  value: 'Active'            },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8 w-full">

      
      <div className="rounded-3xl border overflow-hidden"
        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>

        
        <div className="h-32 sm:h-36 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F0A1E 0%, #312e81 100%)' }}>
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 70% 50%, rgba(129,140,248,0.3), transparent 60%)' }} />
          <div className="absolute bottom-3 right-5 opacity-10 pointer-events-none select-none">
            <ShoppingBag style={{ width: 64, height: 64, color: '#fff' }} />
          </div>
        </div>

        <div className="px-5 sm:px-8 pt-8 pb-7">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <Avatar src={session.avatar} name={session.name} size={80} />
            <form action={logout}>
              <button type="submit"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl hover:opacity-80 transition-all mb-1"
                style={{ background: '#FEF2F2', color: '#EF4444' }}>
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign out</span>
              </button>
            </form>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold mb-0.5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            {session.name}
          </h1>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>{session.email}</p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-2xl border"
                style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--accent-light)' }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: 'var(--text-secondary)' }}>{label}</p>
                  <p className="text-sm font-semibold truncate"
                    style={{ color: 'var(--text-primary)' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="mt-3.5 rounded-2xl border overflow-hidden"
        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
        <div className="px-5 py-4 border-b flex items-center gap-2.5"
          style={{ borderColor: 'var(--surface-border)' }}>
          <Package className="w-4 h-4" style={{ color: 'var(--accent)' }} />
          <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Recent Orders</h2>
        </div>
        <div className="flex flex-col items-center py-12 text-center px-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: 'var(--surface-secondary)' }}>
            <Package className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No orders yet</p>
          <p className="text-xs mb-5 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
            When you place your first order it will appear here.
          </p>
          <Link href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <ShoppingBag className="w-4 h-4" />
            Start shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
