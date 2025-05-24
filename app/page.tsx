"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    ArrowRight,
    Code2,
    Copy,
    Sparkles,
    Star,
    Users,
    Zap,
} from "lucide-react";
import { useState } from "react";

export default function TailwindConverter() {
    const [input, setInput] = useState(`{
  container: {
    center: true,
    padding: {
      DEFAULT: "1rem",
      xl: "3rem"
    },
    screens: {
      "2xl": "1470px"
    }
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      primary: {
        50: "var(--primary-50)",
        100: "var(--primary-100)",
        DEFAULT: "var(--primary)"
      }
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)"
    },
    fontSize: {
      lg: ["1.125rem", "1.5rem"],
      h1: ["4rem", "5rem"]
    }
  }
}`);
    const [output, setOutput] = useState("");
    const { toast } = useToast();

    function camelToKebab(str: string): string {
        return str.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
    }

    function safeParse(input: string): any {
        try {
            return eval("(" + input + ")");
        } catch {
            return null;
        }
    }

    function formatValue(val: any): string {
        if (typeof val === "string") {
            if (/^(var\(--|hsl\()/i.test(val)) {
                return val;
            }
            return `"${val}"`;
        } else if (typeof val === "boolean") {
            return val ? "true" : "false";
        } else if (Array.isArray(val)) {
            return val.map(formatValue).join(", ");
        } else {
            return val;
        }
    }

    function parseNested(obj: any, prefix = ""): string {
        const lines: string[] = [];

        function recurse(currentObj: any, currentPrefix: string) {
            for (const key in currentObj) {
                const val = currentObj[key];
                const kebabKey = camelToKebab(key);
                const cssVarName = `--${currentPrefix}${kebabKey}`;

                if (val && typeof val === "object" && !Array.isArray(val)) {
                    recurse(val, `${currentPrefix}${kebabKey}-`);
                } else {
                    const formattedVal = formatValue(val);
                    lines.push(`  ${cssVarName}: ${formattedVal};`);
                }
            }
        }

        recurse(obj, prefix);
        return lines.join("\n");
    }

    function convertTailwindConfigToV4(inputConfigString: string): string {
        if (!inputConfigString.trim()) {
            return "❌ Please enter a configuration to convert.";
        }

        let config;
        try {
            config = eval("(" + inputConfigString + ")");
        } catch (error) {
            return "❌ Invalid JavaScript syntax. Please check your configuration format.";
        }

        if (!config || typeof config !== "object") {
            return "❌ Configuration must be a valid JavaScript object.";
        }

        const theme = config.theme || config;

        if (!theme || typeof theme !== "object") {
            return "❌ No theme object found. Please provide a valid theme configuration.";
        }

        const lines = ["@theme {"];

        try {
            for (const topKey in theme) {
                if (!theme.hasOwnProperty(topKey)) continue;

                const val = theme[topKey];
                const kebabTopKey = camelToKebab(topKey);

                if (val && typeof val === "object" && !Array.isArray(val)) {
                    const nestedLines = parseNested(val, `${kebabTopKey}-`);
                    if (nestedLines) {
                        lines.push(nestedLines);
                    }
                } else {
                    lines.push(`  --${kebabTopKey}: ${formatValue(val)};`);
                }
            }

            lines.push("}");
            return lines.join("\n");
        } catch (error) {
            return "❌ Error processing configuration. Please check the format and try again.";
        }
    }

    const handleConvert = () => {
        const result = convertTailwindConfigToV4(input);
        setOutput(result);

        if (result.startsWith("❌")) {
            toast({
                title: "Conversion Error",
                description: "Please check your configuration format",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Conversion Complete!",
                description: "Your v4 theme is ready to use",
            });
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(output);
            toast({
                title: "Copied!",
                description: "Output copied to clipboard",
            });
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Please copy manually",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            {/* SEO Header Section */}
            <header className="sr-only">
                <h1>
                    Tailwind CSS v3 to v4 Converter - Free Online Migration Tool
                </h1>
                <p>
                    Convert your Tailwind CSS version 3 configuration files to
                    the new version 4 @theme syntax. This free online tool helps
                    developers migrate their Tailwind CSS projects with ease.
                </p>
            </header>

            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    {/* Hero Section */}
                    <section className="text-center mb-12 relative">
                        <div className="absolute top-0 right-0">
                            <ThemeToggle />
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                                <Code2 className="h-6 w-6 text-white" />
                            </div>
                            <Badge
                                variant="secondary"
                                className="text-sm font-medium"
                            >
                                v4.0 Ready
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-gray-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-4">
                            Tailwind CSS v3 to v4 Converter
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                            Transform your Tailwind CSS v3 configuration to the
                            new v4 @theme syntax with ease. Free, fast, and
                            reliable migration tool for developers.
                        </p>

                        {/* Stats Section */}
                        <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>10,000+ Conversions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Instant Results</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <span>100% Free</span>
                            </div>
                        </div>
                    </section>

                    {/* Main Converter Section */}
                    <section className="grid lg:grid-cols-2 gap-8 mb-16">
                        {/* Input Section */}
                        <article>
                            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <CardTitle className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            Tailwind v3 Configuration Input
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Paste your Tailwind CSS v3 theme object
                                        or full configuration file (JavaScript
                                        syntax)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        placeholder="Paste your Tailwind v3 config here..."
                                        className="min-h-[400px] font-mono text-sm resize-none border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        aria-label="Tailwind CSS v3 configuration input"
                                    />
                                    <Button
                                        onClick={handleConvert}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
                                        size="lg"
                                        aria-label="Convert Tailwind CSS configuration to v4"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Convert to v4 @theme Syntax
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </article>

                        {/* Output Section */}
                        <article>
                            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <CardTitle className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                Tailwind v4 @theme Output
                                            </CardTitle>
                                        </div>
                                        {output && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={copyToClipboard}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                                aria-label="Copy converted configuration to clipboard"
                                            >
                                                <Copy className="h-4 w-4 mr-1" />
                                                Copy
                                            </Button>
                                        )}
                                    </div>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Your converted @theme block ready for
                                        Tailwind CSS v4
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative">
                                        <pre
                                            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm font-mono overflow-auto min-h-[400px] whitespace-pre-wrap text-gray-900 dark:text-gray-100"
                                            aria-label="Converted Tailwind CSS v4 configuration output"
                                        >
                                            {output ||
                                                "Click 'Convert to v4' to see your converted theme..."}
                                        </pre>
                                        {!output && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="text-gray-400 dark:text-gray-500 text-center">
                                                    <Code2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p className="text-sm">
                                                        Converted @theme output
                                                        will appear here
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </article>
                    </section>

                    {/* Features Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                            Why Use Our Tailwind CSS Converter?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="text-center p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-colors duration-300">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Smart Conversion
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Automatically converts camelCase to
                                    kebab-case and handles nested objects with
                                    precision
                                </p>
                            </Card>
                            <Card className="text-center p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-colors duration-300">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Code2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    CSS Variables Support
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Preserves CSS variables and functions like
                                    hsl(), var(), and calc() during conversion
                                </p>
                            </Card>
                            <Card className="text-center p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-colors duration-300">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Copy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    One-Click Copy
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Copy converted configuration to clipboard
                                    instantly for seamless integration
                                </p>
                            </Card>
                        </div>
                    </section>

                    {/* How to Use Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                            How to Convert Tailwind CSS v3 to v4
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    1
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Paste Your Config
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Copy your Tailwind CSS v3 configuration and
                                    paste it into the input area
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    2
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Click Convert
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Press the convert button to transform your
                                    config to v4 @theme syntax
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    3
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Copy & Use
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Copy the converted @theme block and use it
                                    in your Tailwind CSS v4 project
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    What is Tailwind CSS v4?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tailwind CSS v4 introduces a new @theme
                                    syntax that replaces the traditional
                                    JavaScript configuration file with CSS-based
                                    theming.
                                </p>
                            </Card>
                            <Card className="p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Is this tool free to use?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Yes, this Tailwind CSS converter is
                                    completely free to use with no registration
                                    required.
                                </p>
                            </Card>
                            <Card className="p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Does it preserve custom CSS variables?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Yes, the converter preserves CSS variables,
                                    functions like hsl() and var(), and
                                    maintains your custom styling.
                                </p>
                            </Card>
                            <Card className="p-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Can I convert partial configurations?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Yes, you can convert both full Tailwind
                                    configurations and partial theme objects.
                                </p>
                            </Card>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        © {new Date().getFullYear()} Tailwind CSS Converter.
                        Free tool for developers migrating to Tailwind CSS v4.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                        <a
                            href="https://github.com/akashusr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            <img
                                src="https://avatars.githubusercontent.com/u/71524256?v=4"
                                alt="Akash Ahmed"
                                className="w-6 h-6 rounded-full"
                            />
                            <span> Akash Ahmed</span>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
