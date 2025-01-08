export const cookie_options = {
    path: "/",
    sameSite: "strict",
};

// Format page title
export function formatTitle(pageTitle: string) {
    const fixedTitle = "What!";
    return `${pageTitle} | ${fixedTitle}`;
}
