import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Trash2, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { toast } = useToast();

    const handleFormat = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            toast({ title: "Formatted successfully" });
        } catch (error: any) {
            toast({
                title: "Invalid JSON",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const handleMinify = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            toast({ title: "Minified successfully" });
        } catch (error: any) {
            toast({
                title: "Invalid JSON",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast({ title: "Copied to clipboard" });
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileJson className="h-6 w-6" />
                    JSON Formatter
                </CardTitle>
                <CardDescription>Format, validate, and minify your JSON data.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col gap-2 h-full">
                        <Label>Input</Label>
                        <Textarea
                            placeholder="Paste JSON here..."
                            className="flex-1 font-mono text-sm min-h-[300px] resize-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleFormat}>Format</Button>
                            <Button variant="outline" onClick={handleMinify}>Minify</Button>
                            <Button variant="ghost" size="icon" onClick={() => setInput('')}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 h-full">
                        <Label>Output</Label>
                        <Textarea
                            readOnly
                            className="flex-1 font-mono text-sm bg-muted min-h-[300px] resize-none"
                            value={output}
                        />
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={copyToClipboard} disabled={!output}>
                                <Copy className="mr-2 h-4 w-4" /> Copy
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
