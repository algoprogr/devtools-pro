import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Hash, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Base64Converter() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [inputBase64, setInputBase64] = useState('');
    const [outputDecoded, setOutputDecoded] = useState('');
    const { toast } = useToast();

    const handleEncode = () => {
        try {
            if (!inputText) return;
            // Handle UTF-8 strings
            const encoded = btoa(unescape(encodeURIComponent(inputText)));
            setOutputText(encoded);
            toast({ title: "Encoded successfully" });
        } catch (e) {
            toast({ title: "Encoding failed", description: String(e), variant: "destructive" });
        }
    };

    const handleDecode = () => {
        try {
            if (!inputBase64) return;
            const decoded = decodeURIComponent(escape(atob(inputBase64)));
            setOutputDecoded(decoded);
            toast({ title: "Decoded successfully" });
        } catch (e) {
            toast({ title: "Decoding failed", description: "Invalid Base64 string", variant: "destructive" });
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hash className="h-6 w-6" />
                    Base64 Converter
                </CardTitle>
                <CardDescription>Encode to and decode from Base64 format.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="encode" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="encode">Encode</TabsTrigger>
                        <TabsTrigger value="decode">Decode</TabsTrigger>
                    </TabsList>

                    <TabsContent value="encode" className="space-y-4 pt-4">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Text Input</Label>
                                <Textarea
                                    placeholder="Enter text to encode..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="min-h-[200px]"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleEncode}>Encode</Button>
                                    <Button variant="ghost" size="icon" onClick={() => setInputText('')}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Base64 Output</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        value={outputText}
                                        className="min-h-[200px] bg-muted"
                                    />
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(outputText);
                                            toast({ title: "Copied" });
                                        }}
                                        disabled={!outputText}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="decode" className="space-y-4 pt-4">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Base64 Input</Label>
                                <Textarea
                                    placeholder="Paste Base64 string..."
                                    value={inputBase64}
                                    onChange={(e) => setInputBase64(e.target.value)}
                                    className="min-h-[200px]"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleDecode}>Decode</Button>
                                    <Button variant="ghost" size="icon" onClick={() => setInputBase64('')}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Decoded Output</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        value={outputDecoded}
                                        className="min-h-[200px] bg-muted"
                                    />
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(outputDecoded);
                                            toast({ title: "Copied" });
                                        }}
                                        disabled={!outputDecoded}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
