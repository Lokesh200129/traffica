import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ViewsGraph } from "./page-view-graph";
import { DeviceChart } from "./device-pie-chart";
import SourcesList from "./source-bar-chart";
import { LocationsMap } from "./map";

export default function Main() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* 1. Page Views (Full Width) */}
            <Card className="rounded-2xl shadow-sm border-border">
                <CardHeader className="flex flex-row items-center space-y-0 pb-7 px-6 pt-6">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                        Page Views
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="h-[350px] w-full z-0 relative">
                        <ViewsGraph />
                    </div>
                </CardContent>
            </Card>

            {/* 2 & 3. Devices and Sources Row */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Devices  */}
                <Card className="w-1/2 rounded-2xl shadow-sm border-border flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                            Devices
                        </CardTitle>
                        {/* <Select defaultValue="clicks">
                            <SelectTrigger className="w-[100px] h-8 text-[10px] font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clicks">Clicks</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </CardHeader>
                    <CardContent className="flex-1 px-6 pb-6">
                        <DeviceChart />
                    </CardContent>
                </Card>

                {/* Sources */}
                <Card className="w-1/2 rounded-2xl shadow-sm border-border flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                            Sources
                        </CardTitle>
                        {/* <Select defaultValue="clicks">
                            <SelectTrigger className="w-[100px] h-8 text-[10px] font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clicks">Clicks</SelectItem>
                            </SelectContent>
                        </Select> */}
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
                    {/* <Select defaultValue="clicks">
                        <SelectTrigger className="w-[110px] h-9 text-[11px] font-bold uppercase border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="clicks">Clicks</SelectItem>
                        </SelectContent>
                    </Select> */}
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