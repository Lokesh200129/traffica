import { Metadata } from "next";
// import ComingSoon from "../_components/coming-soon";
import ProfilePage from "./_components/profile-page";

export const metadata: Metadata = {
    title: "Profile",
    description: "",
};

const Page = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
                <ProfilePage />
            </div>
        </div>
    )
}
export default Page;