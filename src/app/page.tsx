import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Ticket, Trophy, Tv, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16))]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 lg:py-40 overflow-hidden relative">
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -z-10" />

        <div className="container flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-forwards">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary uppercase tracking-widest font-bold">
            Vision 2076
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary">
            EMPIRE CAMEROUN
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            L'écosystème ultime. Sport, Divertissement, Culture. <br className="hidden md:inline" />
            Une seule identité pour tout vivre.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 font-bold text-base">
                Rejoindre l'Empire
              </Button>
            </Link>
            <Link href="/watch">
              <Button variant="outline" size="lg" className="px-8 text-base">
                Découvrir l'Empire TV
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/60 transition-colors">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Citoyen Empire</CardTitle>
              <CardDescription>Une identité unique.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Votre QR Code personnel ouvre toutes les portes : Stades, Bars, Concerts. Plus besoin de cash.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/60 transition-colors">
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Empire League</CardTitle>
              <CardDescription>Le sport réinventé.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Suivez votre équipe de quartier. Stats en direct, mercato, paris virtuels. La gloire locale.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/60 transition-colors">
            <CardHeader>
              <Tv className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Empire TV</CardTitle>
              <CardDescription>Streaming 24/7.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Matchs en direct, Téléréalité "Lions of Douala", Concerts exclusifs. Tout sur votre écran.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/60 transition-colors">
            <CardHeader>
              <Ticket className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Events & Bars</CardTitle>
              <CardDescription>L'expérience physique.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Réservez votre table au Sports Bar ou votre place à l'Arena. Priorité aux membres.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
