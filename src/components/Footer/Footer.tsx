const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="font-roboto bg-white">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-slate-500">
                    &copy; {currentYear} Igor Azevedo. Todos os direitos
                    reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
