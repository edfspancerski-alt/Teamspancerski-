'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function AffiliateDashboard() {
  const stats = [
    { label: 'Cliques no Link', value: '450' },
    { label: 'Conversões (Vendas)', value: '12' },
    { label: 'Comissão Acumulada', value: 'R$ 1.840,00' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard de Afiliados</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">{s.label}</p>
              <h3 className="text-2xl font-bold">{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Seu Link de Indicação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <input
              readOnly
              value="https://app.teamspancerski.com/?ref=USER123"
              className="flex-1 px-3 py-2 bg-gray-50 border rounded text-sm font-mono"
            />
            <Button size="sm">Copiar</Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Ganhe 30% de comissão recorrente para cada novo assinante que usar seu link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
