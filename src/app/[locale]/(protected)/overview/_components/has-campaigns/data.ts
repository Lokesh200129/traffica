import { Instagram, Youtube, Facebook, Linkedin, Globe } from "lucide-react";

export const ANALYTICS_DATA = {
  views: [
    { date: "10 Jan 25", views: 10000 },
    { date: "21 Jan 25", views: 45000 },
    { date: "02 Feb 25", views: 25000 },
    { date: "13 Feb 25", views: 60000 },
    { date: "24 Feb 25", views: 35000 },
    { date: "12 Mar 25", views: 78000 },
  ],
  devices: [
    { name: "Mobile", value: 45, color: "#3b82f6" },
    { name: "Desktop", value: 35, color: "#d97757" }, // Anthropic Orange
    { name: "Tablet", value: 15, color: "#ef4444" },
    { name: "Other", value: 5, color: "#10b981" },
  ],
  sources: [
    { name: "Instagram", views: 50000, icon: Instagram },
    { name: "YouTube", views: 40000, icon: Youtube },
    { name: "Facebook", views: 35000, icon: Facebook },
    { name: "LinkedIn", views: 25000, icon: Linkedin },
    { name: "Direct", views: 15000, icon: Globe },
  ],
 locations: [
  // Asia
  { id: "IND", name: "India", views: "850k" },
  { id: "CHN", name: "China", views: "620k" },
  { id: "JPN", name: "Japan", views: "310k" },
  { id: "IDN", name: "Indonesia", views: "190k" },
  { id: "PAK", name: "Pakistan", views: "140k" },
  { id: "BGD", name: "Bangladesh", views: "110k" },
  { id: "VNM", name: "Vietnam", views: "95k" },
  { id: "TUR", name: "Turkey", views: "180k" },
  { id: "THA", name: "Thailand", views: "85k" },
  { id: "KOR", name: "South Korea", views: "210k" },
  { id: "ARE", name: "United Arab Emirates", views: "130k" },
  { id: "SAU", name: "Saudi Arabia", views: "115k" },

  // North & South America
  { id: "USA", name: "United States", views: "420k" },
  { id: "CAN", name: "Canada", views: "120k" },
  { id: "MEX", name: "Mexico", views: "155k" },
  { id: "BRA", name: "Brazil", views: "150k" },
  { id: "ARG", name: "Argentina", views: "88k" },
  { id: "COL", name: "Colombia", views: "72k" },
  { id: "CHL", name: "Chile", views: "55k" },

  // Europe
  { id: "GBR", name: "United Kingdom", views: "280k" },
  { id: "DEU", name: "Germany", views: "295k" },
  { id: "FRA", name: "France", views: "240k" },
  { id: "ITA", name: "Italy", views: "190k" },
  { id: "ESP", name: "Spain", views: "175k" },
  { id: "RUS", name: "Russia", views: "210k" },
  { id: "NLD", name: "Netherlands", views: "90k" },
  { id: "CHE", name: "Switzerland", views: "75k" },
  { id: "SWE", name: "Sweden", views: "65k" },
  { id: "POL", name: "Poland", views: "82k" },

  // Africa
  { id: "NGA", name: "Nigeria", views: "135k" },
  { id: "EGY", name: "Egypt", views: "110k" },
  { id: "ZAF", name: "South Africa", views: "125k" },
  { id: "KEN", name: "Kenya", views: "65k" },
  { id: "MAR", name: "Morocco", views: "58k" },
  { id: "ETH", name: "Ethiopia", views: "45k" },

  // Oceania
  { id: "AUS", name: "Australia", views: "185k" },
  { id: "NZL", name: "New Zealand", views: "45k" },
  
  // Others
  { id: "UKR", name: "Ukraine", views: "52k" },
  { id: "PHL", name: "Philippines", views: "105k" },
  { id: "MYS", name: "Malaysia", views: "92k" },
  { id: "SGP", name: "Singapore", views: "115k" },
  { id: "IRN", name: "Iran", views: "70k" }
]
};