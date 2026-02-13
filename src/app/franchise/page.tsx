"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, BookOpen, CheckCircle, TrendingUp, Building } from "lucide-react";

export default function Franchise() {
    const [seats, setSeats] = useState(50);
    const [avgTicket, setAvgTicket] = useState(5000);
    const [occupancy, setOccupancy] = useState(60);

    // Simple formula: Seats * Occupancy% * AvgTicket * 26 days
    const dailyRevenue = seats * (occupancy / 100) * avgTicket;
    const monthlyRevenue = dailyRevenue * 26;
    const empireRoyalty = monthlyRevenue * 0.15; // 15% Royalty
    const netRevenue = monthlyRevenue - empireRoyalty;

    return (
        <div className="container py-8 space-y-8">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Devenez Partenaire Empire</h1>
                <p className="text-muted-foreground text-xl">
                    Rejoignez le réseau de divertissement n°1. Ouvrez votre "Empire Sports Bar" et bénéficiez de l'attraction de la Ligue.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg">Déposer un dossier</Button>
                    <Button variant="outline" size="lg">Télécharger la plaquette</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* ROI Calculator */}
                <Card className="border-primary/50 shadow-xl shadow-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-6 w-6 text-primary" />
                            Simulateur de Revenus
                        </CardTitle>
                        <CardDescription>
                            Estimez votre rentabilité mensuelle en fonction de votre capacité.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Nombre de places assises</label>
                                <span className="font-bold">{seats} places</span>
                            </div>
                            <Slider
                                defaultValue={[50]}
                                max={200} step={10}
                                onValueChange={(val) => setSeats(val[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Ticket Moyen (FCFA)</label>
                                <span className="font-bold">{avgTicket.toLocaleString()} FCFA</span>
                            </div>
                            <Slider
                                defaultValue={[5000]}
                                max={20000} step={500}
                                onValueChange={(val) => setAvgTicket(val[0])}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Taux de remplissage</label>
                                <span className="font-bold">{occupancy}%</span>
                            </div>
                            <Slider
                                defaultValue={[60]}
                                max={100} step={5}
                                onValueChange={(val) => setOccupancy(val[0])}
                            />
                        </div>

                        <div className="pt-6 border-t space-y-2">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Chiffre d'Affaires Mensuel</span>
                                <span>{monthlyRevenue.toLocaleString()} FCFA</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Redevance Empire (15%)</span>
                                <span>- {empireRoyalty.toLocaleString()} FCFA</span>
                            </div>
                            <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg mt-2">
                                <span className="font-bold text-lg">Revenu Net Estimé</span>
                                <span className="font-black text-2xl text-primary">{netRevenue.toLocaleString()} FCFA</span>
                            </div>
                            <p className="text-xs text-muted-foreground text-center pt-2">
                                *Estimation non contractuelle basée sur 26 jours d'ouverture.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* The Value Proposition */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                La "Bible du Franchisé"
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                L'accès à notre savoir-faire codifié (Lot 13). Tout est inclus :
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Recettes exclusives "Empire Kitchen"</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Plans architecturaux standards</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Contrats fournisseurs négociés</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Accès API Super-App</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">
                                Accéder à l'espace Documentaire (Restreint)
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-muted/50 border-none">
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <UsersIcon className="h-8 w-8 mb-2 opacity-50" />
                                <span className="font-bold text-2xl">100k+</span>
                                <span className="text-xs text-muted-foreground">Membres Actifs</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/50 border-none">
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <Building className="h-8 w-8 mb-2 opacity-50" />
                                <span className="font-bold text-2xl">13</span>
                                <span className="text-xs text-muted-foreground">Franchises Ouvertes</span>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
