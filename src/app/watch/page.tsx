import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Calendar, User } from "lucide-react";

export default function Watch() {
    return (
        <div className="container py-6 space-y-6">
            {/* Main Player Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative group cursor-pointer border border-primary/20 shadow-2xl">
                        {/* Mock Video Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                            <div className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center pl-2 shadow-lg shadow-primary/20 scale-90 group-hover:scale-100 transition-transform">
                                <Play className="h-10 w-10 text-white fill-current" />
                            </div>
                        </div>
                        {/* Mock Poster */}
                        <img
                            src="/api/placeholder/800/450"
                            alt="Live Match"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded animate-pulse">
                            EN DIRECT
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                            <h2 className="text-2xl font-bold text-white">Lions of Douala : L'Épisode 12</h2>
                            <p className="text-gray-300">La tension monte dans la villa. Qui sera éliminé ce soir ?</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Lions of Douala</h1>
                            <p className="text-muted-foreground">Téléréalité • Saison 1 • Épisode 12</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline"><User className="mr-2 h-4 w-4" /> Fan Chat</Button>
                            <Button>S'abonner</Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Recommended */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">À suivre</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3 items-start group cursor-pointer">
                                <div className="h-16 w-24 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Débrief du Match Akwa vs Bonapriso</h4>
                                    <p className="text-xs text-muted-foreground flex items-center mt-1"><Calendar className="h-3 w-3 mr-1" /> Ce soir 22h</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start group cursor-pointer">
                                <div className="h-16 w-24 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Concert Locko : Live from Arena #3</h4>
                                    <p className="text-xs text-muted-foreground flex items-center mt-1"><Calendar className="h-3 w-3 mr-1" /> Demain 20h</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start group cursor-pointer">
                                <div className="h-16 w-24 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Le Boss du Mboa : Finale</h4>
                                    <p className="text-xs text-muted-foreground flex items-center mt-1"><Calendar className="h-3 w-3 mr-1" /> Dimanche 18h</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
