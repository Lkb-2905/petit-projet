import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Need to create Table component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Unused
import { Badge } from "@/components/ui/badge"; // Need Badge

export default function League() {
    return (
        <div className="container py-8 space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Empire League</h1>
                <p className="text-muted-foreground">Classements, Résultats et Calendrier de la saison 2076.</p>
            </div>

            {/* Tabs for different sports would go here, simplified for MVP */}
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Football - Division Douala</span>
                            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded">Saison 1 - Journée 14</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 border-b">
                                    <tr className="text-left">
                                        <th className="p-4 font-medium">Pos</th>
                                        <th className="p-4 font-medium">Club</th>
                                        <th className="p-4 font-medium">Pts</th>
                                        <th className="p-4 font-medium">J</th>
                                        <th className="p-4 font-medium">Diff</th>
                                        <th className="p-4 font-medium text-right">Forme</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="hover:bg-muted/50 transition-colors bg-primary/5">
                                        <td className="p-4 font-bold">1</td>
                                        <td className="p-4 font-semibold">Akwa United</td>
                                        <td className="p-4 font-bold text-primary">36</td>
                                        <td className="p-4">14</td>
                                        <td className="p-4 text-green-600">+18</td>
                                        <td className="p-4 text-right">VVVNV</td>
                                    </tr>
                                    <tr className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-bold">2</td>
                                        <td className="p-4 font-semibold">Bonapriso Stars</td>
                                        <td className="p-4 font-bold">34</td>
                                        <td className="p-4">14</td>
                                        <td className="p-4 text-green-600">+15</td>
                                        <td className="p-4 text-right">VVNVV</td>
                                    </tr>
                                    <tr className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-bold">3</td>
                                        <td className="p-4">Deido Boyz</td>
                                        <td className="p-4 font-bold">28</td>
                                        <td className="p-4">14</td>
                                        <td className="p-4 text-green-600">+8</td>
                                        <td className="p-4 text-right">VDVVN</td>
                                    </tr>
                                    <tr className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-bold">4</td>
                                        <td className="p-4">New-Bell Warriors</td>
                                        <td className="p-4 font-bold">22</td>
                                        <td className="p-4">14</td>
                                        <td className="p-4 text-red-500">-2</td>
                                        <td className="p-4 text-right">DNDVN</td>
                                    </tr>
                                    <tr className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-bold">5</td>
                                        <td className="p-4">Bepanda FC</td>
                                        <td className="p-4 font-bold">15</td>
                                        <td className="p-4">14</td>
                                        <td className="p-4 text-red-500">-12</td>
                                        <td className="p-4 text-right">DDDDV</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>MMA - Empire Fight Night #04</span>
                            <span className="text-xs font-normal text-muted-foreground">Samedi 28 Fév</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="w-1/3 text-right">
                                    <h3 className="font-bold text-lg">Francis "The Predator"</h3>
                                    <p className="text-sm text-muted-foreground">15-3-0 (12 KO)</p>
                                </div>
                                <div className="w-1/3 text-center px-2">
                                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">MAIN EVENT</span>
                                    <p className="text-2xl font-black text-primary my-1">VS</p>
                                    <span className="text-xs text-muted-foreground">Heavyweight Title</span>
                                </div>
                                <div className="w-1/3 text-left">
                                    <h3 className="font-bold text-lg">The Iron Mike</h3>
                                    <p className="text-sm text-muted-foreground">14-1-0 (10 KO)</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between opacity-80">
                                <div className="w-1/3 text-right">
                                    <h3 className="font-semibold">Kamga</h3>
                                </div>
                                <div className="w-1/3 text-center px-2">
                                    <span className="text-xs bg-muted px-2 py-0.5 rounded">CO-MAIN</span>
                                    <p className="text-sm font-bold my-1">VS</p>
                                </div>
                                <div className="w-1/3 text-left">
                                    <h3 className="font-semibold">Wambe</h3>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
