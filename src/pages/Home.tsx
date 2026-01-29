import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tools } from '@/config/tools';
import { ArrowRight, Sparkles, Star, ExternalLink } from 'lucide-react';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-6 relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>Professional Developer Toolkit</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                        Your Ultimate
                    </span>
                    <br />
                    <span className="text-foreground">Development Arsenal</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
                    Streamline your workflow with our collection of powerful, beautifully designed tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <Card
                        key={tool.to}
                        className="group relative overflow-hidden cursor-pointer border-primary/20 bg-slate-950/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
                        onClick={() => navigate(tool.to)}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Pro Badge for some tools (simulation) */}
                        {index > 3 && (
                            <div className="absolute top-4 right-4 z-20">
                                <div className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold text-primary flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-primary" />
                                    PRO
                                </div>
                            </div>
                        )}

                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Neon border effect on hover */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(45, 212, 191, 0.1) 50%, transparent 70%)',
                                backgroundSize: '200% 200%',
                                animation: 'shimmer 3s infinite'
                            }}
                        />

                        <CardHeader className="relative z-10">
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
                                <tool.icon className="h-7 w-7 text-primary group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                            </div>
                            <CardTitle className="flex items-center justify-between text-xl text-white/70 group-hover:text-white transition-colors">
                                <span>{tool.label}</span>
                                <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <CardDescription className="text-base text-muted-foreground/90 group-hover:text-muted-foreground transition-colors">
                                {tool.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Affiliate / Recommendations Section */}
            <div className="border-t border-primary/10 pt-12">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Recommended Developer Stack</h3>
                    <p className="text-muted-foreground">The tools we use to build DevTools Pro.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Premium Hosting', desc: 'Secure, fast, and globally distributed.', link: '#' },
                        { title: 'UI Design Kit', desc: 'Professional Figma components.', link: '#' },
                        { title: 'Dev Courses', desc: 'Master React and TypeScript.', link: '#' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl border border-primary/10 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer">
                            <h4 className="font-bold text-primary mb-1 flex items-center justify-between">
                                {item.title}
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add shimmer animation to global CSS if not already present
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(style);
