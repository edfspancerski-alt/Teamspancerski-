'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function Challenges() {
  const challenges = [
    { id: '1', name: 'Desafio 30 Dias Transformação', participants: 1240, daysLeft: 12, prize: 'Selo Elite + 500 XP' },
    { id: '2', name: 'Missão Seca Barriga 21 Dias', participants: 850, daysLeft: 5, prize: 'Selo Queima Total' },
    { id: '3', name: 'Glúteo de Ferro (Intenso)', participants: 2100, daysLeft: 20, prize: 'Badge Especial Glúteo' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Desafios Comunitários</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {challenges.map((c) => (
            <Card key={c.id}>
              <CardHeader className="flex flex-row justify-between items-center space-y-0">
                <CardTitle className="text-lg">{c.name}</CardTitle>
                <span className="text-xs font-bold text-orange-500">{c.daysLeft} DIAS RESTANTES</span>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-muted-foreground">
                    <p>Participantes: <span className="text-foreground font-semibold">{c.participants}</span></p>
                    <p>Recompensa: <span className="text-foreground font-semibold">{c.prize}</span></p>
                  </div>
                  <Button size="sm">Participar</Button>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '65%' }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ranking Global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-muted-foreground w-4">{i}</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <span className="font-medium">Usuário {i}</span>
                  </div>
                  <span className="font-bold text-primary">{2500 - i * 100} XP</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
