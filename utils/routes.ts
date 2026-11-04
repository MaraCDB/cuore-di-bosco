export type LanguageCode = "it" | "en" | "de";

const italianRoutes = [
    {
        id: "welcome",
        group: "",
        label: "BENVENUTI",
        path: `/it`,
    },
    {
        id: "booking",
        group: "",
        label: "PRENOTA",
        path: `/it/prenota`,
    },
    {
        id: "explore",
        group: "",
        label: "ESPLORA",
        path: `/it/esplora`,
    },
    {
        id: "rules",
        group: "",
        label: "REGOLAMENTO",
        path: `/it/regolamento`,
    },
    {
        id: "privacy-policy",
        group: "",
        label: "PRIVACY POLICY",
        path: `/it/privacy-policy`,
        hidden: true,
    },
];


const englishRoutes = [
    {
        id: "welcome",
        group: "",
        label: "WELCOME",
        path: `/en`,
    },
    {
        id: "booking",
        group: "",
        label: "BOOK",
        path: `/en/booking`,
    },
    {
        id: "explore",
        group: "",
        label: "EXPLORE",
        path: `/en/explore`,
    },
    {
        id: "rules",
        group: "",
        label: "RULES",
        path: `/en/rules`,
    },
    {
        id: "privacy-policy",
        group: "",
        label: "PRIVACY POLICY",
        path: `/en/privacy-policy`,
        hidden: true,
    },
];


const germanRoutes = [
    {
        id: "welcome",
        group: "",
        label: "WILLKOMMEN",
        path: `/de`,
    },
    {
        id: "booking",
        group: "",
        label: "BUCHEN",
        path: `/de/buchen`,
    },
    {
        id: "explore",
        group: "",
        label: "ENTDECKEN",
        path: `/de/entdecken`,
    },
    {
        id: "rules",
        group: "",
        label: "HAUSORDNUNG",
        path: `/de/hausordnung`,
    },
    {
        id: "privacy-policy",
        group: "",
        label: "DATENSCHUTZ",
        path: `/de/datenschutz`,
        hidden: true,
    },
];


export const routes = (languageCode: LanguageCode) => {
    switch (languageCode) {
        case "en":
            return englishRoutes;
        case "de":
            return germanRoutes;
        case "it":
        default:
            return italianRoutes;

    }
};
