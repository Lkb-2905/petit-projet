"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Plus, Trash2, Trophy } from "lucide-react";

// Mock Data Types
type Team = {
    id: string;
    name: string;
    points: number;
    played: number;
    wins: number;
    draws: number;
    losses: number;
};

export default function LeagueAdmin() {
    const [teams, setTeams] = useState<Team[]>([
        { id: "1", name: "Akwa United", points: 36, played: 14, wins: 11, draws: 3, losses: 0 },
        { id: "2", name: "Bonapriso Stars", points: 34, played: 14, wins: 10, draws: 4, losses: 0 },
        { id: "3", name: "Deido Boyz", points: 28, played: 14, wins: 9, draws: 1, losses: 4 },
        { id: "4", name: "New-Bell Warriors", points: 22, played: 14, wins: 6, draws: 4, losses: 4 },
    ]);

    const [matchInput, setMatchInput] = useState({
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: "",
    });

    const handleUpdateScore = () => {
        // Simulation of score update logic
        alert(`Score enregistré: ${matchInput.homeTeam} ${matchInput.homeScore} - ${matchInput.awayScore} ${matchInput.awayTeam}\nLe classement serait mis à jour automatiquement.`);
    };

    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Administration Ligue</h1>
                    <p className="text-muted-foreground">Lot 12: Gestion des compétitions et résultats.</p>
                </div>
                <Button variant="outline">Retour au Dashboard</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Match Result Input */}
                <Card>
                    <CardHeader>
                        <CardTitle>Saisie des Résultats</CardTitle>
                        <CardDescription>Mise à jour en temps réel de l&apos;Empire League.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Équipe Domicile</label>
                                <Input
                                    placeholder="Ex: Akwa United"
                                    value={matchInput.homeTeam}
                                    onChange={(e) => setMatchInput({ ...matchInput, homeTeam: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Équipe Extérieur</label>
                                <Input
                                    placeholder="Ex: Bonapriso Stars"
                                    value={matchInput.awayTeam}
                                    onChange={(e) => setMatchInput({ ...matchInput, awayTeam: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Score Domicile</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={matchInput.homeScore}
                                    onChange={(e) => setMatchInput({ ...matchInput, homeScore: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Score Extérieur</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={matchInput.awayScore}
                                    onChange={(e) => setMatchInput({ ...matchInput, awayScore: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleUpdateScore}>
                            <Save className="mr-2 h-4 w-4" /> Enregistrer le match
                        </Button>
                    </CardContent>
                </Card>

                {/* Live Standings Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Classement Actuel (Aperçu)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 border-b">
                                    <tr className="text-left">
                                        <th className="p-3 font-medium">Equipe</th>
                                        <th className="p-3 font-medium text-center">Pts</th>
                                        <th className="p-3 font-medium text-center">J</th>
                                        <th className="p-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team) => (
                                        <tr key={team.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="p-3 font-medium">{team.name}</td>
                                            <td className="p-3 text-center font-bold">{team.points}</td>
                                            <td className="p-3 text-center text-muted-foreground">{team.played}</td>
                                            <td className="p-3 text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            <Plus className="mr-2 h-4 w-4" /> Ajouter une équipe
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
