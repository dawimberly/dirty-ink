"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MessageTemplate } from "@/lib/constants";

export function TemplateCard({ template }: { template: MessageTemplate }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(template.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{template.title}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="secondary">{template.category}</Badge>
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 font-sans text-sm leading-relaxed text-muted-foreground">
          {template.body}
        </pre>
      </CardContent>
    </Card>
  );
}
