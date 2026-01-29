import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link, Copy, Trash2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UrlEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { toast } = useToast();

    const handleEncode = () => {
        try {
            if (!input) return;
            setOutput(encodeURIComponent(input));
            toast({ title: "Encoded" });
        } catch (e) {
            toast({ title: "Error encoding", variant: "destructive" });
        }
    };

    const handleDecode = () => {
        try {
            if (!input) return;
            setOutput(decodeURIComponent(input));
            toast({ title: "Decoded" });
        } catch (e) {
            toast({ title: "Error decoding", description: "Invalid URL string", variant: "destructive" });
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Link className="h-6 w-6" />
                    URL Encoder/Decoder
                </CardTitle>
                <CardDescription>Encode or decode URL components.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="flex flex-col gap-2 h-full">
                        <Label>Input</Label>
                        <Textarea
                            placeholder="Enter text here..."
                            className="flex-1 resize-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <Button onClick={handleEncode} className="w-full">
                            Encode <ArrowRightLeft className="ml-2 h-4 w-4" />
                        </Button>
                        <Button onClick={handleDecode} variant="secondary" className="w-full">
                            Decode <ArrowRightLeft className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => {
                            setInput('');
                            setOutput('');
                        }}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear
                        </Button>
                    </div>

                    <div className="flex flex-col gap-2 h-full md:col-start-2 md:row-start-1">
                        <Label>Output</Label>
                        <div className="relative flex-1">
                            <Textarea
                                readOnly
                                className="h-full resize-none bg-muted"
                                value={output}
                            />
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    if (!output) return;
                                    navigator.clipboard.writeText(output);
                                    toast({ title: "Copied" });
                                }}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
