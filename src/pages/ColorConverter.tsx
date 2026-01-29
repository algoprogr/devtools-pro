import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Palette, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ColorConverter() {
    const [hex, setHex] = useState('#000000');
    const [rgb, setRgb] = useState('rgb(0, 0, 0)');
    const [hsl, setHsl] = useState('hsl(0, 0%, 0%)');
    const { toast } = useToast();

    const handleHexChange = (value: string) => {
        setHex(value);
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            const r = parseInt(value.slice(1, 3), 16);
            const g = parseInt(value.slice(3, 5), 16);
            const b = parseInt(value.slice(5, 7), 16);

            setRgb(`rgb(${r}, ${g}, ${b})`);

            // Calculate HSL
            const rNorm = r / 255;
            const gNorm = g / 255;
            const bNorm = b / 255;
            const max = Math.max(rNorm, gNorm, bNorm);
            const min = Math.min(rNorm, gNorm, bNorm);
            let h = 0, s = 0, l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
                    case gNorm: h = (bNorm - rNorm) / d + 2; break;
                    case bNorm: h = (rNorm - gNorm) / d + 4; break;
                }
                h /= 6;
            }

            setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Palette className="h-6 w-6" />
                    Color Converter
                </CardTitle>
                <CardDescription>Convert between HEX, RGB, and HSL formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div
                        className="w-full md:w-48 h-48 rounded-lg shadow-inner border-2"
                        style={{ backgroundColor: hex }}
                    />
                    <div className="flex-1 space-y-4">
                        <div className="grid gap-2">
                            <Label>HEX</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={hex}
                                    onChange={(e) => handleHexChange(e.target.value)}
                                    maxLength={7}
                                />
                                <Input
                                    type="color"
                                    className="w-12 p-1"
                                    value={hex}
                                    onChange={(e) => handleHexChange(e.target.value)}
                                />
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hex)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>RGB</Label>
                            <div className="flex gap-2">
                                <Input value={rgb} readOnly />
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(rgb)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>HSL</Label>
                            <div className="flex gap-2">
                                <Input value={hsl} readOnly />
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hsl)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
