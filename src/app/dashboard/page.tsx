"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, CreditCard, Ticket, Trophy } from "lucide-react";

export default function Dashboard() {
    // Fake user data
    const user = {
        name: "Jean-Michel Kotto",
        id: "EMP-2076-8842",
        points: 1250,
        tier: "Gold Member",
    };

    const qrData = JSON.stringify({
        id: user.id,
        type: "citoyen_empire",
        access_level: "gold",
    });

    return (
        <div className="container py-8 md:py-12">
            <div className="flex flex-col gap-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Bonjour, {user.name}</h1>
                        <p className="text-muted-foreground">Membre depuis Février 2026 • Statut: <span className="text-primary font-bold">{user.tier}</span></p>
                    </div>
                    <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg border border-primary/20">
                        <Trophy className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Solde Empire Points</p>
                            <p className="text-2xl font-bold">{user.points} pts</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* The One-ID Card */}
                    <Card className="col-span-1 border-primary shadow-lg bg-gradient-to-br from-background to-muted relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <QrCode className="h-64 w-64" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Carte Citoyen
                            </CardTitle>
                            <CardDescription>Votre passeport universel.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-6 space-y-4">
                            <div className="bg-white p-4 rounded-xl shadow-inner">
                                <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
                            </div>
                            <p className="text-xs font-mono text-muted-foreground tracking-widest">{user.id}</p>
                            <p className="text-center text-sm text-balance">
                                Scannez ce code pour entrer au stade, payer au bar, ou valider votre présence.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick Actions / Recent Activity */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Prochain Événement</CardTitle>
                                <CardDescription>Ne manquez pas le choc de la semaine.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border">
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg">AKWA UNITED</h3>
                                        <p className="text-sm text-muted-foreground">Quartier Akwa</p>
                                    </div>
                                    <div className="text-center px-4">
                                        <span className="text-xl font-black text-primary">VS</span>
                                        <p className="text-xs text-muted-foreground mt-1">Samedi 20h00<br />Empire Arena #1</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg">BONAPRISO STARS</h3>
                                        <p className="text-sm text-muted-foreground">Quartier Bonapriso</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <Button className="w-full">
                                        <Ticket className="mr-2 h-4 w-4" /> Réserver ma place (500 pts)
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Voir les stats
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Vos Offres Exclusives</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="font-medium">-20% sur le Maillot 2076</span>
                                        <span className="text-xs text-muted-foreground">Valable à la boutique du stade.</span>
                                    </div>
                                    <Button size="sm" variant="ghost">Utiliser</Button>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Boisson offerte au Sports Bar</span>
                                        <span className="text-xs text-muted-foreground">Pour tout achat d'un menu Burger.</span>
                                    </div>
                                    <Button size="sm" variant="ghost">Utiliser</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
