import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Menu, Zap, Heart, Star, ExternalLink, Info } from 'lucide-react';
import { tools } from '@/config/tools';

const sidebarItems = tools;

export function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth > 1024);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close mobile menu on navigation
    React.useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Handle window resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Sidebar Desktop */}
            <div
                className={cn(
                    "hidden lg:flex flex-col border-r border-primary/20 bg-slate-950/50 backdrop-blur-2xl transition-all duration-300 ease-in-out relative z-20",
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

                {/* Monetization: Go Pro & Ads */}
                <div className="px-5 py-4 space-y-4">
                    <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-4 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                Go Pro
                            </h4>
                            <p className="text-[10px] text-muted-foreground mb-3">Get cloud savings & premium API access.</p>
                            <Button size="sm" className="w-full h-8 text-[10px] bg-primary/20 hover:bg-primary/40 border border-primary/30 text-primary">
                                Learn More
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 h-16 w-16 bg-primary/20 blur-2xl rounded-full" />
                    </div>

                    {sidebarOpen && (
                        <div className="border border-dashed border-primary/20 rounded-lg p-3 bg-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[8px] uppercase tracking-widest text-primary/40">Sponsored</span>
                                <Info className="h-3 w-3 text-primary/20 group-hover:text-primary/40" />
                            </div>
                            <div className="text-[11px] text-muted-foreground leading-snug">
                                Carbon Ads: Reach developers on the top tool sites.
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-[9px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                View website <ExternalLink className="h-2 w-2" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-primary/20">
                    <Button
                        variant="default"
                        size="sm"
                        className="w-full mb-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary group"
                    >
                        <Heart className="h-4 w-4 mr-2 fill-primary/20 group-hover:fill-primary transition-all" />
                        {sidebarOpen && "Support the Project"}
                    </Button>

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

            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar Content */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-primary/20 z-50 lg:hidden transition-transform duration-300 ease-in-out flex flex-col",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-20 items-center px-6 border-b border-primary/20" onClick={() => navigate('/')}>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50">
                            <Zap className="h-5 w-5 text-slate-950" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DevTools</span>
                            <span className="text-[10px] text-primary/70">Pro Suite</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                                )
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 border-t border-primary/20">
                    <div className="flex flex-col px-2">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Project by</span>
                        <span className="text-xs font-semibold text-primary/70">ADAM .JADYANE</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-primary/20 bg-slate-950/50 backdrop-blur-xl z-30">
                    <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DevTools</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(true)}
                        className="text-primary hover:bg-primary/10"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                    <div className="mx-auto max-w-6xl space-y-6 md:space-y-8 pb-12">
                        <header className="mb-4 md:mb-8">
                            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-1 md:mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                {sidebarItems.find(i => i.to === location.pathname)?.label || "Dashboard"}
                            </h1>
                            <p className="text-xs md:text-base text-muted-foreground">Powerful tools for modern developers</p>
                        </header>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div >
    );
}
