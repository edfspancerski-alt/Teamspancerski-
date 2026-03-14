'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function AdminDashboard() {
  const metrics = [
    { label: 'MRR', value: 'R$ 125.000', change: '+12%' },
    { label: 'Novos Membros (Mês)', value: '1.240', change: '+8%' },
    { label: 'Taxa de Retenção', value: '92%', change: '+2%' },
    { label: 'LTV', value: 'R$ 2.400', change: '+5%' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <Button>Criar Novo Programa</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-green-600 font-medium">{m.change} em relação ao mês anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de White Label</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-semibold">Coach Fitness Pro</p>
                  <p className="text-xs text-muted-foreground">coachpro.teamspancerski.com</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-semibold">Elite Training</p>
                  <p className="text-xs text-muted-foreground">elite.teamspancerski.com</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimos Programas Criados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Seca Barriga - 30 Dias</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ativo</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Empina Bumbum - 45 Dias</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ativo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
