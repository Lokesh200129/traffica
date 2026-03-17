import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewsGraph } from "./page-view-graph";
import { DeviceChart } from "./device-pie-chart";
import SourcesList from "./source-bar-chart";
import { LocationsMap } from "./map";

export default function Main() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* 1. Page Views (Full Width) */}
            <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7 px-6 pt-6">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                        Page Views
                    </CardTitle>
                    <Select defaultValue="clicks">
                        <SelectTrigger className="w-[110px] h-9 text-[11px] font-bold uppercase bg-background border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[100]">
                            <SelectItem value="clicks">Clicks</SelectItem>
                            <SelectItem value="views">Views</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="h-[350px] w-full">
                        <ViewsGraph />
                    </div>
                </CardContent>
            </Card>

            {/* 2 & 3. Devices and Sources Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Devices (Span 4 columns out of 12 = 1/3) */}
                <Card className="md:col-span-4 rounded-2xl shadow-sm border-border flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-7 px-6 pt-6">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                            Devices
                        </CardTitle>
                        <Select defaultValue="clicks">
                            <SelectTrigger className="w-[100px] h-8 text-[10px] font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clicks">Clicks</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="flex-1 px-6 pb-6">
                        <DeviceChart />
                    </CardContent>
                </Card>

                {/* Sources (Span 8 columns out of 12 = 2/3) */}
                <Card className="md:col-span-8 rounded-2xl shadow-sm border-border flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-7 px-6 pt-6">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                            Sources
                        </CardTitle>
                        <Select defaultValue="clicks">
                            <SelectTrigger className="w-[100px] h-8 text-[10px] font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clicks">Clicks</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="flex-1 px-6 pb-6">
                        <SourcesList />
                    </CardContent>
                </Card>
            </div>

            {/* 4. Locations (Full Width) */}
            <Card className="rounded-2xl shadow-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-7 px-6 pt-6">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                        Locations
                    </CardTitle>
                    <Select defaultValue="clicks">
                        <SelectTrigger className="w-[110px] h-9 text-[11px] font-bold uppercase border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="clicks">Clicks</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="h-[450px] w-full rounded-xl overflow-hidden">
                        <LocationsMap />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}