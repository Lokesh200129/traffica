import { Metadata } from "next";
// import NotificationItem from "./_components/notification_tab";
import NotificationsPage from './_components/notification_page'
export const metadata: Metadata = {
    title: "Notification",
    description: "",
};

// const NOTIFICATIONS = [
//     {
//         id: "1",
//         title: "Campaign Approved",
//         description: "Your 'Summer Sale' campaign has been reviewed and is now live.",
//         timestamp: new Date(),
//         isRead: false,
//         type: "campaign" as const,
//     },
//     {
//         id: "2",
//         title: "Credits Low",
//         description: "Your balance is below $10. Please recharge to keep your campaigns running.",
//         timestamp: "2 hours ago",
//         isRead: true,
//         type: "billing" as const,
//     },
//     {
//         id: "3",
//         title: "Referral Reward",
//         description: "You earned 5,000 credits from your referral. Keep sharing!",
//         timestamp: "1 day ago",
//         isRead: true,
//         type: "reward" as const,
//     },
//     {
//         id: "4",
//         title: "Payment Successful",
//         description: "Your payment of $50 was successful. Credits have been added to your account.",
//         timestamp: "2 days ago",
//         isRead: true,
//         type: "billing" as const,
//     },
// ]

const Page = () => {
    return (
// <div className="w-full max-w-2xl mx-auto">

//     {/* Header */}
//     <div className="mb-6">
//         <h2 className="text-2xl font-bold">Notifications</h2>
//     </div>

//     {/* List */}
//     <div className="rounded-2xl border border-border bg-card overflow-hidden">
//         {NOTIFICATIONS.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
//                 <span className="text-4xl">🔔</span>
//                 <p className="text-sm">No notifications yet</p>
//             </div>
//         ) : (
//             <div className="divide-y divide-border">
//                 {NOTIFICATIONS.map(n => (
//                     <NotificationItem
//                         key={n.id}
//                         title={n.title}
//                         description={n.description}
//                         timestamp={n.timestamp}
//                         isRead={n.isRead}
//                         type={n.type}
//                     />
//                 ))}
//             </div>
//         )}
//     </div>

        // </div>
        <NotificationsPage />
    )
}
export default Page;