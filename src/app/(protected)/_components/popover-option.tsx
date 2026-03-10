"use client"

import { User, LogOut } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ProfileIcon from "@/components/profile-icon"
import { useLogout } from "@/hooks/auth/use-logout"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { AppButton } from "@/components/button"
import GlobalLoader from "@/components/global-loader"
export default function UserProfilePopover() {
    const { data: user } = useCurrentUser()
    const { mutate: logout, isPending } = useLogout()

    if (isPending) return <GlobalLoader msg="Logging out..." />

    return (
        <div className="hidden md:block">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="outline-none focus:ring-2 focus:ring-accent rounded-full transition-all">
                        <ProfileIcon className="border-2 border-border hover:border-accent" />
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-2 mt-2 " align="end">
                    {/* User Info Section */}
                    <div className="flex items-center gap-3 p-3 mb-2 border-b border-border">
                        <ProfileIcon className="h-10 w-10" />
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold truncate leading-none mb-1">
                                {user?.name || "User Name"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate italic">
                                {user?.email || "user@email.com"}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}

                    {/* <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2 h-9">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </Button>
                    </Link> */}
                    <AppButton
                        title="Profile"
                        href="/profile"
                        icon={User}
                        fullWidth={true}
                        className="bg-background text-accent hover:bg-accent/10 flex items-start"
                    />
                    <div className=" border-t border-border p-1" />

                    {/* Logout Action */}

                    <AppButton
                        title="Logout"
                        onClick={() => logout()}
                        icon={LogOut}
                        fullWidth={true}
                        className="bg-background text-accent hover:bg-accent/10"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}