"use client";

import { useForm, Controller } from "react-hook-form";
import type { CampaignFormData } from "../_types";
import { uid } from "../_lib/utils";
import { TRAFFIC_SOURCES, DEVICES, ALL_COUNTRIES } from "../_lib/constants";
import { useSectionSave } from "../_hooks/useSectionSave";
import { Section, Divider } from "./ui";
import { PageViewsSlider, DurationInput } from "./sections";
import { SummarySidebar } from "./sidebar/summary-sidebar";
import { AppButton } from "@/components/button";
// import { useCreateCampaign } from "@/hooks/useCreateCampaign";

type FormValues = CampaignFormData;

const DEFAULT_VALUES: FormValues = {
  campaignName: "",
  pageViews: 32000,
  duration: { mode: "fixed", fixedSec: 0, randomFrom: 0, randomTo: 0 },
  geoType: "Global",
  country: "",
  trafficSources: [{ id: uid(), value: "Direct", percentage: 100, keyword: "" }],
  devices: [{ id: uid(), value: "All Desktop", percentage: 100 }],
};

const selectCls = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";
const inputCls = "w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-red-400 transition-colors";

export default function CampaignForm() {
  // const { mutate, isPending } = useCreateCampaign();
  const isPending = false;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: DEFAULT_VALUES });

  const watched = watch();

  const saveCampaign = useSectionSave();
  const savePageViews = useSectionSave();
  const saveDuration = useSectionSave();
  const saveTraffic = useSectionSave();
  const saveDevices = useSectionSave();
  const saveGeo = useSectionSave();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // mutate(data)
  };

  return (
    <div className="mx-auto flex gap-6 items-start">

      {/* ── Main form card ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 rounded-2xl border bg-background shadow-sm">
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-xl font-bold">Create Campaign</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Configure your traffic campaign settings below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 pt-4 space-y-8">

          {/* ── Campaign Name ─────────────────────────────────── */}
          <Section
            title="Campaign Name"
            saveStatus={saveCampaign.status}
            tooltip={{ title: "Campaign Name", description: "A unique identifier for this campaign in your dashboard." }}
          >
            <input
              {...register("campaignName", { required: "Campaign name is required" })}
              onChange={(e) => { register("campaignName").onChange(e); saveCampaign.trigger(); }}
              placeholder="e.g. Summer Sale 2025"
              aria-invalid={!!errors.campaignName}
              className={inputCls}
            />
            {errors.campaignName && (
              <p className="text-xs text-red-500 mt-1">{errors.campaignName.message}</p>
            )}
          </Section>

          <Divider />

          {/* ── Page Views ────────────────────────────────────── */}
          <Section
            title="Page Views"
            saveStatus={savePageViews.status}
            tooltip={{ title: "Page Views", description: "Total page views to deliver. Est. users ≈ views ÷ 3." }}
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

          {/* ── Duration ──────────────────────────────────────── */}
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

          {/* ── Traffic Source — single dropdown, no RangeGroup ── */}
          <Section
            title="Traffic Source"
            saveStatus={saveTraffic.status}
            tooltip={{ title: "Traffic Source", description: "Where visitors appear to come from." }}
          >
            <Controller
              name="trafficSources"
              control={control}
              render={({ field }) => (
                <select
                  value={field.value[0]?.value ?? ""}
                  onChange={(e) => {
                    field.onChange([{ id: uid(), value: e.target.value, percentage: 100, keyword: "" }]);
                    saveTraffic.trigger();
                  }}
                  className={selectCls}
                >
                  <option value="" disabled>Select source…</option>
                  {TRAFFIC_SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}
            />
          </Section>

          <Divider />

          {/* ── Device Targeting ──────────────────────────────── */}
          <Section
            title="Device Targeting"
            saveStatus={saveDevices.status}
            tooltip={{ title: "Device Targeting", description: "Which device type receives traffic." }}
          >
            <Controller
              name="devices"
              control={control}
              render={({ field }) => (
                <select
                  value={field.value[0]?.value ?? ""}
                  onChange={(e) => {
                    field.onChange([{ id: "device_1", value: e.target.value, percentage: 100 }]);
                    saveDevices.trigger();
                  }}
                  className={selectCls}
                >
                  <option value="" disabled>Select device…</option>
                  {DEVICES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              )}
            />
          </Section>

          <Divider />

          {/* ── Geo-targeting ─────────────────────────────────── */}
          <Section
            title="Geo-targeting"
            saveStatus={saveGeo.status}
            tooltip={{ title: "Geo-targeting", description: "Target a specific country or deliver globally." }}
          >
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    saveGeo.trigger();
                  }}
                  className={selectCls}
                >
                  <option value="">Global (All Countries)</option>
                  {ALL_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            />
          </Section>

          <Divider />

          {/* ── Submit ────────────────────────────────────────── */}
          <AppButton
            title={isPending ? "Launching…" : "Launch Campaign"}
            type="submit"
            isLoading={isPending}
            fullWidth
          />

        </form>
      </div>

      {/* ── Summary sidebar ───────────────────────────────────────── */}
      <SummarySidebar
        data={{
          campaignName: watched.campaignName ?? "",
          pageViews: watched.pageViews ?? 0,
          duration: watched.duration ?? DEFAULT_VALUES.duration,
          trafficSources: watched.trafficSources ?? [],
          devices: watched.devices ?? [],
          geoType: watched.country?.length ? "Countries" : "Global",
          country: watched.country ?? "",
        }}
      />
    </div>
  );
}