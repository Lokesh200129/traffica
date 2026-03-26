"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country } from "country-state-city";
import { AppButton } from "@/components/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAgency } from "@/hooks/agency/use-create-agency";
import { SearchableSelect } from "../../billing/settings/_components/searchable-select";

// ── Ek baar calculate ─────────────────────────────────────────────────────────
const ALL_COUNTRIES = Country.getAllCountries()

// ── Schema ────────────────────────────────────────────────────────────────────
const agencySchema = z.object({
    agencyName: z.string().min(2, "Agency name must be at least 2 characters"),
    website: z.string().url("Enter a valid URL e.g. https://youragency.com"),
    country: z.string().min(1, "Please select a country"),
    services: z.string().min(20, "Please describe your services (min 20 characters)"),
    plan: z.string().min(20, "Please describe your plan (min 20 characters)"),
});

type AgencyFormValues = z.infer<typeof agencySchema>;

// ── Main Component ────────────────────────────────────────────────────────────
export default function AgencyPage() {
    const { mutate: submitForm } = useCreateAgency();

    const form = useForm<AgencyFormValues>({
        resolver: zodResolver(agencySchema),
        defaultValues: {
            agencyName: "",
            website: "",
            country: "",
            services: "",
            plan: "",
        },
    });

    const handleSubmit = async (data: AgencyFormValues) => {
        submitForm(data);
        form.reset();
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Are you an agency?</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Partner with us as a reseller and unlock exclusive pricing, priority support, and white-label options.
                </p>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border border-border bg-card p-6 w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">

                        {/* Row 1 — Agency Name + Website */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="agencyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agency Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Acme Marketing Co." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://youragency.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2 — Country (half width) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <SearchableSelect
                                                options={ALL_COUNTRIES.map(c => ({ value: c.name, label: c.name }))}
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Search country..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 3 — Services */}
                        <FormField
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What services are you providing?</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. SEO, paid media management, web traffic campaigns for e-commerce clients…"
                                            className="min-h-28 resize-y"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Row 4 — Plan */}
                        <FormField
                            control={form.control}
                            name="plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>How do you plan to offer our services to your clients?</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. We will bundle your traffic service into our monthly retainer packages…"
                                            className="min-h-28 resize-y"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <div className="pt-1">
                            <AppButton
                                title="Submit Application"
                                type="submit"
                                isLoading={form.formState.isSubmitting}
                            />
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
}