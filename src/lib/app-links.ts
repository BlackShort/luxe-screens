import { WhatsappIcon, InstagramIcon, YoutubeIcon, TwitterIcon, FacebookIcon } from "@/assets"

export const navigationLinks = [
    { label: "Locations", href: "#locations" },
    { label: "Occasions", href: "#occasions" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
]

export const socialLinks = [
    {
        icon: FacebookIcon,
        href: "",
        label: "Facebook",
        color: "hover:bg-blue-600"
    },
    {
        icon: InstagramIcon,
        href: "",
        label: "Instagram",
        color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
    },
    {
        icon: TwitterIcon,
        href: "",
        label: "Twitter",
        color: "hover:bg-sky-500"
    },
    {
        icon: YoutubeIcon,
        href: "",
        label: "YouTube",
        color: "hover:bg-red-600"
    },
    {
        icon: WhatsappIcon,
        href: "",
        label: "Whatsapp",
        color: "hover:bg-green-500"
    },
]

export const footerSections = [
    {
        title: "Private Theaters",
        links: [
            { label: "Our Theaters", href: "/theaters" },
            { label: "Private Screenings", href: "/private-screenings" },
            { label: "Couple Screening", href: "/couple-screening" },
            { label: "Family Screening", href: "/family-screening" },
        ],
    },
    {
        title: "Experiences",
        links: [
            { label: "Birthday Celebrations", href: "/experiences/birthday" },
            { label: "Anniversary", href: "/experiences/anniversary" },
            { label: "Date Night", href: "/experiences/date-night" },
            { label: "Corporate Events", href: "/experiences/corporate" },
        ],
    },
    {
        title: "Explore",
        links: [
            { label: "How It Works", href: "/how-it-works" },
            { label: "Gallery", href: "/gallery" },
            { label: "Gift Cards", href: "/gift-cards" },
            { label: "Offers", href: "/offers" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Contact Us", href: "/contact" },
            { label: "FAQs", href: "/faqs" },
            { label: "Booking Policy", href: "/booking-policy" },
            { label: "Cancellation Policy", href: "/cancellation-policy" },
        ],
    },
];

export const bottomLinks = [
    { label: "Privacy Policy", href: "/site/privacy-policy" },
    { label: "Terms of Service", href: "/site/terms" },
    { label: "Cookie Policy", href: "/site/privacy-policy" },
];