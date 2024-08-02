export default function Layout({ children }) {
    return (
        <section className="absolute h-full w-full flex items-center justify-center">
            {children}
        </section>
    )
}