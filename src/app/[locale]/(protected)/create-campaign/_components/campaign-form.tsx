"use client";

import { useForm, Controller } from "react-hook-form";
import type { TCampaignFormData } from "@/types/campaign";
import { DEVICES } from "../_lib/constants";
import { useSectionSave } from "../_hooks/useSectionSave";
import { Section } from "./ui";
import { SummarySidebar } from "./sidebar/summary-sidebar";
import { AppButton } from "@/components/button";
import { Input } from "@/components/ui/input";
import { useCreateCampaign } from "@/hooks/campaign/use-create-campaign";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { toast } from "sonner"
import StyledDropdown from "../_components/dropdown";
import { PAGE_VIEW_OPTIONS, ALL_COUNTRIES, TRAFFIC_SOURCES } from "../_lib/constants";
import { CampaignSuccessDialog } from "./ui/sucess-dialog";
import { useState } from "react";


// ── Default values ────────────────────────────────────────────────────────────
const DEFAULT_VALUES: TCampaignFormData = {
  campaignName: "",
  webUrl: "",
  pageViews: 10000,
  country: "",
  trafficSource: "Direct",
  device: "All Desktop",
  creditUsed: 0,
};


// ── Main form 
export default function CampaignForm() {
  const { mutate: createCampaign, isPending } = useCreateCampaign();
  const { data: user } = useCurrentUser();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TCampaignFormData>({ defaultValues: DEFAULT_VALUES });

  const watched = watch();

  const saveCampaign = useSectionSave();
  const saveTraffic = useSectionSave();
  const saveDevices = useSectionSave();
  const saveGeo = useSectionSave();
  const savePageViews = useSectionSave();
  const creditToBeUsed = watched.pageViews

  const onSubmit = (data: TCampaignFormData) => {
    const newData = { ...data, creditUsed: creditToBeUsed };
    if (user!.creditBalance!.availableCredits! < newData.creditUsed) {
      toast.error("You are out of credits!");
      return;
    }
    createCampaign(newData);
    setShowSuccess(true);
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
            tooltip={{ title: "Campaign Name", description: "A unique identifier for this campaign." }}
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

          {/* web url */}
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
                  message: "Enter a valid URL",
                },
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
                <StyledDropdown
                  options={PAGE_VIEW_OPTIONS}
                  value={field.value}
                  onChange={(val) => { field.onChange(val); savePageViews.trigger(); }}
                  placeholder="Select page views…"
                />
              )}
            />
          </Section>


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
                <StyledDropdown
                  options={TRAFFIC_SOURCES.map(s => ({ label: s, value: s }))}
                  value={field.value}
                  onChange={(val) => { field.onChange(val); saveTraffic.trigger(); }}
                  placeholder="Select source…"
                />
              )}
            />
          </Section>


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
                <StyledDropdown
                  options={DEVICES.map(d => ({ label: d, value: d }))}
                  value={field.value}
                  onChange={(val) => { field.onChange(val); saveDevices.trigger(); }}
                  placeholder="Select device…"
                />
              )}
            />
          </Section>

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
                <StyledDropdown
                  options={ALL_COUNTRIES.map(c => ({ label: c, value: c }))}
                  value={field.value ?? ""}
                  onChange={(val) => { field.onChange(val); saveGeo.trigger(); }}
                  placeholder="Global (All Countries)"
                />
              )}
            />
          </Section>


          <AppButton
            title={isPending ? "Launching…" : "Launch Campaign"}
            type="submit"
            isLoading={isPending}
            fullWidth
          />
        </form>
      </div>

      {/* Summary sidebar */}
      <div className="hidden md:block  sticky top-6 self-start">
        <SummarySidebar
          data={{
            campaignName: watched.campaignName ?? "",
            pageViews: watched.pageViews ?? 0,
            trafficSource: watched.trafficSource ?? "",
            device: watched.device ?? "",
            country: watched.country ?? "",
            creditUsed: creditToBeUsed,
          }}
        />
      </div>
      <CampaignSuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}