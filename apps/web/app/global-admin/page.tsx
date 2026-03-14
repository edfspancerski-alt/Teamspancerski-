'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';
import { motion } from 'framer-motion';

export default function GlobalAdmin() {
  const stats = [
    { label: 'MRR Global', value: 'R$ 850.000' },
    { label: 'Total Tenants', value: '45' },
    { label: 'Usuários Ativos', value: '1.2M' },
    { label: 'LTV Médio', value: 'R$ 2.800' },
  ];

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10">System Architect - Team Spancerski</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <Card key={s.label} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-400 text-xs uppercase tracking-wider">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Gerenciamento de Marcas (Tenants)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
                  <div>
                    <h4 className="font-bold">Tenant Elite {i}</h4>
                    <p className="text-xs text-slate-400">domain-elite-${i}.com</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-500 text-slate-300">Config</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-500">Métricas</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Fila de Processamento (BullMQ)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Video-Processing:</span>
                <span className="text-green-400">Ativo - 0 em espera</span>
              </div>
              <div className="flex justify-between items-center">
                <span>AI-Generation:</span>
                <span className="text-blue-400">Ativo - 12 processando</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Notifications:</span>
                <span className="text-orange-400">Ativo - 450 enviados/min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
