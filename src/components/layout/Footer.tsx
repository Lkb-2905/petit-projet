export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-2">EMPIRE 2076</h3>
                        <p className="text-sm text-muted-foreground">
                            L'écosystème sport et divertissement de référence.
                            Omniprésence. Excellence. Héritage.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Liens Rapides</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li><a href="/watch" className="hover:text-primary">Empire TV</a></li>
                            <li><a href="/league" className="hover:text-primary">Empire League</a></li>
                            <li><a href="/franchise" className="hover:text-primary">Devenir Franchisé</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Légal</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">CGU / CGV</a></li>
                            <li><a href="#" className="hover:text-primary">Politique de Confidentialité</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Empire Cam 2076. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
