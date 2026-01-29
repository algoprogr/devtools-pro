import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Code, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const generateUUID = () => {
    if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function UuidGenerator() {
    const [count, setCount] = useState([1]);
    const [hyphens, setHyphens] = useState(true);
    const [uuids, setUuids] = useState<string[]>([]);
    const { toast } = useToast();

    const generate = () => {
        const newUuids = Array.from({ length: count[0] }, () => {
            let id = generateUUID();
            if (!hyphens) id = id.replace(/-/g, '');
            return id;
        });
        setUuids(newUuids);
    };

    React.useEffect(() => {
        generate();
    }, []);

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        toast({ title: "Copied all UUIDs" });
    };

    const copyOne = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({ title: "Copied UUID" });
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Code className="h-6 w-6" />
                    UUID Generator
                </CardTitle>
                <CardDescription>Generate v4 UUIDs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center p-6 bg-muted/50 rounded-lg">
                    <div className="space-y-4 flex-1 w-full">
                        <div className="flex justify-between">
                            <Label className="text-base">Quantity: {count[0]}</Label>
                        </div>
                        <Slider
                            value={count}
                            onValueChange={setCount}
                            min={1}
                            max={50}
                            step={1}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="hyphens" checked={hyphens} onCheckedChange={setHyphens} />
                        <Label htmlFor="hyphens">Hyphens</Label>
                    </div>
                    <Button onClick={generate} size="lg" className="w-full md:w-auto">
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate
                    </Button>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Results</Label>
                        {uuids.length > 0 && (
                            <Button variant="outline" size="sm" onClick={copyAll}>
                                <Copy className="mr-2 h-4 w-4" /> Copy All
                            </Button>
                        )}
                    </div>
                    <div className="grid gap-2 max-h-[500px] overflow-y-auto">
                        {uuids.map((id, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 bg-card border rounded-md font-mono text-sm shadow-sm">
                                <span className="flex-1">{id}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyOne(id)}>
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
