"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scan, CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type ScannedData = {
    name?: string;
    id?: string;
    tier?: string;
    access?: string;
    reason?: string;
}

export default function AccessControl() {
    const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "valid" | "invalid">("idle");
    const [scannedData, setScannedData] = useState<ScannedData | null>(null);

    const simulateScan = () => {
        setScanStatus("scanning");
        setTimeout(() => {
            // Randomly succeed or fail for demo purposes
            const isValid = Math.random() > 0.3;

            if (isValid) {
                setScanStatus("valid");
                setScannedData({
                    name: "Jean-Michel Kotto",
                    id: "EMP-2076-8842",
                    tier: "Gold Member",
                    access: "Tribune Présidentielle"
                });
            } else {
                setScanStatus("invalid");
                setScannedData({
                    reason: "Billet déjà utilisé ou inexistant."
                });
            }
        }, 1500);
    };

    const reset = () => {
        setScanStatus("idle");
        setScannedData(null);
    };

    return (
        <div className="container py-12 flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold">Empire Guard - Point de Contrôle</h1>
                <p className="text-muted-foreground">Scanner de contrôle d&apos;accès (Lot 7 & 11)</p>
            </div>

            <Card className="w-full max-w-md border-2 shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle>Scanner NFC / QR</CardTitle>
                    <CardDescription>Approchez le terminal ou le billet.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-8 py-8">

                    {/* Visual Indicator */}
                    <div className={cn(
                        "w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500",
                        scanStatus === "idle" && "bg-muted text-muted-foreground",
                        scanStatus === "scanning" && "bg-yellow-100 text-yellow-600 animate-pulse border-4 border-yellow-400",
                        scanStatus === "valid" && "bg-green-100 text-green-600 border-4 border-green-500 scale-110",
                        scanStatus === "invalid" && "bg-red-100 text-red-600 border-4 border-red-500 shake"
                    )}>
                        {scanStatus === "idle" && <Scan className="h-24 w-24" />}
                        {scanStatus === "scanning" && <Scan className="h-24 w-24 animate-spin-slow" />}
                        {scanStatus === "valid" && <CheckCircle className="h-24 w-24" />}
                        {scanStatus === "invalid" && <XCircle className="h-24 w-24" />}
                    </div>

                    {/* Status Message */}
                    <div className="text-center space-y-1 h-20">
                        {scanStatus === "idle" && <p className="text-xl font-medium">Prêt à scanner</p>}
                        {scanStatus === "scanning" && <p className="text-xl font-medium">Vérification...</p>}
                        {scanStatus === "valid" && (
                            <>
                                <p className="text-2xl font-bold text-green-600">ACCÈS AUTORISÉ</p>
                                <p className="text-sm font-medium">{scannedData?.name} - {scannedData?.access}</p>
                            </>
                        )}
                        {scanStatus === "invalid" && (
                            <>
                                <p className="text-2xl font-bold text-red-600">ACCÈS REFUSÉ</p>
                                <p className="text-sm font-medium">{scannedData?.reason}</p>
                            </>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="w-full space-y-3">
                        {scanStatus === "idle" ? (
                            <Button size="lg" className="w-full text-lg h-12" onClick={simulateScan}>
                                Scanner (Simulation)
                            </Button>
                        ) : (
                            <Button size="lg" variant="outline" className="w-full text-lg h-12" onClick={reset}>
                                <RefreshCcw className="mr-2 h-5 w-5" /> Nouveau Scan
                            </Button>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
