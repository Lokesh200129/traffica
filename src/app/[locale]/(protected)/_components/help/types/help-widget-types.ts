export type HelpTabs = "home" | "messages" | "help";

export interface FAQItem {
    id:       string;
    question: string;
    answer:   string;
}

export interface HelpCollection {
    id:       string;
    title:    string;
    articles: FAQItem[];
}

export const FAQ_COLLECTIONS: HelpCollection[] = [
    {
        id:    "traffica",
        title: "Traffica Help",
        articles: [
            { id: "q1", question: "How do I create my first campaign?",             answer: "Go to Dashboard → Create Campaign. Fill in your campaign name, select page views, set duration, choose traffic source and geo-targeting. Hit Launch Campaign and you're live within minutes." },
            { id: "q2", question: "What is the difference between Page Views and Users?", answer: "Page Views is the total number of pages loaded. Users is the estimated number of unique visitors — we calculate this as Page Views ÷ 3, since an average session views ~3 pages." },
            { id: "q3", question: "How does Geo-targeting work?",                   answer: "Geo-targeting lets you send traffic from a specific country or globally. Select a country from the dropdown to target that region, or leave it as 'Global' to distribute traffic worldwide." },
            { id: "q4", question: "Can I pause or stop a campaign?",               answer: "Yes. Go to your Campaign dashboard, find the campaign and click the status badge to toggle between Active and Paused. You can also stop it completely from the campaign detail page." },
            { id: "q5", question: "How do I add or change my payment method?",     answer: "Go to Billing → Saved Cards. Click 'Add Card' to add a new card, or click 'Set Default' on an existing card to make it your primary payment method." },
            { id: "q6", question: "What traffic sources are available?",            answer: "We support Direct, Google (Organic), Google Ads, Facebook, Instagram, LinkedIn, Twitter/X, Email, Push Notifications, and more. Select from the dropdown when creating a campaign." },
        ],
    },
    {
        id:    "analytics",
        title: "Analytics & Reporting",
        articles: [
            { id: "q7", question: "Where can I see my campaign analytics?",  answer: "Click on any campaign in your dashboard to open the detail view. You'll see real-time stats including page views delivered, bounce rate, session duration, and geo breakdown." },
            { id: "q8", question: "How do I filter campaigns by date?",      answer: "In the Campaign table, use the date filter dropdown on the top right. You can pick presets like Yesterday, Last Week, Last Month, or set a custom date range." },
        ],
    },
];

export const QUICK_QUESTIONS = [
    "How do I create a campaign?",
    "What are Page Views vs Users?",
    "How does billing work?",
];
