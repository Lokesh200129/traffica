import { Metadata } from "next";
// import ComingSoon from "../_components/coming-soon";
import ProfilePage from "./_components/profile-page";

export const metadata: Metadata = {
    title: "Profile",
    description: "",
};

const Page = () => <ProfilePage />
export default Page;