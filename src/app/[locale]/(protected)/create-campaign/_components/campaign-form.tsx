"use client";

import { useForm, Controller } from "react-hook-form";
import type { CampaignFormData } from "../../_types/type";
import { TRAFFIC_SOURCES, DEVICES } from "../_lib/constants";
import { useSectionSave } from "../_hooks/useSectionSave";
import { Section, Divider } from "./ui";
import { PageViewsSlider, DurationInput } from "./sections";
import { SummarySidebar } from "./sidebar/summary-sidebar";
import { AppButton } from "@/components/button";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "../../billing/settings/_components/searchable-select";
import { useCreateCampaign } from "@/hooks/campaign/use-create-campaign";
import { Country } from "country-state-city";
import { cn } from "@/lib/utils";

const ALL_COUNTRIES = Country.getAllCountries()
const COUNTRY_OPTIONS = ALL_COUNTRIES.map(c => ({ value: c.name, label: c.name }))

// ── SelectInput — 
function SelectInput({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        "disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

const DEFAULT_VALUES: CampaignFormData = {
  campaignName: "",
  webUrl: "",
  pageViews: 32000,
  duration: { mode: "fixed", fixedSec: 0, randomFrom: 0, randomTo: 0 },
  country: "",
  trafficSource: "Direct",
  device: "All Desktop",
  creditUsed: 0
};

const creditToBeUsed = 20


export default function CampaignForm() {
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({ defaultValues: DEFAULT_VALUES });

  const watched = watch();

  const saveCampaign = useSectionSave();
  const savePageViews = useSectionSave();
  const saveDuration = useSectionSave();
  const saveTraffic = useSectionSave();
  const saveDevices = useSectionSave();
  const saveGeo = useSectionSave();

  const onSubmit = (data: CampaignFormData) => {
    const newData = { ...data, creditUsed: creditToBeUsed }
    console.log(newData);
    createCampaign(newData);
    reset();
  };


  return (
    <div className="mx-auto flex flex-col lg:flex-row gap-6 items-start w-full">

      {/* Main form card */}
      <div className="flex-1 min-w-0 w-full rounded-2xl border bg-background shadow-sm">
        <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-2">
          <h2 className="text-xl font-bold">Create Campaign</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Configure your traffic campaign settings below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 sm:px-8 pb-6 sm:pb-8 pt-4 space-y-6 sm:space-y-8"
        >
          {/* Campaign Name */}
          <Section
            title="Campaign Name"
            saveStatus={saveCampaign.status}
            tooltip={{ title: "Campaign Name", description: "A unique identifier for this campaign in your dashboard." }}
          >
            <Input
              {...register("campaignName", { required: "Campaign name is required" })}
              onChange={(e) => { register("campaignName").onChange(e); saveCampaign.trigger(); }}
              placeholder="e.g. Summer Sale 2025"
              aria-invalid={!!errors.campaignName}
            />
            {errors.campaignName && (
              <p className="text-xs text-red-500 mt-1">{errors.campaignName.message}</p>
            )}
          </Section>

          <Section
            title="Web URL"
            saveStatus={saveCampaign.status}
            tooltip={{ title: "Web URL", description: "The destination URL where traffic will be sent." }}
          >
            <Input
              {...register("webUrl", {
                required: "Web URL is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                  message: "Enter a valid URL"
                }
              })}
              onChange={(e) => { register("webUrl").onChange(e); saveCampaign.trigger(); }}
              placeholder="https://example.com"
              type="url"
              aria-invalid={!!errors.webUrl}
            />
            {errors.webUrl && (
              <p className="text-xs text-red-500 mt-1">{errors.webUrl.message}</p>
            )}
          </Section>
          <Divider />

          {/* Page Views */}
          <Section
            title="Page Views"
            saveStatus={savePageViews.status}
            tooltip={{ title: "Page Views", description: "Total page views to deliver." }}
          >
            <Controller
              name="pageViews"
              control={control}
              render={({ field }) => (
                <PageViewsSlider
                  value={field.value}
                  onChange={(v) => { field.onChange(v); savePageViews.trigger(); }}
                />
              )}
            />
          </Section>

          <Divider />

          {/* Duration */}
          <Section
            title="Duration"
            saveStatus={saveDuration.status}
            tooltip={{ title: "Duration", description: "Set a fixed interval or a randomised range in seconds." }}
          >
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <DurationInput
                  value={field.value}
                  onChange={(v) => { field.onChange(v); saveDuration.trigger(); }}
                />
              )}
            />
          </Section>

          <Divider />

          {/* Traffic Source */}
          <Section
            title="Traffic Source"
            saveStatus={saveTraffic.status}
            tooltip={{ title: "Traffic Source", description: "Where visitors appear to come from." }}
          >
            <Controller
              name="trafficSource"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  onChange={(e) => { field.onChange(e.target.value); saveTraffic.trigger(); }}
                >
                  <option value="" disabled>Select source…</option>
                  {TRAFFIC_SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </SelectInput>
              )}
            />
          </Section>

          <Divider />

          {/* Device Targeting */}
          <Section
            title="Device Targeting"
            saveStatus={saveDevices.status}
            tooltip={{ title: "Device Targeting", description: "Which device type receives traffic." }}
          >
            <Controller
              name="device"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  onChange={(e) => { field.onChange(e.target.value); saveDevices.trigger(); }}
                >
                  <option value="" disabled>Select device…</option>
                  {DEVICES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </SelectInput>
              )}
            />
          </Section>

          <Divider />

          {/* Geo-targeting */}
          <Section
            title="Geo-targeting"
            saveStatus={saveGeo.status}
            tooltip={{ title: "Geo-targeting", description: "Target a specific country or deliver globally." }}
          >
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  options={COUNTRY_OPTIONS}
                  value={field.value ?? ""}
                  onChange={(val) => { field.onChange(val); saveGeo.trigger(); }}
                  placeholder=" Global (All Countries)"
                />
              )}
            />
          </Section>

          <Divider />

          <AppButton
            title={isPending ? "Launching…" : "Launch Campaign"}
            type="submit"
            isLoading={isPending}
            fullWidth
          />
        </form>
      </div>

      {/* Summary sidebar */}
      <div className="hidden md:block">
        <SummarySidebar
          data={{
            campaignName: watched.campaignName ?? "",
            pageViews: watched.pageViews ?? 0,
            duration: watched.duration ?? DEFAULT_VALUES.duration,
            trafficSource: watched.trafficSource ?? "",
            device: watched.device ?? "",
            country: watched.country ?? "",
            creditUsed: creditToBeUsed
          }}
        />
      </div>

    </div>
  );
}