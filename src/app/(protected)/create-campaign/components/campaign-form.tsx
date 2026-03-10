"use client";

import { useForm, Controller } from "react-hook-form";
import type { GeoType, RangeItem, UrlConfig, DurationValue, CampaignFormData } from "../types";
import { uid } from "../lib/utils";
import { TRAFFIC_SOURCES, DEVICES } from "../lib/constants";
import { useSectionSave } from "../hooks/useSectionSave";
import { Section, Divider } from "../components/ui";
import {
  PageViewsSlider,
  RangeGroup,
  DurationInput,
  UrlSection,
  CountrySelector,
} from "../components/sections";
import { SummarySidebar } from "../components/sidebar/SummarySidebar";
// import { useCreateCampaign } from "@/hooks/useCreateCampaign"; // <-- your mutation hook

type FormValues = CampaignFormData;

const DEFAULT_VALUES: FormValues = {
  campaignName: "",
  pageViews: 32000,
  duration: { mode: "fixed", fixedSec: 0, randomFrom: 0, randomTo: 0 },
  urlConfig: { entryUrls: "", entryCrawl: false, innerUrls: "", innerCrawl: false },
  geoType: "Global",
  countries: [],
  trafficSources: [{ id: uid(), value: "Direct", percentage: 100, keyword: "" }],
  devices: [{ id: uid(), value: "All Desktop", percentage: 100 }],
};

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
  const saveUrls = useSectionSave();
  const savePageViews = useSectionSave();
  const saveDuration = useSectionSave();
  const saveTraffic = useSectionSave();
  const saveDevices = useSectionSave();
  const saveGeo = useSectionSave();

  const onSubmit = (data: FormValues) => {
    // mutate(data);
    console.log(data)
  };

  return (
    <div className="mx-auto flex gap-6 items-start">

      <div className="flex-1 min-w-0 rounded-2xl border bg-background shadow-sm">
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-xl font-bold">Create Campaign</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Configure your traffic campaign settings below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 pt-4 space-y-8">

          {/* Campaign Name */}
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
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-background focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-400"
            />
            {errors.campaignName && (
              <p className="text-xs text-red-500 mt-1">{errors.campaignName.message}</p>
            )}
          </Section>

          <Divider />

          {/* URLs */}
          <Section
            title="URLs"
            saveStatus={saveUrls.status}
            tooltip={{ title: "URL Targeting", description: "Entry URLs are landing pages. Inner URLs are pages deeper in your site." }}
          >
            <Controller
              name="urlConfig"
              control={control}
              render={({ field }) => (
                <UrlSection
                  value={field.value}
                  onChange={(v) => { field.onChange(v); saveUrls.trigger(); }}
                />
              )}
            />
          </Section>

          <Divider />

          {/* Page Views */}
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
            tooltip={{ title: "Traffic Source", description: "Where visitors appear to come from. Add keyword for organic. Must total 100%." }}
          >
            <Controller
              name="trafficSources"
              control={control}
              render={({ field }) => (
                <RangeGroup
                  options={TRAFFIC_SOURCES}
                  items={field.value}
                  onChange={(v) => { field.onChange(v); saveTraffic.trigger(); }}
                  addLabel="Add Traffic Source"
                  placeholder="Select source…"
                  showKeyword
                />
              )}
            />
          </Section>

          <Divider />

          {/* Device Targeting */}
          <Section
            title="Device Targeting"
            saveStatus={saveDevices.status}
            tooltip={{ title: "Device Targeting", description: "Which device types receive traffic. Must total 100%." }}
          >
            <Controller
              name="devices"
              control={control}
              render={({ field }) => (
                <RangeGroup
                  options={DEVICES}
                  items={field.value}
                  onChange={(v) => { field.onChange(v); saveDevices.trigger(); }}
                  addLabel="Add Device"
                  placeholder="Select device…"
                />
              )}
            />
          </Section>

          <Divider />

          {/* Geo-targeting */}
          <Section
            title="Geo-targeting"
            saveStatus={saveGeo.status}
            tooltip={{ title: "Geo-targeting", description: "Target specific countries or deliver globally." }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Geo-Targeting Type
                </label>
                <Controller
                  name="geoType"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={(e) => { field.onChange(e.target.value as GeoType); saveGeo.trigger(); }}
                      className="w-full rounded-xl border border-gray-200 bg-background px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Global">Global</option>
                      <option value="Countries">Countries</option>
                    </select>
                  )}
                />
              </div>

              {watch("geoType") === "Countries" && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Select Countries
                  </label>
                  <Controller
                    name="countries"
                    control={control}
                    render={({ field }) => (
                      <CountrySelector
                        selected={field.value}
                        onChange={(v) => { field.onChange(v); saveGeo.trigger(); }}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </Section>

          <Divider />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-accent/80 py-3.5 text-sm font-semibold shadow-sm transition-all hover:bg-accent hover:shadow-md active:scale-[0.98] text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Launching…" : "Launch Campaign"}
          </button>
        </form>
      </div>

      <SummarySidebar
        data={{
          campaignName: watched.campaignName ?? "",
          pageViews: watched.pageViews ?? 0,
          duration: watched.duration ?? DEFAULT_VALUES.duration,
          urlConfig: watched.urlConfig ?? DEFAULT_VALUES.urlConfig,
          trafficSources: watched.trafficSources ?? [],
          devices: watched.devices ?? [],
          geoType: watched.geoType ?? "Global",
          countries: watched.countries ?? [],
        }}
      />
    </div>
  );
}