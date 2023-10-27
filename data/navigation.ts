interface NavigationType {
    id: number;
    name: string;
    path: string;
    dropdown?: {
        id: number;
        name: string;
        path?: string | undefined;
        dropdown?: {
            id: number;
            name: string;
            path: string;
        }[];
    }[];
}

export const navigation: NavigationType[] = [
    {
        id: 1,
        name: "Home",
        path: "/"
    },
    {
        id: 2,
        name: "Market",
        path: "/explore"
    },
    {
        id: 3,
        name: "Upload Track",
        path: "/create-item"
    },
    {
        id: 4,
        name: "Artists & Labels",
        path: "/artist-and-label"
    },
    {
        id: 5,
        name: "Contact Us",
        path: "/contact"
    },

];
