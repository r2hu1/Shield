export const metadata = {
    title: "Authentication",
    description: "login or sign up to continue using Shield.",
}
export default function Layout({ children }) {
    return (
        <section className="absolute h-full w-full flex items-center justify-center">
            {children}
        </section>
    )
}