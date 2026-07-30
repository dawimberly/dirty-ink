import { TemplateCard } from "@/components/templates/template-card";
import { MESSAGE_TEMPLATES } from "@/lib/constants";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Message templates
        </h1>
        <p className="text-sm text-muted-foreground">
          Copy-paste intros and follow-ups for Instagram and email. Edit placeholders
          before sending.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {MESSAGE_TEMPLATES.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
