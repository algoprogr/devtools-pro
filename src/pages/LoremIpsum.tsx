import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Type, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function LoremIpsum() {
    const [count, setCount] = useState([3]);
    const [type, setType] = useState('paragraphs');
    const [output, setOutput] = useState('');
    const { toast } = useToast();

    const generate = () => {
        let result = [];
        const sourceWords = LOREM_TEXT.replace(/[.,]/g, '').toLowerCase().split(' ');
        const sourceSentences = LOREM_TEXT.split('. ');

        if (type === 'words') {
            for (let i = 0; i < count[0]; i++) {
                result.push(sourceWords[i % sourceWords.length]);
            }
            setOutput(result.join(' '));
        } else if (type === 'sentences') {
            for (let i = 0; i < count[0]; i++) {
                result.push(sourceSentences[i % sourceSentences.length] + '.');
            }
            setOutput(result.join(' '));
        } else {
            for (let i = 0; i < count[0]; i++) {
                result.push(LOREM_TEXT);
            }
            setOutput(result.join('\n\n'));
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
                    <Type className="h-6 w-6" />
                    Lorem Ipsum Generator
                </CardTitle>
                <CardDescription>Generate placeholder text.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between">
                            <Label>Count: {count[0]}</Label>
                        </div>
                        <Slider
                            value={count}
                            onValueChange={setCount}
                            min={1}
                            max={50}
                            step={1}
                        />
                    </div>
                    <div className="w-full md:w-48 space-y-2">
                        <Label>Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                                <SelectItem value="sentences">Sentences</SelectItem>
                                <SelectItem value="words">Words</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-end">
                        <Button onClick={generate} className="w-full md:w-auto">
                            <RefreshCw className="mr-2 h-4 w-4" /> Generate
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <Label>Output</Label>
                        <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!output}>
                            <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                    </div>
                    <Textarea
                        readOnly
                        value={output}
                        className="flex-1 resize-none min-h-[300px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
