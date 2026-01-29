import {
    Code,
    FileJson,
    Hash,
    Palette,
    Type,
    Link as LinkIcon
} from 'lucide-react';

export const tools = [
    {
        icon: FileJson,
        label: 'JSON Formatter',
        to: '/json-formatter',
        description: 'Format, minify, and validate JSON data with syntax highlighting.'
    },
    {
        icon: Hash,
        label: 'Base64 Converter',
        to: '/base64',
        description: 'Encode text to Base64 or decode Base64 strings to text.'
    },
    {
        icon: Code,
        label: 'UUID Generator',
        to: '/uuid',
        description: 'Generate distinct Version 4 UUIDs (Universally Unique Identifiers).'
    },
    {
        icon: Palette,
        label: 'Color Tools',
        to: '/color',
        description: 'Convert color values between HEX, RGB, and HSL formats.'
    },
    {
        icon: Type,
        label: 'Lorem Ipsum',
        to: '/lorem',
        description: 'Generate placeholder text for your designs and mockups.'
    },
    {
        icon: LinkIcon,
        label: 'URL Encoder',
        to: '/url',
        description: 'Encode or decode URL-safe strings.'
    },
];
