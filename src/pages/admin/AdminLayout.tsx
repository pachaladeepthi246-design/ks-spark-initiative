import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Wrench, Users, BarChart3, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/tools', icon: Wrench, label: 'Tools' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />Back to Site
          </Link>
          <span className="ml-6 font-bold text-xl">Admin Panel</span>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", location.pathname === to ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>
                <Icon className="h-4 w-4" />{label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  )
}
