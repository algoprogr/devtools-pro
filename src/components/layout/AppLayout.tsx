import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Menu, Zap } from 'lucide-react';
import { tools } from '@/config/tools';

const sidebarItems = tools;

export function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Sidebar */}
            <div
                className={cn(
                    "flex flex-col border-r border-primary/20 bg-slate-950/50 backdrop-blur-2xl transition-all duration-300 ease-in-out relative z-20",
                    sidebarOpen ? "w-72" : "w-20"
                )}
            >
                <div className={cn(
                    "flex h-20 items-center border-b border-primary/20 cursor-pointer group transition-all",
                    sidebarOpen ? "px-6" : "justify-center"
                )} onClick={() => navigate('/')}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 group-hover:shadow-primary/80 transition-all group-hover:scale-110">
                            <Zap className="h-6 w-6 text-slate-950" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col">
                                <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DevTools</span>
                                <span className="text-xs text-primary/70">Pro Suite</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent",
                                    !sidebarOpen && "justify-center px-2"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-all",
                                        isActive && "text-primary drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]",
                                        !isActive && "group-hover:scale-110"
                                    )} />
                                    {sidebarOpen && <span>{item.label}</span>}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 border-t border-primary/20">
                    <div className={cn(
                        "flex items-center gap-3 transition-all mb-4",
                        sidebarOpen ? "px-2" : "justify-center"
                    )}>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="h-9 w-9 shrink-0 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                        {sidebarOpen && (
                            <div className="flex flex-col whitespace-nowrap overflow-hidden">
                                <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Project by</span>
                                <span className="text-xs font-semibold text-primary/70">ADAM .JADYANE</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-8 relative z-10">
                    <div className="mx-auto max-w-6xl space-y-8 pb-12">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                {sidebarItems.find(i => i.to === location.pathname)?.label || "Dashboard"}
                            </h1>
                            <p className="text-muted-foreground">Powerful tools for modern developers</p>
                        </header>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}
